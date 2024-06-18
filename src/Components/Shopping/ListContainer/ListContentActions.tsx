import { IoCopy, IoCopyOutline } from "react-icons/io5";
import { PiShareNetwork, PiTrash } from "react-icons/pi";
import { FiEdit } from "react-icons/fi";
import { errorToast } from "../../../Services/functions";
import { fetchDelete, fetchPut } from "../../../Hooks/api.hook";
import ModalShareList from "../../Modal/ModalShareList";
import ModalDeleteConfirm from "../../Modal/ModalDeleteConfirm";
import { editList, initSelectedList, removeList, updateSelectedList } from "../../../Store/Reducers/shoppingReducer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalChooseRecipe from "../../Modal/ModalChooseRecipe";

type Props = {
  showRecipes: boolean,
}

const ListContentActions = ({ showRecipes }: Props) => {
  const dispatch = useDispatch()
  const selectedList = useSelector((state: RootState) => state.shopping.selectedList) as List;
  const recipe = useSelector((state: RootState) => state.recipe);
  const [wantToDelete, setWantToDelete] = useState(false);
  const [visibleModalShare, setVisibleModalShare] = useState(false);
  const [visibleChooseRecipe, setVisibleChooseRecipe] = useState(false);
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    setName(selectedList.name)
  }, [selectedList])

  const deleteList = async () => {
    const res = await fetchDelete(`/list/${selectedList.id}`)
    if (res.error) {
      errorToast('Une erreur est survenue lors de la suppression de la liste')
      return
    }

    dispatch(removeList(selectedList))
    dispatch(initSelectedList())
    setWantToDelete(false)
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (name === selectedList.name) return

      const res = await fetchPut(`/list/${selectedList.id}`, { name })
      if (res.error) return

      dispatch(updateSelectedList(res.data))
      dispatch(editList(res.data))
    }, 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [name])

  const copyContent = () => {
    let stringShopping = ""
    if (showRecipes) {
      selectedList.selectedRecipes.forEach((x) => stringShopping += x.title + "\n")
      stringShopping += "\n"
    }
    [...selectedList.content]
      .filter((x) => !x.selected)
      .forEach((x) => stringShopping += x.name + '\n')
    navigator.clipboard.writeText(stringShopping)
  }

  return (
    <>
      <div className="flex justify-between items-center mb-2 ml-6 laptop:ml-0">
        <input
          className={`
            font-bold bg-transparent text-lg w-1/2 p-1 pl-2 border border-transparent focus-visible:outline-none laptop:w-unset
            focus:bg-white focus:rounded-md focus:border-search`}
          value={name} onChange={(e) => setName(e.target.value)}
        ></input>
        <div className="flex gap-4 items-center">
          <FiEdit
            className="cursor-pointer size-5"
            onClick={() => setVisibleChooseRecipe(true)}
          ></FiEdit>
          {!copied ? (
            <IoCopyOutline
              className="cursor-pointer size-[1.35rem]"
              onClick={() => {
                copyContent()
                setCopied(true)
              }}
            ></IoCopyOutline>
          ) : (
            <IoCopy
              className="cursor-pointer size-[1.35rem]"
              onClick={() => copyContent()}
            ></IoCopy>
          )}
          <PiShareNetwork
            className="cursor-pointer size-[1.35rem]"
            onClick={() => setVisibleModalShare(true)}
          ></PiShareNetwork>
          <PiTrash
            className="cursor-pointer size-[1.4rem]"
            onClick={() => setWantToDelete(true)}
          ></PiTrash>
        </div>
      </div>
      {wantToDelete && (
        <ModalDeleteConfirm
          wantToDelete={wantToDelete}
          setWantToDelete={setWantToDelete}
          deleteAction={deleteList}
        ></ModalDeleteConfirm>
      )}
      {visibleModalShare && (
        <ModalShareList
          visibleModalShare={visibleModalShare}
          setVisibleModalShare={setVisibleModalShare}
          listId={selectedList.id}
        ></ModalShareList>
      )}
      {visibleChooseRecipe && (
        <ModalChooseRecipe
          visible={visibleChooseRecipe}
          setVisible={setVisibleChooseRecipe}
          currentRecipes={
            recipe.recipes.filter((x) => selectedList.selectedRecipes.some((y) => x.id === y.id))
          }
        ></ModalChooseRecipe>
      )}
    </>
  );
};

export default ListContentActions;