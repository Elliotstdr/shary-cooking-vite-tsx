import Checkbox from "../ui/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { resetSearch, updateSearch } from "../../Store/Reducers/searchReducer";
import { GrPowerReset } from "react-icons/gr";

type Props = {
  className?: string
}

const SearchCheckBoxes = ({ className = "" }: Props) => {
  const dispatch = useDispatch()
  const search = useSelector((state: RootState) => state.search);

  return (
    <div className={`w-full flex gap-4 h-6 ${className}`}>
      <div className="flex items-center">
        <Checkbox
          onClick={(e) => dispatch(updateSearch({ boxMine: e.checked || false }))}
          checked={search.boxMine}
        ></Checkbox>
        <span className="ml-1 text-sm">Mes recettes</span>
      </div>
      <div className="flex items-center">
        <Checkbox
          onClick={(e) => dispatch(updateSearch({ boxFavorites: e.checked || false }))}
          checked={search.boxFavorites}
        ></Checkbox>
        <span className="ml-1 text-sm">Mes favoris</span>
      </div>
      {search.isSearch &&
        <GrPowerReset
          className="reset cursor-pointer text-orange self-center size-6"
          onClick={() => {
            dispatch(resetSearch())
          }}
        ></GrPowerReset>
      }
    </div>
  );
};

export default SearchCheckBoxes;