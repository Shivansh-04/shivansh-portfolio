export default function InkSplash() {
  return (
    <div
      className="relative w-full overflow-hidden flex-shrink-0"
      style={{ height: 32, background: '#f0ebe0' }}
    >
      <svg
        viewBox="0 0 1440 32"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        {/* Ink splash divider — irregular organic shape */}
        <path
          d="M0,16 
             C60,4 120,28 200,12 
             C280,-4 340,24 420,14 
             C500,4 540,22 620,10 
             C700,-2 760,26 840,16 
             C920,6 980,24 1060,12 
             C1140,0 1200,28 1280,14 
             C1360,0 1400,20 1440,16 
             L1440,32 L0,32 Z"
          fill="#0d0d0f"
        />
        {/* Second layer for depth */}
        <path
          d="M0,22 
             C80,14 160,30 240,20 
             C320,10 380,28 460,18 
             C540,8 600,26 680,20 
             C760,14 820,30 900,22 
             C980,14 1040,28 1120,20 
             C1200,12 1280,26 1360,20 
             C1400,17 1420,22 1440,20 
             L1440,32 L0,32 Z"
          fill="rgba(13,13,15,0.3)"
        />
      </svg>
    </div>
  )
}