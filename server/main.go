package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// Server and Database Configuration Constants (Rule 13)
const (
	DefaultPort         = "8080"
	DefaultMaxIdleConns = 5
	DefaultMaxOpenConns = 10
	DefaultConnLifetime = 30 * time.Minute
)

// Cheerio FixFlow Data Models
type SupportIssue struct {
	ID                                uint      `gorm:"primaryKey" json:"id"`
	Code                              string    `gorm:"uniqueIndex;size:50" json:"code"`
	Category                          string    `gorm:"size:50" json:"category"`
	Title                             string    `gorm:"size:255" json:"title"`
	PlainEnglishDescription           string    `gorm:"type:text" json:"plainEnglishDescription"`
	RootCause                         string    `gorm:"type:text" json:"rootCause"`
	CheerioOccurrenceRate             string    `gorm:"size:20" json:"cheerioOccurrenceRate"`
	TypicalHumanResolutionTimeMinutes int       `json:"typicalHumanResolutionTimeMinutes"`
	FixFlowAutomatedResolutionRate    string    `gorm:"size:20" json:"fixFlowAutomatedResolutionRate"`
	VerifiedFixTitle                  string    `gorm:"size:255" json:"verifiedFixTitle"`
	VerifiedFixAction                 string    `gorm:"type:text" json:"verifiedFixAction"`
	CreatedAt                         time.Time `json:"createdAt"`
	UpdatedAt                         time.Time `json:"updatedAt"`
}

type BusinessProfile struct {
	ID                 uint      `gorm:"primaryKey" json:"id"`
	BrandName          string    `gorm:"size:100" json:"brandName"`
	OwnerName          string    `gorm:"size:100" json:"ownerName"`
	Industry           string    `gorm:"size:50" json:"industry"`
	ECommercePlatform  string    `gorm:"size:50" json:"eCommercePlatform"`
	WhatsappNumber     string    `gorm:"size:30" json:"whatsappNumber"`
	WabaStatus         string    `gorm:"size:30" json:"wabaStatus"`
	TotalContacts      int       `json:"totalContacts"`
	MonthlyActiveChats int       `json:"monthlyActiveChats"`
	AccountTier        string    `gorm:"size:50" json:"accountTier"`
	ActiveAutomations  int       `json:"activeAutomations"`
	OpenSupportTickets int       `json:"openSupportTickets"`
	CreatedAt          time.Time `json:"createdAt"`
	UpdatedAt          time.Time `json:"updatedAt"`
}

type DiagnosticLog struct {
	ID         uint      `gorm:"primaryKey" json:"id"`
	UserQuery  string    `gorm:"type:text" json:"userQuery"`
	ErrorCode  string    `gorm:"size:50" json:"errorCode"`
	IsResolved bool      `json:"isResolved"`
	ResolvedBy string    `gorm:"size:50" json:"resolvedBy"`
	CreatedAt  time.Time `json:"createdAt"`
}

type Campaign struct {
	ID                  uint      `gorm:"primaryKey" json:"id"`
	CampaignID          string    `gorm:"uniqueIndex;size:50" json:"campaignId"`
	Name                string    `gorm:"size:255" json:"name"`
	Type                string    `gorm:"size:50" json:"type"`
	Status              string    `gorm:"size:50" json:"status"`
	Trigger             string    `gorm:"size:255" json:"trigger"`
	TargetAudienceCount int       `json:"targetAudienceCount"`
	LastUpdated         string    `gorm:"size:50" json:"lastUpdated"`
	TemplateBody        string    `gorm:"type:text" json:"templateBody"`
	DelayDays           int       `json:"delayDays"`
	ProductName         string    `gorm:"size:255" json:"productName"`
	DiscountCode        string    `gorm:"size:50" json:"discountCode"`
	ActiveRoadblock     string    `gorm:"type:text" json:"activeRoadblock,omitempty"`
	CreatedAt           time.Time `json:"createdAt"`
	UpdatedAt           time.Time `json:"updatedAt"`
}

var DB *gorm.DB

func loadEnvFallback() {
	paths := []string{".env", "../.env"}
	for _, p := range paths {
		data, err := os.ReadFile(p)
		if err == nil {
			lines := strings.Split(string(data), "\n")
			for _, line := range lines {
				line = strings.TrimSpace(line)
				if line == "" || strings.HasPrefix(line, "#") {
					continue
				}
				parts := strings.SplitN(line, "=", 2)
				if len(parts) == 2 {
					key := strings.TrimSpace(parts[0])
					val := strings.TrimSpace(parts[1])
					if os.Getenv(key) == "" {
						os.Setenv(key, val)
					}
				}
			}
		}
	}
}

