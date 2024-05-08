import { forwardRef, useState } from "react"
import { InputText, InputTextProps } from "primereact/inputtext"

export const PasswordInput = forwardRef<HTMLInputElement, InputTextProps>(({ ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <InputText
        type={showPassword ? "text" : "password"}
        ref={ref}
        {...props}
        autoComplete="new-password"
        className={`!pr-8 ${props.className}`}
      />
      <button
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={(e) => {
          e.preventDefault()
          setShowPassword((prev) => !prev)
        }}
      >
        {showPassword ? (
          <div className="pi pi-eye h-4 w-4 text-icon align-middle"></div>
        ) : (
          <div className="pi pi-eye-slash h-4 w-4 text-icon align-middle"></div>
        )}
      </button>
    </div>
  )
},
)