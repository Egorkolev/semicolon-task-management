import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
interface ButtonType {
    label?: string;
    type?: "submit" | "reset" | "button" | undefined;
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

export const PrimaryButton = ({label, type, children, onClick, className, disabled}: ButtonType) => {
  return (
  <Button 
    disabled={disabled}
    onClick={onClick}
    type={type} 
    className={`
      ${className}
      bg-blue 
      rounded-lg 
      opacity-90 
      hover:opacity-100
      hover:bg-blue
      shadow-xl
      dark:text-gray
    `}
  >
      {children || label}
  </Button>
  )
}

export const SecondaryButton = ({label, type, children, onClick, className, disabled}: ButtonType) => {
    return (
    <Button 
      disabled={disabled}
      onClick={onClick}
      type={type} 
      variant="outline" 
      className={`
        ${className}
        opacity-90 
        hover:opacity-100
        border-blue 
        text-blue 
        rounded-lg
        hover:bg-opacity-5
        hover:text-blue
        shadow-xl
        dark:bg-blue
        dark:text-gray
      `}
    >
      {children || label}
    </Button>
  )
}

export const YellowButton = ({label, type, children, onClick, disabled}: ButtonType) => {
  return (
  <Button 
    disabled={disabled}
    onClick={onClick}
    type={type} 
    className="
      bg-yellow
      rounded-lg 
      hover:bg-opacity-90
      hover:bg-yellow
      shadow-xl
      text-blue
    "
  >
      {children || label}
  </Button>
  )
}

export const BadgeButton = ({label, children, className, onClick}: ButtonType) => {
  return (
    <Badge className={`border-none whitespace-nowrap ${className}`} onClick={onClick} variant="outline">{children || label}</Badge>
  )
}
 
export const ButtonLoading = ({className, label}: ButtonType) => {
  return (
    <Button className={`${className}`} disabled>
      <Loader2 className="animate-spin" />
        {label}
    </Button>
  )
}
