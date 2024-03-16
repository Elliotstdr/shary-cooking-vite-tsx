import { Skeleton } from 'primereact/skeleton';

const CardSkeleton = () => {
  return (
    <div className="flex flex-col w-80 mb-8">
      <Skeleton width="20rem" height="12rem" className="!m-0"></Skeleton>
      <div className="flex items-center">
        <Skeleton size="2rem" shape="circle"></Skeleton>
        <Skeleton width="5rem"></Skeleton>
      </div>
      <Skeleton width="10rem" className="self-center"></Skeleton>
      <div className="flex items-center">
        <Skeleton size="1rem" shape="circle"></Skeleton>
        <Skeleton width="5rem"></Skeleton>
      </div>
      <div className="flex items-center">
        <Skeleton size="1rem" shape="circle"></Skeleton>
        <Skeleton width="5rem"></Skeleton>
      </div>
      <div className="flex items-center">
        <Skeleton size="1rem" shape="circle" className="m-2 bg-skeleton"></Skeleton>
        <Skeleton width="5rem"></Skeleton>
      </div>
      <Skeleton size="2rem" shape="circle" className="self-center mt-16"></Skeleton>
    </div>
  );
};

export default CardSkeleton;