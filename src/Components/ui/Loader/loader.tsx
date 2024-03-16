import "./loader.scss";

type Props = {
  className?: string
  size?: string
}

const Loader = ({ className = "", size = "3.5rem" }: Props) => {
  return (
    <div className={`loaderContainer ${className}`}>
      <span className={`loaderContainer__loader size-[${size}] after:size-[${size}]`}></span>
    </div>
  );
};

export default Loader;
