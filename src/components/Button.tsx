type ButtonProps = {
  children: React.ReactNode
  className?: string
}

export const Button = (props: ButtonProps) => {
  return (
    <div>
      <button {...props}></button>
    </div>
  )
}
