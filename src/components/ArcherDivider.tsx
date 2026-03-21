export function ArcherDivider({ label }: { label?: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        padding: '0 1.5rem',
        maxWidth: '1280px',
        margin: '0 auto',
      }}
    >
      <div
        style={{
          flex: 1,
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(238,170,0,0.35), transparent)',
        }}
      />
      {/* Archer watermark */}
      <div style={{ position: 'relative', flexShrink: 0, opacity: 0.5 }}>
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          {/* Simplified Archer — Rama drawing bow */}
          <circle cx="18" cy="18" r="17" stroke="#EEAA00" strokeWidth="1" fill="rgba(238,170,0,0.05)" />
          {/* Head */}
          <circle cx="18" cy="9" r="2.5" fill="#EEAA00" />
          {/* Body */}
          <line x1="18" y1="11.5" x2="18" y2="22" stroke="#EEAA00" strokeWidth="1.5" strokeLinecap="round" />
          {/* Left arm / bow arm */}
          <line x1="18" y1="14" x2="11" y2="18" stroke="#EEAA00" strokeWidth="1.5" strokeLinecap="round" />
          {/* Bow */}
          <path d="M 11,13.5 Q 8,18 11,22.5" stroke="#EEAA00" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Bowstring */}
          <line x1="11" y1="13.5" x2="18" y2="16" stroke="#EEAA00" strokeWidth="0.8" />
          <line x1="11" y1="22.5" x2="18" y2="20" stroke="#EEAA00" strokeWidth="0.8" />
          {/* Arrow */}
          <line x1="18" y1="18" x2="27" y2="18" stroke="#EEAA00" strokeWidth="1.2" strokeLinecap="round" />
          <polygon points="27,17 29,18 27,19" fill="#EEAA00" />
          {/* Right arm pulling string */}
          <line x1="18" y1="14" x2="23" y2="18" stroke="#EEAA00" strokeWidth="1.5" strokeLinecap="round" />
          {/* Legs */}
          <line x1="18" y1="22" x2="15" y2="29" stroke="#EEAA00" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="18" y1="22" x2="21" y2="29" stroke="#EEAA00" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      {label && (
        <span
          style={{
            fontFamily: 'var(--font-baskerville)',
            fontStyle: 'italic',
            fontSize: '0.8rem',
            color: 'rgba(238,170,0,0.65)',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
      )}
      <div
        style={{
          flex: 1,
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(238,170,0,0.35), transparent)',
        }}
      />
    </div>
  )
}
