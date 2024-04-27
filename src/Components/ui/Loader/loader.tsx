type Props = {
  className?: string
}

const Loader = (props: Props) => {
  return (
    <div className={`w-full z-50 bg-transparent text-center py-8 ${props.className}`}>
      <span className="
        size-14 rounded-full inline-block border-t-4 border-t-orange border-r-4 border-r-transparent animate-loader
        after:absolute after:left-0 after:top-0 after:size-14 after:rounded-full after:border-l-4 after:border-l-green 
        after:border-b-4 after:border-b-transparent after:animate-reverse-loader
      "></span>
    </div>
  );
};

export default Loader;
