import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"

 
interface ButtonType {
    label?: string;
    type?: "submit" | "reset" | "button" | undefined;
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
}

export const PrimaryButton = ({label, type, children, onClick}: ButtonType) => {
  return (
  <Button 
    onClick={onClick}
    type={type} 
    className="
      bg-blue 
      rounded-lg 
      opacity-90 
      hover:opacity-100
      hover:bg-blue
      shadow-xl
    "
  >
      {children || label}
  </Button>
  )
}

export const SecondaryButton = ({label, type, children, onClick}: ButtonType) => {
    return (
    <Button 
      onClick={onClick}
      type={type} 
      variant="outline" 
      className="
        border-blue 
        text-blue 
        rounded-lg
        hover:bg-opacity-5
        hover:text-blue
        shadow-xl
      "
    >
      {children || label}
    </Button>
  )
}

export const YellowButton = ({label, type, children, onClick}: ButtonType) => {
  return (
  <Button 
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
    <Badge className={`border-none ${className}`} onClick={onClick} variant="outline">{children || label}</Badge>
  )
}