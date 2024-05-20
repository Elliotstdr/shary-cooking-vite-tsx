import { useEffect, useRef, useState } from "react";
import List from "./components/List";
import ListContent from "./components/ListContent";
import { useSelector } from "react-redux";
import ModalChooseRecipe from "../Modal/ModalChooseRecipe";
import { useOutsideAlerter } from "../../Hooks/useOutsideAlerter.hook";

const ListsContainer = () => {
  const shopping = useSelector((state: RootState) => state.shopping);
  const [visibleChooseRecipe, setVisibleChooseRecipe] = useState(false);
  const [selectedListId, setSelectedListId] = useState(shopping.lists[0]?.id || 0);
  const [showBar, setShowBar] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setShowBar(false));

  useEffect(() => {
    if (shopping.lists.length > 0) {
      setSelectedListId(shopping.lists[0].id)
    }
    setShowBar(false)
  }, [shopping.lists]);

  return (
    <div className="w-full laptop:w-3/4">
      <button className="flex-center font-bold mb-4 laptop:ml-4" onClick={() => setVisibleChooseRecipe(true)}>
        <div className="pi pi-plus mr-1"></div> Créer une liste
      </button>
      <div className="flex gap-8 left-0 relative">
        <div ref={wrapperRef}>
          <div
            className="pi pi-bars cursor-pointer !text-xl laptop:!hidden"
            onClick={() => setShowBar(!showBar)}
          ></div>
          <div
            className={`
            flex flex-col absolute top-6 rounded-md bg-white z-[1000] border-r border-search
            laptop:unset laptop:bg-transparent laptop:rounded-none
            ${showBar ? 'visible opacity-100 max-w-80' : 'invisible opacity-0 max-w-0 tablet:visible tablet:opacity-100 tablet:max-w-80'}
          `}
          >
            {shopping.lists.map((x) =>
              <List
                key={x.id}
                item={x}
                isSelected={selectedListId === x.id}
                setSelectedListId={setSelectedListId}
              ></List>
            )}
          </div>
        </div>
        {selectedListId !== 0 &&
          <ListContent
            content={JSON.parse(shopping.lists.find((item) => item.id === selectedListId)?.content || '[]')}
            listRecipes={JSON.parse(shopping.lists.find((item) => item.id === selectedListId)?.selectedRecipes || '[]')}
            selectedListId={selectedListId}
          ></ListContent>
        }
      </div>
      {visibleChooseRecipe &&
        <ModalChooseRecipe
          visible={visibleChooseRecipe}
          setVisible={setVisibleChooseRecipe}
          setSelectedListId={setSelectedListId}
        ></ModalChooseRecipe>
      }
    </div>
  );
};

export default ListsContainer;