import { useEffect, useRef, useState } from "react";
import { errorToast, formatDate } from "../../../Services/functions";
import { Menu } from 'primereact/menu'
import { useOutsideAlerter } from "../../../Hooks/useOutsideAlerter.hook";
import { fetchDelete, fetchPut } from "../../../Hooks/api.hook";
import { useDispatch } from "react-redux";
import { removeList } from "../../../Store/Reducers/shoppingReducer";
import ModalShareList from "./ModalShareList";

type Props = {
  item: List;
  isSelected: boolean
  setSelectedListId: (id: number) => void
}

const List = ({ item, setSelectedListId, isSelected }: Props) => {
  const dispatch = useDispatch()
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleModalShare, setVisibleModalShare] = useState(false);
  const [name, setName] = useState(item.name);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setVisibleMenu(false));

  const model = [
    {
      label: "Partager",
      icon: "pi pi-share-alt",
      command: () => setVisibleModalShare(true)
    },
    {
      label: "Supprimer",
      icon: "pi pi-trash",
      command: () => deleteList()
    },
  ]

  const deleteList = async () => {
    const res = await fetchDelete(`/list/${item.id}`)
    if (res.error) {
      errorToast('Une erreur est survenue lors de la suppression de la liste')
      return
    }

    dispatch(removeList(item))
    setSelectedListId(0)
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (name === item.name) return
      fetchPut(`/list/${item.id}`, { name })
    }, 2000)
    return () => clearTimeout(delayDebounceFn)
  }, [name])

  return (
    <>
      <div
        className={`cursor-pointer flex justify-between items-center gap-4 text-lg w-60 h-16 border-b-search border-b`}
        onClick={() => setSelectedListId(item.id)}
      >
        <div className="flex flex-col text-start pl-3 py-2">
          <input
            className={`font-bold bg-transparent focus-visible:outline-none ${isSelected ? 'text-orange' : ""}`}
            value={name} onChange={(e) => setName(e.target.value)}
            style={{ width: name.length + "ch", maxWidth: "9rem" }}
          ></input>
          <span className="text-sm text-icon">{formatDate(item.createdAt)}</span>
        </div>
        <div
          className="flex-center relative w-12 h-full"
          onClick={(e) => {
            e.stopPropagation()
            setVisibleMenu(!visibleMenu)
          }}
          ref={wrapperRef}
        >
          <span className="font-bold mb-2">...</span>
          {visibleMenu && <Menu model={model} className="absolute top-9 z-[1000] !w-36"></Menu>}
        </div>
      </div>
      {visibleModalShare && (
        <ModalShareList
          visibleModalShare={visibleModalShare}
          setVisibleModalShare={setVisibleModalShare}
          listId={item.id}
        ></ModalShareList>
      )}
    </>
  );
};

export default List;