import { useState } from "react";
import { formatDate } from "../../../Services/functions";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedList } from "../../../Store/Reducers/shoppingReducer";

const Lists = () => {
  const dispatch = useDispatch()
  const shopping = useSelector((state: RootState) => state.shopping);
  const [showBar, setShowBar] = useState(false);

  return (
    <>
      <div
        className="pi pi-bars absolute top-1 cursor-pointer h-fit !text-xl laptop:!hidden"
        onClick={() => setShowBar(!showBar)}
      ></div>
      <div
        className={`
            flex flex-col absolute top-7 -left-2 rounded-md bg-white z-[1000] border-r border-search
            laptop:unset laptop:bg-transparent laptop:rounded-none
            ${showBar ? 'visible opacity-100 max-w-80' : 'invisible opacity-0 max-w-0 laptop:visible laptop:opacity-100 laptop:max-w-80'}
          `}
      >
        {[...shopping.lists]
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .map((x) =>
            <div
              className={`cursor-pointer flex flex-col justify-center text-start pl-3 py-2 text-lg w-60 border-b-search border-b laptop:h-16`}
              onClick={() => {
                setShowBar(false)
                dispatch(updateSelectedList(x))
              }}
              key={x.id}
            >
              <div
                className={`
                text-base font-bold bg-transparent focus-visible:outline-none laptop:text-lg
                ${shopping.selectedList?.id === x.id ? 'text-orange' : ""}
              `}
              >{x.name}</div>
              <span className="text-sm text-icon hidden laptop:block">{formatDate(x.createdAt)}</span>
            </div>
          )}
      </div>
    </>
  );
};

export default Lists;