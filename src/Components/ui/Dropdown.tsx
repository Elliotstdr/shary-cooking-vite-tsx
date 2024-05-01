import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

type DropdownProps = {
  items: any[],
  placeholder?: string,
  optionLabel?: string,
  className?: string,
  defaultValue?: string,
  onChange?: (e: any) => void
}

export default function Dropdown({ items, placeholder, optionLabel = "label", className, defaultValue, onChange }: DropdownProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <Select onValueChange={(e) => {
      setValue(e)
      const item = items.find((item) => item[optionLabel] === e)
      onChange && onChange(item)
    }} value={value} defaultValue={value}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-52">
        <SelectGroup>
          {items.map((x) => <SelectItem value={x[optionLabel]}>{x[optionLabel]}</SelectItem>)}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
