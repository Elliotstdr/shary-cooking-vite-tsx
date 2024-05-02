type SkeletonProps = {
  className?: string,
  type?: "normal" | "round"
}

export const Skeleton = ({ className = "", type = "normal" }: SkeletonProps) => {
  return (
    <div className={`
      animate-pulse bg-search" 
      ${type === "normal" ? "rounded-md" : "rounded-full"} 
      ${className}
    `}></div>
  )
}