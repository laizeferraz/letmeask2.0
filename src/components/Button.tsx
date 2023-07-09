import { MouseEvent } from 'react'
interface ButtonProps {
  children: React.ReactNode
  customStyle?: string
  type?: "button" | "submit" | "reset" 
  isDisabled?: boolean
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const Button = ({children, type, customStyle, isDisabled=false, onClick}: ButtonProps) => {
  return (
    <div>
      <button onClick={onClick} className={`${customStyle} ${type} ${isDisabled} w-full rounded-lg p-2 max-h-[50px] lg:h-[50px] flex items-center justify-center gap-2`}>{children}</button>
    </div>
  )
}
