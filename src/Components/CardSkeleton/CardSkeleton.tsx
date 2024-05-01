import { Skeleton } from '../../Components/ui/skeleton';

const CardSkeleton = () => {
  return (
    <div className="flex flex-col w-80 mb-8">
      <Skeleton className="m-2 bg-skeleton w-80 h-48"></Skeleton>
      <div className="flex items-center">
        <Skeleton className="m-2 bg-skeleton size-8 rounded-full"></Skeleton>
        <Skeleton className="m-2 bg-skeleton w-20 h-4"></Skeleton>
      </div>
      <Skeleton className="self-center m-2 bg-skeleton w-40 h-4"></Skeleton>
      <div className="flex items-center">
        <Skeleton className="m-2 bg-skeleton size-4 rounded-full"></Skeleton>
        <Skeleton className="m-2 bg-skeleton w-20 h-4"></Skeleton>
      </div>
      <div className="flex items-center">
        <Skeleton className="m-2 bg-skeleton size-4 rounded-full"></Skeleton>
        <Skeleton className="m-2 bg-skeleton w-20 h-4"></Skeleton>
      </div>
      <div className="flex items-center">
        <Skeleton className="m-2 bg-skeleton size-4 rounded-full"></Skeleton>
        <Skeleton className="m-2 bg-skeleton w-20 h-4"></Skeleton>
      </div>
      <Skeleton className="self-center m-2 mt-16 bg-skeleton size-8 rounded-full"></Skeleton>
    </div>
  );
};

export default CardSkeleton;