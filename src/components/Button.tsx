interface ButtonProps {
  children: React.ReactNode
  customStyle?: string
  type?: "button" | "submit" | "reset" 
  isDisabled?: boolean
}

export const Button = ({children, type, customStyle, isDisabled=false}: ButtonProps) => {
  return (
    <div>
      <button className={`${customStyle} ${type} ${isDisabled} w-80 rounded-lg px-2 h-[50px] flex items-center justify-center gap-2 `}>{children}</button>
    </div>
  )
}
