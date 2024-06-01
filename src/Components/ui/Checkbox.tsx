
type Props = {
  checked: boolean,
  onClick: (e: any) => void,
  className?: string
}

const Checkbox = ({ checked, onClick, className = "" }: Props) => {
  return (
    <div
      className={
        `flex-center cursor-pointer size-[18px] border-2 text-input-grey rounded-[4px] transition-all appearance-none
        ${checked ? 'border-orange bg-orange' : 'border-border-grey bg-white'}
        ${className}
      `}
      onClick={(e) => onClick({ ...e, checked: !checked })}
    >
      {checked && <span className="pi pi-check !flex-center text-white text-xs size-[14px] before:text-xs"></span>}
    </div>
  );
};

export default Checkbox;