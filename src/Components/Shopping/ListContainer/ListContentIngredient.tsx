import Checkbox from "../../ui/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedList } from "../../../Store/Reducers/shoppingReducer";

type Props = {
  item: ListContent
}

const ListContentIngredient = ({ item }: Props) => {
  const dispatch = useDispatch()
  const selectedList = useSelector((state: RootState) => state.shopping.selectedList) as List;

  const editFullContent = (item: ListContent) => {
    dispatch(updateSelectedList({
      ...selectedList,
      content: selectedList.content.map((x) => {
        if (x.name === item.name) {
          return {
            ...x,
            selected: !x.selected
          }
        } else return x
      })
    }))
  }

  return (
    <div className="flex items-center gap-2">
      <Checkbox checked={item.selected} onClick={() => editFullContent(item)}></Checkbox>
      <span title={item.name} className="line-clamp-1 text-left">{item.name}</span>
    </div>
  );
};

export default ListContentIngredient;