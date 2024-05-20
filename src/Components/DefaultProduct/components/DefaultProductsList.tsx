import { PiTrash } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { fetchDelete } from "../../../Hooks/api.hook";
import { errorToast } from "../../../Services/functions";
import { removeProduct } from "../../../Store/Reducers/shoppingReducer";

const DefaultProductsList = () => {
  const dispatch = useDispatch()
  const shopping = useSelector((state: RootState) => state.shopping);

  const deleteDefaultProduct = async (item: DefaultProduct) => {
    const res = await fetchDelete(`/default_product/${item.id}`)
    if (res.error) {
      errorToast('Une erreur est survenue lors de la suppression')
      return
    }

    dispatch(removeProduct(item))
  }

  return (
    <>
      {shopping.defaultProduct.length > 0 ? (
        shopping.defaultProduct.map((x) =>
          <div className="flex min-w-full justify-between">
            <span>{x.name}</span>
            <PiTrash
              className="ml-2 cursor-pointer size-6 text-green self-center"
              onClick={() => deleteDefaultProduct(x)}
            ></PiTrash>
          </div>
        )
      ) : (
        <span>
          Ajoutez ici vos produits du quotidien qui ne figurent pas dans les recettes (beurre, café, sopalin) <br />
          Ils apparaitront en bas de vos listes de courses, vous n'aurez plus qu'à les décocher
        </span>
      )}
    </>
  );
};

export default DefaultProductsList;