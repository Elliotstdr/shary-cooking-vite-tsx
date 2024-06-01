type Props = {
  checked: boolean,
  onClick: (e: any) => void,
  className?: string,
  title?: string
}

const RadioButton = ({ checked, onClick, className = "", title = "" }: Props) => {
  return (
    <div
      className={
        `group relative inline-flex justify-center items-center align-bottom cursor-pointer size-[22px] border-2 text-input-grey rounded-full transition-all appearance-none
        ${checked ? 'border-orange bg-orange' : 'border-border-grey bg-white'}
        ${className}
      `}
      onClick={(e) => onClick({ ...e, checked: !checked })}
    >
      {checked && <span className="bg-white text-xs size-3 before:text-xs rounded-full"></span>}
      {title &&
        <span className="bg-tooltip text-white py-2 px-4 rounded-md absolute -bottom-[44px] w-max opacity-0 transition-opacity group-hover:opacity-100">
          {title}
        </span>
      }
    </div>
  );
};

export default RadioButton;