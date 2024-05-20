import { Checkbox } from "primereact/checkbox";
import { Separator } from "../../ui/Separator";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPut } from "../../../Hooks/api.hook";
import { IoCopyOutline } from "react-icons/io5";
import { successToast } from "../../../Services/functions";
import SlideIn from "../../ui/SlideIn";
import RecipeCardDetail from "../../RecipeCardDetail/RecipeCardDetail";
import { InputSwitch } from 'primereact/inputswitch';
import { editList } from "../../../Store/Reducers/shoppingReducer";

type Props = {
  content: ListContent[]
  listRecipes: ListRecipes[]
  selectedListId: number
}

type Content = {
  id: number | null;
  name: string,
  selected: boolean,
  userId: number | null;
}

const ListContent = ({ content, listRecipes, selectedListId }: Props) => {
  const dispatch = useDispatch()
  const shopping = useSelector((state: RootState) => state.shopping);
  const recipe = useSelector((state: RootState) => state.recipe);
  const [selectedDetail, setSelectedDetail] = useState<Recipe | null>(null);
  const [showRecipes, setShowRecipes] = useState(true);
  const [fullContent, setFullContent] = useState<Content[]>([]);

  useEffect(() => {
    const df = [...shopping.defaultProduct].map((x) => { return { ...x, selected: true } })
    const newContent = [...content].map((x) => { return { ...x, userId: null, id: null } })

    setFullContent([...df, ...newContent])
  }, [content]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      const onlyContent = fullContent
        .filter((x) => !x.userId)
        .map((x) => {
          return {
            name: x.name,
            selected: x.selected
          }
        })

      if (JSON.stringify(onlyContent) === JSON.stringify(content)) return;

      const res = await fetchPut(`/list/${selectedListId}`, { content: JSON.stringify(onlyContent) })
      if (res.error) return

      dispatch(editList(res.data))
    }, 2000)
    return () => clearTimeout(delayDebounceFn)
  }, [fullContent])

  const editFullContent = (item: Content) => {
    setFullContent((prev) => prev.map((x) => {
      if (x.name === item.name) {
        return {
          ...x,
          selected: !x.selected
        }
      } else return x
    }))
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <InputSwitch checked={showRecipes} onChange={(e) => setShowRecipes(!!e.value)} inputId="switch" />
          <label htmlFor="switch">{showRecipes ? "Masquer" : "Afficher"} les recettes</label>
        </div>
        <IoCopyOutline
          className="cursor-pointer size-5"
          onClick={() => {
            let stringShopping = ""
            if (showRecipes) {
              listRecipes.forEach((x) => stringShopping += x.title + "\n")
              stringShopping += "\n"
            }
            fullContent
              .filter((x) => !x.selected)
              .forEach((x) => stringShopping += x.name + '\n')
            navigator.clipboard.writeText(stringShopping)
            successToast('Copié')
          }}
        ></IoCopyOutline>
      </div>
      <div className={`w-4/5 transition-all ${showRecipes ? 'visible-transition mb-4' : 'hidden-transition'}`}>
        {listRecipes.map((x) =>
          <div
            className="text-left cursor-pointer line-clamp-1 my-1"
            onClick={() => setSelectedDetail(recipe.recipes.find((y) => y.id === x.id) || null)}
            title={x.title}
          >{x.title}</div>
        )}
      </div>
      {fullContent
        .filter((x) => !x.userId || (x.userId && !x.selected))
        .sort((a, b) => Number(a.selected) - Number(b.selected))
        .map((x) =>
          <div className="flex items-center gap-2">
            <Checkbox checked={x.selected} onClick={() => editFullContent(x)}></Checkbox>
            <span title={x.name} className="line-clamp-1 text-left">{x.name}</span>
          </div>
        )}
      <Separator className="w-full"></Separator>
      {fullContent.filter((x) => x.userId && x.selected).map((x) =>
        <div className="flex items-center gap-2">
          <Checkbox checked={x.selected} onClick={() => editFullContent(x)}></Checkbox>
          <span title={x.name} className="line-clamp-1 text-left">{x.name}</span>
        </div>
      )}
      <SlideIn visible={!!selectedDetail} setVisible={() => setSelectedDetail(null)}>
        {selectedDetail && <RecipeCardDetail recipeDetail={selectedDetail}></RecipeCardDetail>}
      </SlideIn>
    </div >
  );
};

export default ListContent;