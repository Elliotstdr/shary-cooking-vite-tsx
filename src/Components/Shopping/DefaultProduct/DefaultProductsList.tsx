import { PiTrash, PiShoppingCart } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { fetchDelete } from "../../../Hooks/api.hook";
import { errorToast } from "../../../Services/functions";
import { removeProduct, updateSelectedList } from "../../../Store/Reducers/shoppingReducer";

const DefaultProductsList = () => {
  const dispatch = useDispatch()
  const shopping = useSelector((state: RootState) => state.shopping);
  const selectedList = useSelector((state: RootState) => state.shopping.selectedList);

  const deleteDefaultProduct = async (item: DefaultProduct) => {
    const res = await fetchDelete(`/default_product/${item.id}`)
    if (res.error) {
      errorToast('Une erreur est survenue lors de la suppression')
      return
    }

    dispatch(removeProduct(item))
  }

  const editSelectedListContent = async (item: DefaultProduct) => {
    if (!selectedList) return

    const newContent = [...selectedList.content]
    newContent.unshift({
      name: item.name,
      selected: false,
      fromRecipe: false
    })

    dispatch(updateSelectedList({
      ...selectedList,
      content: newContent
    }))
  }

  const isAlreadyIn = (item: DefaultProduct) => {
    return selectedList?.content.some((x) => x.name.toLocaleLowerCase() === item.name.toLocaleLowerCase())
  }

  return (
    <>
      {shopping.defaultProduct.length > 0 ? (
        shopping.defaultProduct.map((x) =>
          <div className="flex max-w-[280px] justify-between" key={x.id}>
            <span>{x.name}</span>
            <div className="flex-center">
              {selectedList &&
                <PiShoppingCart
                  className={`
                    ml-2 size-6 text-green self-center
                    ${isAlreadyIn(x) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                  `}
                  onClick={() => !isAlreadyIn(x) && editSelectedListContent(x)}
                ></PiShoppingCart>
              }
              <PiTrash
                className="ml-2 cursor-pointer size-6 text-green self-center"
                onClick={() => deleteDefaultProduct(x)}
              ></PiTrash>
            </div>
          </div>
        )
      ) : (
        <span className="text-left">
          Ajoutez ici vos produits du quotidien qui ne figurent pas dans les recettes (beurre, café, sopalin) <br />
          Ajoutez les ensuite à la recette de votre choix
        </span>
      )}
    </>
  );
};

export default DefaultProductsList;