func ConnectDB(dsn string) (*gorm.DB, error) {
	db, err := gorm.Open(postgres.New(postgres.Config{
		DSN:                  dsn,
		PreferSimpleProtocol: true, // Recommended for Neon PgBouncer pooler
	}), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Warn),
	})

	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, fmt.Errorf("failed to get sql.DB: %w", err)
	}

	sqlDB.SetMaxIdleConns(DefaultMaxIdleConns)
	sqlDB.SetMaxOpenConns(DefaultMaxOpenConns)
	sqlDB.SetConnMaxLifetime(DefaultConnLifetime)

	if err := sqlDB.Ping(); err != nil {
		return nil, fmt.Errorf("ping to database failed: %w", err)
	}

	return db, nil
}

func seedInitialData(db *gorm.DB) {
	// Seed Business Profile
	var profileCount int64
	db.Model(&BusinessProfile{}).Count(&profileCount)
	if profileCount == 0 {
		auraProfile := BusinessProfile{
			BrandName:          "Aura Skincare",
			OwnerName:          "Maya Sharma",
			Industry:           "D2C Beauty & Personal Care",
			ECommercePlatform:  "Shopify Plus",
			WhatsappNumber:     "+91 98201 44521",
			WabaStatus:         "CONNECTED",
			TotalContacts:      14250,
			MonthlyActiveChats: 8900,
			AccountTier:        "Growth Plan ($79/mo)",
			ActiveAutomations:  4,
			OpenSupportTickets: 0,
		}
		db.Create(&auraProfile)
		fmt.Printf("🌱 Seeded Business Profile: %s in Neon DB\n", auraProfile.BrandName)
	}

	// Seed Top 5 Support Issues
	var issueCount int64
	db.Model(&SupportIssue{}).Count(&issueCount)
	if issueCount == 0 {
		issues := []SupportIssue{
			{
				Code:                              "META_132001",
				Category:                          "TEMPLATE_REJECTION",
				Title:                             "WhatsApp Template Rejected (Missing Opt-Out Tag)",
				PlainEnglishDescription:           "Meta requires marketing broadcasts to have clear opt-out language like 'Reply STOP'.",
				RootCause:                         "Meta Graph API rejects templates failing WhatsApp Business Messaging Policy 4.2.",
				CheerioOccurrenceRate:             "32% of tickets",
				TypicalHumanResolutionTimeMinutes: 35,
				FixFlowAutomatedResolutionRate:    "94%",
				VerifiedFixTitle:                  "Auto-Inject Opt-Out Footer",
				VerifiedFixAction:                 "Injected 'Reply STOP to opt out' and validated dynamic variables.",
			},
			{
				Code:                              "META_2FA_REQ",
				Category:                          "WABA_SIGNUP",
				Title:                             "Meta Embedded Signup Stuck on Two-Factor Authentication",
				PlainEnglishDescription:           "Your Meta account needs 2FA enabled before WhatsApp allows sending broadcasts.",
				RootCause:                         "Meta WABA onboarding token requires business manager two-step verification.",
				CheerioOccurrenceRate:             "24% of tickets",
				TypicalHumanResolutionTimeMinutes: 45,
				FixFlowAutomatedResolutionRate:    "88%",
				VerifiedFixTitle:                  "Generate Direct 2FA Activation Link",
				VerifiedFixAction:                 "Deep-linked directly to Meta Security Center with pre-filled credentials.",
			},
			{
				Code:                              "BOT_NULL_PARAM",
				Category:                          "CHATBOT_LOGIC",
				Title:                             "Bot Inactive: Customer Phone Number Missing in Payload",
				PlainEnglishDescription:           "The customer checked out with email only on Shopify, so WhatsApp couldn't deliver.",
				RootCause:                         "Shopify webhook order JSON lacked billing_address.phone field.",
				CheerioOccurrenceRate:             "19% of tickets",
				TypicalHumanResolutionTimeMinutes: 25,
				FixFlowAutomatedResolutionRate:    "92%",
				VerifiedFixTitle:                  "Enable Shopify Phone-at-Checkout Sync",
				VerifiedFixAction:                 "Toggled Shopify Settings -> Checkout -> Phone Number required.",
			},
			{
				Code:                              "SHOPIFY_WEBHOOK_401",
				Category:                          "SHOPIFY_INTEGRATION",
				Title:                             "Shopify Webhook Re-Authorization Required",
				PlainEnglishDescription:           "Shopify updated its app credentials, pausing new order syncing with Cheerio.",
				RootCause:                         "HMAC SHA-256 header signature mismatch following Shopify admin token rotation.",
				CheerioOccurrenceRate:             "14% of tickets",
				TypicalHumanResolutionTimeMinutes: 30,
				FixFlowAutomatedResolutionRate:    "96%",
				VerifiedFixTitle:                  "1-Click Shopify Webhook Re-Handshake",
				VerifiedFixAction:                 "Regenerated Cheerio app access token via Shopify OAuth flow.",
			},
			{
				Code:                              "META_QUALITY_RED",
				Category:                          "DELIVERY_QUALITY",
				Title:                             "Meta Quality Rating Dropped (High Block Rate Warning)",
				PlainEnglishDescription:           "Sending messages to old unengaged customers led to spam complaints.",
				RootCause:                         "Rolling 7-day user block rate crossed 0.4% threshold on Meta WABA dashboard.",
				CheerioOccurrenceRate:             "11% of tickets",
				TypicalHumanResolutionTimeMinutes: 60,
				FixFlowAutomatedResolutionRate:    "85%",
				VerifiedFixTitle:                  "Auto-Segment to High-Engagement Cohort",
				VerifiedFixAction:                 "Filtered broadcast audience to contacts active within the last 45 days.",
			},
		}

		for _, issue := range issues {
			db.Create(&issue)
		}
		fmt.Printf("🌱 Seeded %d Support Issues into Neon DB\n", len(issues))
	}

	// Seed Campaigns
	var campaignCount int64
	db.Model(&Campaign{}).Count(&campaignCount)
	if campaignCount == 0 {
		initialCampaigns := []Campaign{
			{
				CampaignID:          "camp-replenish-1",
				Name:                "30-Day Skincare Serum Replenishment Flow",
				Type:                "AUTOMATION",
				Status:              "DRAFT_ROADBLOCK",
				Trigger:             "Shopify Order Fulfilled (+30 Days)",
				TargetAudienceCount: 1420,
				LastUpdated:         "Just now",
				TemplateBody:        "Hi {{first_name}}! ✨ It's been 28 days since your {{product_name}} order. How is your skin feeling? To keep your barrier glowing without missing a day, use code {{discount_code}} for 20% off your refill today! 🌿💧",
				DelayDays:           30,
				ProductName:         "Skin Barrier Renewal Serum (50ml)",
				DiscountCode:        "REFILL20",
				ActiveRoadblock:     "Meta Policy 4.2 Error 132001: Missing Opt-Out Notice",
			},
			{
				CampaignID:          "camp-welcome-2",
				Name:                "New Customer Welcome & 15% VIP Perk",
				Type:                "AUTOMATION",
				Status:              "ACTIVE",
				Trigger:             "Shopify Customer Created",
				TargetAudienceCount: 3840,
				LastUpdated:         "3 days ago",
				TemplateBody:        "Welcome to the Aura Skincare family, {{first_name}}! 🌿 Your glowing skin journey starts today.\n\nReply STOP to unsubscribe.",
				DelayDays:           0,
				ProductName:         "Aura VIP Welcome Box",
				DiscountCode:        "GLOW15",
			},
			{
				CampaignID:          "camp-broadcast-3",
				Name:                "Diwali Festive Skincare Barrier Launch",
				Type:                "BROADCAST",
				Status:              "COMPLETED",
				Trigger:             "Manual Broadcast (14,250 contacts)",
				TargetAudienceCount: 14250,
				LastUpdated:         "12 days ago",
				TemplateBody:        "Celebrate Diwali with glowing, hydrated skin! ✨ 30% off site-wide for Aura insiders.\n\nReply STOP to unsubscribe.",
				DelayDays:           0,
				ProductName:         "Ceramide Barrier Cream",
				DiscountCode:        "DIWALI30",
			},
		}
		for _, c := range initialCampaigns {
			db.Create(&c)
		}
		fmt.Printf("🌱 Seeded %d Campaigns into Neon DB\n", len(initialCampaigns))
	}
}

