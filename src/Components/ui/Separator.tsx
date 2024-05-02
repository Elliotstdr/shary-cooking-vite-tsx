type SeparatorProps = {
  className?: string,
  orientation?: "horizontal" | "vertical"
}

export const Separator = ({ className = "", orientation = "horizontal" }: SeparatorProps) => {
  return (
    <div className={`
      border-search self-center
      ${orientation === "horizontal" ? "h-[1px] w-1/2 my-5 border-t" : "h-full w-[1px] mx-5 border-r absolute"}
      ${className}
    `}></div>
  )
}