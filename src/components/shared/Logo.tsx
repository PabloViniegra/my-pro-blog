export const Logo = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      width='128'
      height='128'
      viewBox='0 0 128 128'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
    >
      <path
        d='M32 16C23.1634 16 16 23.1634 16 32V96C16 104.837 23.1634 112 32 112H64L80 128V112H96C104.837 112 112 104.837 112 96V32C112 23.1634 104.837 16 96 16H32Z'
        className='fill-foreground'
      />
      <rect
        x='48'
        y='48'
        width='32'
        height='6'
        rx='3'
        className='fill-background'
      />
      <rect
        x='48'
        y='60'
        width='32'
        height='6'
        rx='3'
        className='fill-background'
      />
      <rect
        x='48'
        y='72'
        width='20'
        height='6'
        rx='3'
        className='fill-background'
      />
    </svg>
  )
}
