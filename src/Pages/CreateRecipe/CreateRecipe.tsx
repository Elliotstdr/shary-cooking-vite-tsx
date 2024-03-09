import { useRef, useState, useMemo, useEffect } from "react";
import "./CreateRecipe.scss";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { useDispatch, useSelector } from "react-redux";
import ImageUpload from "../../Components/FormElements/ImageUpload/ImageUpload";
import { fetchPost, fetchPut, useFetchGet } from "../../Hooks/api.hook";
import { errorToast, successToast } from "../../Services/functions";
import IngredientsCreation from "../../Components/FormElements/IngredientsCreation/IngredientsCreation";
import StepsCreation from "../../Components/FormElements/StepsCreation/StepsCreation";
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
import { updateRecipe } from "../../Store/Reducers/recipeReducer";

interface Props {
  recipe?: Recipe,
  editRecipe?: (item: Recipe) => void,
  setVisibleModif?: React.Dispatch<React.SetStateAction<boolean>>
}

interface Body {
  title: string,
  time: string,
  image: string | null,
  createdAt: Date,
  id?: number,
  type?: string,
  regime?: string,
  postedByUser?: string,
  steps?: Array<Step>,
  ingredients?: Array<PayloadIngredient>
}
interface Values extends Body {
  number: string,
}
interface Payload extends Body {
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

  useEffect(() => {
    if (props.recipe) fillForm(props.recipe)
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);
  const [currentPictureDeleted, setCurrentPictureDeleted] = useState(false)
  const [isRestored, setIsRestored] = useState(false)
  const [hasReseted, setHasReseted] = useState(false)
  const ingredientData = useFetchGet<IngredientData[]>("/ingredient_datas");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [autocompleteData, setAutocompleteData] = useState<Array<IngredientData>>([]);
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
  const regimeTooltips = [
    "Contient tout type de nourriture",
    "Régime sans viande ni poisson mais avec des produits d'origine animale",
    "Régime végétarien à l'exception des produits de la mer",
    "Régime sans viande, poisson ou produits d'origine animale",
  ];

  const {
    control,
    register,
    getValues,
    reset,
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
    return () => {
      if (hasReseted || props.recipe || (!image && typeId === 1 && regimeId === 1 &&
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
    }
    // eslint-disable-next-line
  }, [typeId, regimeId, ingredientList, stepsList, image])

  const fillForm = (payload: Recipe) => {
    setTypeId(payload.type.id);
    setRegimeId(payload.regime.id);
    setStepsList(payload.steps.sort((a, b) => a.stepIndex - b.stepIndex).map((step) => {
      return { description: step.description, stepIndex: step.stepIndex };
    })
    );
    setIngredientList(payload.ingredients.map((ingredient, index) => {
      return { id: index + 1, ...ingredient, quantity: ingredient.quantity?.toString() };
    }))

    reset({
      title: payload.title,
      number: payload.number.toString(),
      time: payload.time,
    })
  }

  const checkSteps = () => {
    let response = undefined;
    stepsList.forEach((step) => {
      if (step.description === "") {
        response = `L'étape ${step.stepIndex} est vide, veuillez la supprimer`;
      }
    });
    return response;
  };

  const checkIngredients = () => {
    let response = undefined;
    ingredientList.forEach((ing) => {
      if (
        ing.label === "" ||
        ing.quantity === "0" ||
        !ing.unit
      ) {
        response = "Un ou plusieurs ingrédient n'est pas correctement rempli";
      }
    });
    return response;
  };

  const resetForm = () => {
    reset();
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
        quantity: undefined,
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
    } else {
      data.image = null;
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
      errorToast("Une erreur est survenue lors de la création de votre recette");
      return;
    }
    setHasReseted(true)
    setIsRestored(false)
    resetForm();
  };

  const putRecipeFunction = async () => {
    if (!props.recipe || !props.editRecipe || !props.setVisibleModif) return;

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
    props.editRecipe(response.data)
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

  const getLastId = (ingredientArray: FormIngredient[]) => {
    if (!ingredientArray) return null;
    let sortedList = [...ingredientArray]
    sortedList = sortedList.sort((a, b) => {
      if (a.id === undefined && b.id === undefined) { return 0 }
      if (a.id === undefined) { return 1 }
      if (b.id === undefined) { return -1 }
      return b.id - a.id;
    })
    return sortedList[0].id ? sortedList[0].id + 1 : null
  }

  const deletePicture = async () => {
    if (!props.recipe || !props.editRecipe) return

    const response = await fetchPost(`/recipes/${props.recipe.id}/deletePicture`, {})

    if (response.error) errorToast("Une erreur est survenue")

    setCurrentPictureDeleted(true)
    successToast("Image supprimée")
    props.editRecipe(response.data)
  }

  return (
    <div
      className={props.recipe && "modify_recipe"}
      onClick={() => {
        setAutocompleteData([]);
        setActiveIndex(-1);
      }}
      ref={ref}
    >
      {!props.recipe && <NavBar></NavBar>}
      {!isRestored && !props.recipe && <a
        onClick={() => {
          if (recipe.savedForm) {
            setIsRestored(true);
            fillForm(recipe.savedForm)
          }
        }}
        className="options restore"
      > Restaurer le précedent formulaire</a>}
      <form className="recipe__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="recipe__form__field">
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
        </div>
        <div className="recipe__form__group">
          <div className="recipe__form__field">
            <h4>Titre de la recette</h4>
            <InputText
              {...register("title", { required: true })}
              placeholder="Ma super recette"
              className="recipe__form__field-title"
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
              validate: () => checkIngredients(),
            }}
            render={() =>
              <>
                {ingredientData.data ?
                  <>
                    <div className="ingredients">
                      <IngredientsCreation
                        key={ingredientList[0].id}
                        id={ingredientList[0].id ?? 1}
                        ingredient={ingredientList[0]}
                        ingredientList={ingredientList}
                        setIngredientList={setIngredientList}
                        ingredientData={ingredientData.data}
                        autocompleteData={autocompleteData}
                        setAutocompleteData={setAutocompleteData}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                      ></IngredientsCreation>
                      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} >
                        <SortableContext items={itemIds} strategy={verticalListSortingStrategy} >
                          {ingredientList.map((x) => x.id !== 1 && x.id && ingredientData.data && (
                            <IngredientsCreation
                              key={x.id}
                              id={x.id}
                              ingredient={x}
                              ingredientList={ingredientList}
                              setIngredientList={setIngredientList}
                              ingredientData={ingredientData.data}
                              autocompleteData={autocompleteData}
                              setAutocompleteData={setAutocompleteData}
                              activeIndex={activeIndex}
                              setActiveIndex={setActiveIndex}
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
                  : <Loader></Loader>}
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
              validate: () => checkSteps(),
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
      </form>
      {!props.recipe && <Footer></Footer>}
    </div>
  );
};

export default CreateRecipe;
