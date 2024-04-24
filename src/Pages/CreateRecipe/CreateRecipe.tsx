import { useRef, useState, useMemo, useEffect } from "react";
import "./CreateRecipe.scss";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { useDispatch, useSelector } from "react-redux";
import ImageUpload from "../../Components/ui/ImageUpload/ImageUpload";
import { fetchPost, fetchPut, useFetchGet } from "../../Hooks/api.hook";
import { errorToast, successToast } from "../../Services/functions";
import IngredientsCreation from "./components/IngredientsCreation";
import StepsCreation from "./components/StepsCreation";
import { RadioButton } from "primereact/radiobutton";
import Bouton from "../../Components/ui/Bouton/Bouton";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Loader from "../../Components/ui/Loader/loader";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { editRecipeInRecipes, updateRecipe } from "../../Store/Reducers/recipeReducer";
import { checkIngredients, checkSteps, getLastId, regimeTooltips } from "../../Services/createRecipeFunctions";

type Props = {
  recipe?: Recipe,
  setVisibleModif?: React.Dispatch<React.SetStateAction<boolean>>,
  HFFillRecipe?: HFFillRecipe
}

type Body = {
  title: string,
  time: string,
  image: string | null,
  createdAt: Date,
  id?: number,
  type?: string,
  regime?: string,
  postedByUser?: string,
  steps?: Array<Step>,
  ingredients?: Array<PayloadIngredient>,
  fromHellof?: boolean
}
type Values = Body & {
  number: string,
}
type Payload = Body & {
  number: number,
}

type PayloadIngredient = {
  label: string,
  quantity: number | undefined,
  unit: string
}

