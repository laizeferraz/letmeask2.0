import { ButtonHTMLAttributes } from 'react'
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  customStyle?: string
}

export const Button = ({children, customStyle, ...props}: ButtonProps) => {
  return (
    <div>
      <button {...props} className={`${customStyle} w-full rounded-lg p-2 max-h-[50px] lg:h-[50px] flex items-center justify-center gap-2`}>{children}</button>
    </div>
  )
}