func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
}

func getGeminiAPIKey() string {
	key := os.Getenv("GEMINI_API_KEY")
	if key == "" {
		key = os.Getenv("VITE_GEMINI_API_KEY")
	}
	return key
}

func main() {
	loadEnvFallback()

	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "postgresql://neondb_owner:npg_usUMnKTjiS01@ep-restless-lab-b4ica0u4-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
	}

	fmt.Println("==================================================")
	fmt.Println("🚀 Connecting to Neon PostgreSQL via GORM...")
	fmt.Println("==================================================")

	var err error
	DB, err = ConnectDB(dsn)
	if err != nil {
		log.Fatalf("❌ Neon Connection Error: %v", err)
	}

	fmt.Println("✅ Successfully connected to Neon Database!")

	// AutoMigrate tables
	err = DB.AutoMigrate(&SupportIssue{}, &BusinessProfile{}, &DiagnosticLog{}, &Campaign{})
	if err != nil {
		log.Fatalf("❌ AutoMigrate failed: %v", err)
	}
	fmt.Println("✅ GORM AutoMigrate completed successfully!")

	// Seed data
	seedInitialData(DB)

	// Setup HTTP REST Handlers
	http.HandleFunc("/api/health", func(w http.ResponseWriter, r *http.Request) {
		enableCORS(w)
		if r.Method == "OPTIONS" {
			return
		}
		var version string
		DB.Raw("SELECT version();").Row().Scan(&version)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]interface{}{
			"status":   "CONNECTED",
			"database": "Neon PostgreSQL Serverless",
			"version":  version,
			"gorm":     "v1.25.12",
		})
	})

	http.HandleFunc("/api/profile", func(w http.ResponseWriter, r *http.Request) {
		enableCORS(w)
		if r.Method == "OPTIONS" {
			return
		}
		var profile BusinessProfile
		if err := DB.First(&profile).Error; err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(profile)
	})

	http.HandleFunc("/api/issues", func(w http.ResponseWriter, r *http.Request) {
		enableCORS(w)
		if r.Method == "OPTIONS" {
			return
		}
		var issues []SupportIssue
		if err := DB.Order("id asc").Find(&issues).Error; err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(issues)
	})

	http.HandleFunc("/api/campaigns", func(w http.ResponseWriter, r *http.Request) {
		enableCORS(w)
		if r.Method == "OPTIONS" {
			return
		}
		if r.Method == "GET" {
			var campaigns []Campaign
			if err := DB.Order("id asc").Find(&campaigns).Error; err != nil {
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(campaigns)
			return
		}
		if r.Method == "POST" || r.Method == "PUT" {
			var c Campaign
			if err := json.NewDecoder(r.Body).Decode(&c); err != nil {
				http.Error(w, err.Error(), http.StatusBadRequest)
				return
			}
			c.UpdatedAt = time.Now()
			// Upsert by CampaignID
			if c.CampaignID != "" {
				var existing Campaign
				res := DB.Where("campaign_id = ?", c.CampaignID).First(&existing)
				if res.Error == nil {
					c.ID = existing.ID
					DB.Save(&c)
					w.Header().Set("Content-Type", "application/json")
					json.NewEncoder(w).Encode(c)
					return
				}
			}
			c.CreatedAt = time.Now()
			DB.Create(&c)
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(c)
			return
		}
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	})

	http.HandleFunc("/api/diagnose", func(w http.ResponseWriter, r *http.Request) {
		enableCORS(w)
		if r.Method == "OPTIONS" {
			return
		}
		if r.Method == "POST" {
			var logEntry DiagnosticLog
			if err := json.NewDecoder(r.Body).Decode(&logEntry); err != nil {
				http.Error(w, err.Error(), http.StatusBadRequest)
				return
			}
			logEntry.CreatedAt = time.Now()
			DB.Create(&logEntry)
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(logEntry)
			return
		}
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	})

	// Secure Server-Side Gemini Diagnostic Proxy (Protects API Key from Browser Bundles)
	http.HandleFunc("/api/diagnose/gemini", func(w http.ResponseWriter, r *http.Request) {
		enableCORS(w)
		if r.Method == "OPTIONS" {
			return
		}
		if r.Method != "POST" {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		var reqPayload struct {
			Query string `json:"query"`
		}
		if err := json.NewDecoder(r.Body).Decode(&reqPayload); err != nil || reqPayload.Query == "" {
			http.Error(w, "Invalid query payload", http.StatusBadRequest)
			return
		}

		apiKey := getGeminiAPIKey()
		if apiKey == "" {
			// Fallback mock diagnosis
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]interface{}{
				"title":                             "Diagnostic Analysis for: " + reqPayload.Query,
				"code":                              "FIXFLOW_AUTO_DETECT",
				"plainEnglishDescription":           "FixFlow inspected the WhatsApp Business Manager sync. A configuration drift was identified that can be resolved automatically.",
				"rootCause":                         "Meta Cloud API payload mismatch or pending webhook handshake.",
				"actionableFix":                     "FixFlow automatically refreshed the webhook subscriber and realigned template variables.",
				"fixFlowAutomatedResolutionRate":    "88%",
				"typicalHumanResolutionTimeMinutes": 30,
				"suggestedFixButtonText":            "Auto-Resolve with FixFlow",
				"isLiveGemini":                      false,
			})
			return
		}

		systemPrompt := `You are Cheerio FixFlow AI, the autonomous diagnostic guardian for Cheerio AI (an official Meta Business Solution Provider / BSP).
Give a crystal clear, zero-jargon plain English explanation, technical root cause, and concrete 1-click action.
Respond ONLY with valid JSON in this exact structure:
{
  "title": "Short descriptive title of the issue",
  "code": "ERROR_CODE or CATEGORY_CODE",
  "plainEnglishDescription": "Plain English summary for non-technical founders",
  "rootCause": "Technical underlying cause",
  "actionableFix": "Specific action taken to resolve it immediately",
  "fixFlowAutomatedResolutionRate": "92%",
  "typicalHumanResolutionTimeMinutes": 30,
  "suggestedFixButtonText": "Apply 1-Click Verified Fix"
}`

		geminiURL := fmt.Sprintf("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=%s", apiKey)
		geminiBody := map[string]interface{}{
			"contents": []map[string]interface{}{
				{
					"role": "user",
					"parts": []map[string]interface{}{
						{"text": fmt.Sprintf("%s\n\nUser Question/Error: %q", systemPrompt, reqPayload.Query)},
					},
				},
			},
			"generationConfig": map[string]interface{}{
				"temperature":      0.2,
				"maxOutputTokens":  1024,
				"responseMimeType": "application/json",
			},
		}

		bodyBytes, _ := json.Marshal(geminiBody)
		resp, err := http.Post(geminiURL, "application/json", bytes.NewReader(bodyBytes))
		if err != nil || resp.StatusCode != http.StatusOK {
			// Fallback
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]interface{}{
				"title":                             "Diagnostic Analysis: " + reqPayload.Query,
				"code":                              "FIXFLOW_DIAG",
				"plainEnglishDescription":           "Issue identified by FixFlow guardian and resolved via automated verification.",
				"rootCause":                         "Meta Cloud API payload or webhook mismatch.",
				"actionableFix":                     "Run autonomous verification and re-sync.",
				"fixFlowAutomatedResolutionRate":    "91%",
				"typicalHumanResolutionTimeMinutes": 30,
				"suggestedFixButtonText":            "Apply 1-Click Fix",
				"isLiveGemini":                      false,
			})
			return
		}
		defer resp.Body.Close()

		respData, _ := io.ReadAll(resp.Body)
		var geminiResp struct {
			Candidates []struct {
				Content struct {
					Parts []struct {
						Text string `json:"text"`
					} `json:"parts"`
				} `json:"content"`
			} `json:"candidates"`
		}

		if err := json.Unmarshal(respData, &geminiResp); err != nil || len(geminiResp.Candidates) == 0 || len(geminiResp.Candidates[0].Content.Parts) == 0 {
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(map[string]interface{}{
				"title":        "Diagnostic Analysis: " + reqPayload.Query,
				"code":         "FIXFLOW_DIAG",
				"isLiveGemini": false,
			})
			return
		}

		var parsedResult map[string]interface{}
		json.Unmarshal([]byte(geminiResp.Candidates[0].Content.Parts[0].Text), &parsedResult)
		parsedResult["isLiveGemini"] = true

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(parsedResult)
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = DefaultPort
	}

	fmt.Println("==================================================")
	fmt.Printf("🌐 Cheerio Go REST API Server running on :%s\n", port)
	fmt.Printf("   • GET  http://localhost:%s/api/health\n", port)
	fmt.Printf("   • GET  http://localhost:%s/api/profile\n", port)
	fmt.Printf("   • GET  http://localhost:%s/api/issues\n", port)
	fmt.Printf("   • GET  http://localhost:%s/api/campaigns\n", port)
	fmt.Printf("   • POST http://localhost:%s/api/campaigns\n", port)
	fmt.Printf("   • POST http://localhost:%s/api/diagnose\n", port)
	fmt.Printf("   • POST http://localhost:%s/api/diagnose/gemini\n", port)
	fmt.Println("==================================================")

	log.Fatal(http.ListenAndServe(":"+port, nil))
}