const CreateRecipe = (props: Props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const secondaryTables = useSelector((state: RootState) => state.secondaryTables);
  const recipe = useSelector((state: RootState) => state.recipe);
  const dispatch = useDispatch();
  const ingredientData = useFetchGet<IngredientData[]>("/ingredient_datas");

  useEffect(() => {
    if (props.recipe) fillForm(props.recipe)
    else if (props.HFFillRecipe) fillForm(props.HFFillRecipe)
    else window.scrollTo(0, 0);
  }, []);
  const isFilled = props.recipe || props.HFFillRecipe
  const [currentPictureDeleted, setCurrentPictureDeleted] = useState(false)
  const [isRestored, setIsRestored] = useState(false)
  const [availableToReset, setAvailableToReset] = useState(false)
  const [image, setImage] = useState(null);
  const ref = useRef(null);
  const [typeId, setTypeId] = useState(secondaryTables.types![0]?.id || 1);
  const [regimeId, setRegimeId] = useState(secondaryTables.regimes![0]?.id || 1);
  const [stepsList, setStepsList] = useState<Array<Step>>([{ description: "", stepIndex: 1 }]);
  const [ingredientList, setIngredientList] = useState<Array<FormIngredient>>([
    {
      unit: null,
      quantity: undefined,
      label: "",
      id: 1,
    },
  ]);

  const {
    control,
    register,
    getValues,
    reset,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: "",
      number: "1",
      time: "00:00",
      image: null,
      createdAt: new Date(),
    } as Values
  });

  useEffect(() => {
    if (availableToReset) {
      setIsRestored(false)
      resetForm();
    }
  }, [availableToReset]);

  useEffect(() => {
    if (availableToReset) {
      setAvailableToReset(false)
      return
    }

    if (isFilled ||
      (!image && typeId === 1 && regimeId === 1 &&
        !ingredientList[0].label && !stepsList[0].description &&
        !getValues("title") && getValues("time") === "00:00" && getValues("number") === "1")
    ) return

    dispatch(updateRecipe({
      savedForm: {
        ...getValues(),
        ingredients: ingredientList,
        steps: stepsList,
        type: { id: typeId },
        regime: { id: regimeId }
      }
    }))
  }, [typeId, regimeId, ingredientList, stepsList, image, watch("title"), watch("time"), watch("number")])

  const fillForm = (payload: Recipe | HFFillRecipe) => {
    setTypeId(payload.type.id);
    setRegimeId(payload.regime.id);

    const steps = [...payload.steps]
    setStepsList(steps.sort((a, b) => a.stepIndex - b.stepIndex).map((step) => {
      return { description: step.description, stepIndex: step.stepIndex };
    }));
    setIngredientList(payload.ingredients.map((ingredient, index) => {
      return { id: index + 1, ...ingredient, quantity: ingredient.quantity?.toString() };
    }))

    reset({
      title: payload.title,
      number: payload.number.toString(),
      time: payload.time,
    })
  }

  const resetForm = () => {
    reset({
      title: "",
      number: "1",
      time: "00:00"
    });
    setImage(null);
    secondaryTables.types && setTypeId(secondaryTables.types[0]?.id);
    secondaryTables.regimes && setRegimeId(secondaryTables.regimes[0]?.id);
    setStepsList([
      {
        description: "",
        stepIndex: 1,
      },
    ]);
    setIngredientList([
      {
        unit: null,
        quantity: "",
        label: "",
        id: 1,
      },
    ]);
    successToast("Votre recette a bien été créée");
  };

  const setFields = () => {
    const data: Payload = { ...getValues(), number: Number(getValues("number")) };
    data.createdAt = new Date();
    data.type = `/api/types/${typeId}`;
    data.regime = `/api/regimes/${regimeId}`;
    data.postedByUser = `/api/users/${auth.userConnected?.id}`;
    data.steps = stepsList;
    data.ingredients = ingredientList.map((ingredient: FormIngredient) => {
      return {
        label: ingredient.label,
        quantity: Number(ingredient.quantity),
        unit: `/api/units/${ingredient?.unit?.id}`
      }
    });
    if (props.recipe) {
      data.id = props.recipe.id;
    }
    if (image) {
      data.image = image;
    } else if (props.HFFillRecipe) {
      data.image = props.HFFillRecipe.image
    } else {
      data.image = null;
    }

    if (!props.recipe) {
      data.fromHellof = !!props.HFFillRecipe
    }

    return data;
  };

  const onSubmit = async () => {
    ref.current && window.scroll({
      top: (ref.current as HTMLElement)?.offsetTop,
      behavior: "smooth",
    });

    if (props.recipe) {
      await putRecipeFunction();
    } else {
      await createRecipeFunction();
    }
  };

  const createRecipeFunction = async () => {
    const data = setFields();

    const response = await fetchPost(`/recipes`, data);
    if (response.error) {
      errorToast(
        response.error?.response?.data?.detail?.includes("visiteur")
          ? response.error.response.data.detail
          : "Une erreur est survenue lors de la création de votre recette"
      );
      return;
    }

    if (props.setVisibleModif) {
      successToast("Recette créée !")
      props.setVisibleModif(false)
    } else {
      setAvailableToReset(true)
    }
  };

  const putRecipeFunction = async () => {
    if (!props.recipe || !props.setVisibleModif) return;

    const data = setFields();

    const response = await fetchPut(`/recipes/${props.recipe.id}`, data);
    if (response.error) {
      errorToast(
        response.error?.response?.data?.detail?.includes("visiteur")
          ? response.error.response.data.detail
          : "Une erreur est survenue lors de la modification de votre recette"
      );
      return;
    }
    props.setVisibleModif(false)
    dispatch(editRecipeInRecipes(response.data))
  };

  const itemIds: number[] = useMemo(
    () => ingredientList.map((item) => item.id ? item.id : 1),
    [ingredientList]
  );

  const handleDragEnd = (event: { active: any, over: any }) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setIngredientList((ingredientList) => {
        const oldIndex = ingredientList.findIndex(
          (item) => item.id === active.id
        );
        const newIndex = ingredientList.findIndex(
          (item) => item.id === over.id
        );

        return arrayMove(ingredientList, oldIndex, newIndex);
      });
    }
  };

  const deletePicture = async () => {
    if (!props.recipe) return

    const response = await fetchPost(`/recipes/${props.recipe.id}/deletePicture`, {})

    if (response.error) {
      errorToast(
        response.error?.response?.data?.detail?.includes("visiteur")
          ? response.error.response.data.detail
          : "Une erreur est survenue lors de la modification de votre recette"
      );
      return
    }

    setCurrentPictureDeleted(true)
    successToast("Image supprimée")
    dispatch(editRecipeInRecipes(response.data))
  }

  return (
    <div className={isFilled && "modify_recipe"} ref={ref}>
      {!isFilled && <NavBar></NavBar>}
      {!isRestored && !isFilled && recipe.savedForm && <a
        onClick={() => {
          setIsRestored(true);
          fillForm({ ...recipe.savedForm })
        }}
        className="options restore"
      > Restaurer le précedent formulaire</a>}
      <form className="recipe__form" onSubmit={handleSubmit(onSubmit)}>
        {!props.HFFillRecipe && !props.recipe?.fromHellof && <div className="recipe__form__field">
          <h4>Photo :</h4>
          <ImageUpload
            {...register("image")}
            image={image}
            setImage={setImage}
          />
          {props?.recipe?.imageUrl && !currentPictureDeleted &&
            <a onClick={() => deletePicture()} className="options">
              Supprimer l'image actuelle
            </a>
          }
        </div>}
        <div className="recipe__form__group">
          <div className="recipe__form__field">
            <h4>Titre de la recette</h4>
            <InputText
              {...register("title", { required: true })}
              placeholder="Ma super recette"
              className="recipe__form__field-title"
              autoFocus
            />
            {errors.title && <small className="p-error">Le titre est obligatoire</small>}
          </div>
          <div className="recipe__form__field">
            <h4>Pour combien de personnes ?</h4>
            <InputText
              {...register("number", {
                required: true,
                validate: (value: any) => value !== 0 && value !== "0"
              })}
              placeholder="3 personnes"
              className="recipe__form__field-number"
              keyfilter="num"
            />
            {errors.number && <small className="p-error">Le nombre est obligatoire et différent de 0</small>}
          </div>
          <div className="recipe__form__field">
            <h4>Temps de préparation</h4>
            <InputText
              {...register("time", { required: true })}
              placeholder="30 minutes"
              className="recipe__form__field-time"
              type="time"
            />
            {errors.time && <small className="p-error">Le temps est obligatoire</small>}
          </div>
        </div>
        <div className="recipe__form__field">
          <h4>Type de plat</h4>
          <div className="checkboxes">
            {secondaryTables.types && secondaryTables.types.map((type, index) => (
              <div className="checkbox" key={index}>
                <RadioButton
                  checked={type.id === typeId}
                  onChange={() => setTypeId(type.id)}
                />
                <label>{type.label}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="recipe__form__field">
          <h4>Régime alimentaire</h4>
          <div className="checkboxes">
            {secondaryTables.regimes && secondaryTables.regimes.map((regime, index) => (
              <div className="checkbox" key={index}>
                <RadioButton
                  checked={regime.id === regimeId}
                  onChange={() => setRegimeId(regime.id)}
                  tooltip={regimeTooltips[index]}
                  tooltipOptions={{ position: "bottom" }}
                />
                <label>{regime.label}</label>
              </div>
            ))}
          </div>
        </div>
        <Divider></Divider>
        <div className="recipe__form__field">
          <h4>Ingrédients</h4>
          <Controller
            name="ingredients"
            control={control}
            rules={{
              validate: () => checkIngredients(ingredientList),
            }}
            render={() =>
              <>
                <div className="ingredients">
                  <IngredientsCreation
                    ingredient={ingredientList[0]}
                    ingredientList={ingredientList}
                    setIngredientList={setIngredientList}
                    ingredientData={ingredientData.data}
                  ></IngredientsCreation>
                  <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} >
                    <SortableContext items={itemIds} strategy={verticalListSortingStrategy} >
                      {ingredientList.map((x) => x.id !== 1 && x.id && ingredientData.data && (
                        <IngredientsCreation
                          key={x.id}
                          ingredient={x}
                          ingredientList={ingredientList}
                          setIngredientList={setIngredientList}
                          ingredientData={ingredientData.data}
                        ></IngredientsCreation>
                      )
                      )}
                    </SortableContext>
                  </DndContext>
                </div>
                <Bouton
                  type={"normal"}
                  btnAction={(e) => {
                    e.preventDefault();
                    const lastId = getLastId(ingredientList)
                    lastId && setIngredientList([
                      ...ingredientList,
                      {
                        unit: null,
                        label: "",
                        quantity: undefined,
                        id: lastId
                      },
                    ]);
                  }}
                >
                  <AiOutlinePlusCircle />
                  Ajouter un ingrédient
                </Bouton>
              </>
            }
          />
          {errors.ingredients && <small className="p-error">{errors.ingredients.message}</small>}
        </div>
        <Divider></Divider>
        <div className="recipe__form__field">
          <h4>Etapes</h4>
          <Controller
            name="steps"
            control={control}
            rules={{
              validate: () => checkSteps(stepsList),
            }}
            render={() => (
              <StepsCreation
                stepsList={stepsList}
                setStepsList={setStepsList}
              ></StepsCreation>
            )}
          />
          {errors.steps && <small className="p-error">{errors.steps.message}</small>}
        </div>
        <Divider></Divider>
        {isSubmitting ? (
          <Loader></Loader>
        ) : (
          <button className="bouton slide">
            {props.recipe ? "Modifier ma recette" : "Créer ma recette"}
          </button>
        )}
        {Object.keys(errors).length > 0 && <small className="p-error">Il y a une erreur dans le formulaire</small>}
      </form>
      {!isFilled && <Footer></Footer>}
    </div>
  );
};

export default CreateRecipe;
