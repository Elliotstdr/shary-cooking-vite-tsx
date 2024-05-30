import { Divider } from "primereact/divider";
import ListsContainer from "../Components/Shopping/ListsContainer";
import DefaultProduct from "../Components/Shopping/DefaultProduct";
import { useFetchGet } from "../Hooks/api.hook";
import { useDispatch, useSelector } from "react-redux";
import { updateShopping } from "../Store/Reducers/shoppingReducer";
import { useEffect, useState } from "react";
import Empty from "../Components/Shopping/Empty";
import { useScreenSize } from "../Hooks/useScreenSize.hook";
import { TabMenu } from "primereact/tabmenu";
import { updateRecipe } from "../Store/Reducers/recipeReducer";

const Shopping = () => {
  const dispatch = useDispatch()
  const screenSize = useScreenSize()
  const shopping = useSelector((state: RootState) => state.shopping);
  const lists = useFetchGet<List[]>('/list')
  const defaultProducts = useFetchGet<DefaultProduct[]>('/default_product')
  const recipes = useFetchGet<Recipe[]>('/recipes')
  const [value, setValue] = useState(0)

  const items = [
    { label: 'Mes listes' },
    { label: 'Produits communs' },
  ];

  useEffect(() => {
    if (!lists.loaded) return

    dispatch(updateShopping({
      lists: lists.data || [],
      defaultProduct: defaultProducts.data || [],
      selectedList: lists.data && lists.data?.length > 0 ? lists.data[0] : null
    }))
  }, [lists.loaded, defaultProducts.loaded]);

  useEffect(() => {
    if (recipes.loaded && recipes.data) {
      dispatch(updateRecipe({
        recipes: recipes.data
      }))
    }
  }, [recipes.loaded]);

  return (
    <div
      id="shopping"
      className={`
        flex flex-col my-8 mx-4 min-h-[60vh] tablet:m-12 nav:mx-[7%] nav:justify-center
        ${shopping.lists.length === 0 ? 'items-center' : ''}
      `}
    >
      {shopping.lists.length > 0
        ? (
          screenSize.width >= 990 ? (
            <div className="flex w-full">
              <ListsContainer></ListsContainer>
              <Divider layout="vertical" className="!mt-10"></Divider>
              <DefaultProduct></DefaultProduct>
            </div>
          ) : (
            <>
              <TabMenu
                activeIndex={value}
                onTabChange={(e) => setValue(e.index)}
                model={items}
                className="mb-12 w-fit mx-auto"
              ></TabMenu>
              {value === 0 && <ListsContainer></ListsContainer>}
              {value === 1 && <DefaultProduct></DefaultProduct>}
            </>
          )
        ) : (
          <Empty></Empty>
        )
      }
    </div>
  );
};

export default Shopping;
