import { Switch } from "@/components/ui/switch"

interface SwitcherType {
    disabled?: boolean;
    onClick?: () => void;
    checked?: boolean;
}

const TMSwitch = ({disabled, onClick, checked}: SwitcherType) => {
    return (
        <Switch 
            checked={checked}
            onClick={onClick}
            disabled={disabled}
            className="data-[state=checked]:bg-infoBlue data-[state=unchecked]:bg-gray" 
        />
    )
}

export default TMSwitch;