import React from 'react'

interface CheerioLogoProps {
  className?: string
  iconOnly?: boolean
}

export const CheerioLogo: React.FC<CheerioLogoProps> = ({ 
  className = 'h-7',
  iconOnly = false
}) => {
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Authentic Cheerio Megaphone/Flag Upward Icon */}
      <div className="relative w-8 h-8 rounded-lg bg-gradient-to-tr from-[#6366f1] via-[#7c3aed] to-[#9333ea] flex items-center justify-center shadow-md shadow-purple-500/25 shrink-0">
        <svg 
          viewBox="0 0 24 24" 
          className="w-5 h-5 text-white fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Angled Megaphone / Growth Arrow Shape */}
          <path d="M4 10.5C4 9.67 4.67 9 5.5 9H8.7L15.3 4.2C15.9 3.8 16.7 4.2 16.7 5V19C16.7 19.8 15.9 20.2 15.3 19.8L8.7 15H5.5C4.67 15 4 14.33 4 13.5V10.5Z" />
          <path d="M19 8.5C19.8 9.5 20.3 10.7 20.3 12C20.3 13.3 19.8 14.5 19 15.5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex items-baseline">
          <span className="font-extrabold text-xl tracking-tight text-[#1e1b4b]">Cheerio</span>
          <span className="font-bold text-xl tracking-tight ml-1.5 text-[#7c3aed]">AI</span>
        </div>
      )}
    </div>
  )
}
