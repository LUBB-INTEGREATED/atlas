import React from 'react';

interface AtlasLogoProps {
  variant?: 'default' | 'onBlue';
  className?: string;
}

/**
 * Faithful vector rendition of the Atlas Holland B.V. mark:
 * Bold architectural 'A' with a dynamic warm orange swoosh (#F4721E) +
 * "ATLAS / HOLLAND B.V." wordmark.
 * On blue backgrounds ('onBlue'), the dark parts switch to --cream (#E9D9CA)
 * while the orange swoosh stays #F4721E.
 */
export function AtlasLogo({ variant = 'default', className = '' }: AtlasLogoProps) {
  const primaryFill = variant === 'onBlue' ? '#E9D9CA' : '#1E2638';
  const subTextFill = variant === 'onBlue' ? '#F5EDE4' : '#4D6080';

  return (
    <div className={`inline-flex items-center gap-3 select-none shrink-0 whitespace-nowrap ${className}`}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-9 h-9 sm:w-10 sm:h-10 shrink-0"
      >
        {/* Left & Right legs of the 'A' */}
        <path
          d="M24 5L8.5 41H16.2L24 21.2L31.8 41H39.5L24 5Z"
          fill={primaryFill}
        />
        {/* Dynamic Orange Swoosh cutting smoothly across the 'A' */}
        <path
          d="M5 31.5C13.5 23.5 26.8 18.8 43.5 19.5C35.2 24.4 23.8 29.2 12.2 34.2C9.4 35.3 6.2 33.8 5 31.5Z"
          fill="#F4721E"
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span
          style={{ color: primaryFill }}
          className="font-sans font-semibold tracking-[0.12em] text-base sm:text-[17px]"
        >
          ATLAS
        </span>
        <span
          style={{ color: subTextFill }}
          className="font-sans font-medium tracking-[0.2em] text-[9.5px] mt-0.5"
        >
          HOLLAND B.V.
        </span>
      </div>
    </div>
  );
}
