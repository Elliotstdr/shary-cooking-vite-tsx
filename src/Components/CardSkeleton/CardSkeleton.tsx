import "./CardSkeleton.scss";
import { Skeleton } from 'primereact/skeleton';

const CardSkeleton = () => {
  return (
    <div className="skeleton">
      <Skeleton width="20rem" height="12rem" className="noMargin"></Skeleton>
      <div className="sub-skeleton">
        <Skeleton size="2rem" shape="circle"></Skeleton>
        <Skeleton width="5rem"></Skeleton>
      </div>
      <Skeleton width="10rem" className="center"></Skeleton>
      <div className="sub-skeleton">
        <Skeleton size="1rem" shape="circle"></Skeleton>
        <Skeleton width="5rem"></Skeleton>
      </div>
      <div className="sub-skeleton">
        <Skeleton size="1rem" shape="circle"></Skeleton>
        <Skeleton width="5rem"></Skeleton>
      </div>
      <div className="sub-skeleton">
        <Skeleton size="1rem" shape="circle"></Skeleton>
        <Skeleton width="5rem"></Skeleton>
      </div>
      <Skeleton size="2rem" shape="circle" className="center bottom"></Skeleton>
    </div>
  );
};

export default CardSkeleton;