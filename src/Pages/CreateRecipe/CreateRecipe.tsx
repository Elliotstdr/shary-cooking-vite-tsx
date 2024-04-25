import { useRef, useState, useEffect } from "react";
import "./CreateRecipe.scss";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { useDispatch, useSelector } from "react-redux";
import ImageUpload from "../../Components/ui/ImageUpload/ImageUpload";
import { fetchPost, fetchPut } from "../../Hooks/api.hook";
import { errorToast, successToast } from "../../Services/functions";
import StepsCreation from "./components/StepsCreation";
import Loader from "../../Components/ui/Loader/loader";
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { editRecipeInRecipes, updateRecipe } from "../../Store/Reducers/recipeReducer";
import { checkIngredients, checkSteps, defaultValues } from "../../Services/createRecipeFunctions";
import Ingredients from "./components/Ingredients";
import Regimes from "./components/Regimes";
import Types from "./components/Types";

type Props = {
  recipe?: Recipe,
  setVisibleModif?: React.Dispatch<React.SetStateAction<boolean>>,
  HFFillRecipe?: HFFillRecipe
}

type Values = {
  title: string,
  time: string,
  image: string | null,
  createdAt: Date,
  id?: number,
  postedByUser?: string,
  type?: number,
  regime?: number,
  number: string,
  ingredients: FormIngredient[],
  steps: Step[],
  fromHellof?: boolean
}

const CreateRecipe = (props: Props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const recipe = useSelector((state: RootState) => state.recipe);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.recipe) fillForm(props.recipe)
    else if (props.HFFillRecipe) fillForm(props.HFFillRecipe)
    else window.scrollTo(0, 0);
  }, []);

  const isFilled = props.recipe || props.HFFillRecipe
  const [isRestored, setIsRestored] = useState(false)
  const ref = useRef(null);

  const {
    control,
    register,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: defaultValues() as Values
  });

  useEffect(() => {
    const watchedValues = watch((values) => {
      if (isFilled || (JSON.stringify(values) === JSON.stringify(defaultValues()))) return

      dispatch(updateRecipe({
        savedForm: {
          ...values,
          type: { id: getValues('type') },
          regime: { id: getValues('regime') }
        },
      }))
    })

    return () => watchedValues.unsubscribe()
  }, [watch()])

  const fillForm = (payload: Recipe | HFFillRecipe) => {
    reset({
      title: payload.title,
      number: payload.number.toString(),
      time: payload.time,
      type: payload.type.id,
      regime: payload.regime.id,
      steps: [...payload.steps].sort((a, b) => a.stepIndex - b.stepIndex).map((step) => {
        return { description: step.description, stepIndex: step.stepIndex };
      }),
      ingredients: payload.ingredients.map((ingredient, index) => {
        return { id: index + 1, ...ingredient, quantity: ingredient.quantity?.toString() };
      })
    })
  }

  const setFields = () => {
    const data = {
      ...getValues(),
      type: `/api/types/${getValues('type')}`,
      regime: `/api/regimes/${getValues('regime')}`,
      number: Number(getValues("number")),
      ingredients: getValues('ingredients').map((ingredient: FormIngredient) => {
        return {
          label: ingredient.label,
          quantity: Number(ingredient.quantity),
          unit: `/api/units/${ingredient?.unit?.id}`
        }
      }),
      createdAt: new Date(),
      postedByUser: `/api/users/${auth.userConnected?.id}`,
      image: getValues('image')
        ? getValues('image')
        : props.HFFillRecipe
          ? props.HFFillRecipe.image
          : null
    };

    if (props.recipe) {
      data.id = props.recipe.id;
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
      errorToast(errorMessage(response.error));
      return;
    }

    if (props.setVisibleModif) {
      successToast("Recette créée !")
      props.setVisibleModif(false)
    } else {
      setIsRestored(false)
      reset(defaultValues());
      successToast("Votre recette a bien été créée");
    }
  };

  const putRecipeFunction = async () => {
    if (!props.recipe || !props.setVisibleModif) return;

    const data = setFields();

    const response = await fetchPut(`/recipes/${props.recipe.id}`, data);
    if (response.error) {
      errorToast(errorMessage(response.error));
      return;
    }
    props.setVisibleModif(false)
    dispatch(editRecipeInRecipes(response.data))
  };

  const deletePicture = async () => {
    if (!props.recipe) return

    const response = await fetchPost(`/recipes/${props.recipe.id}/deletePicture`, {})

    if (response.error) {
      errorToast(errorMessage(response.error));
      return
    }

    successToast("Image supprimée")
    dispatch(editRecipeInRecipes(response.data))
  }

  const errorMessage = (error: any) => {
    return error?.response?.data?.detail?.includes("visiteur")
      ? error.response.data.detail
      : "Une erreur est survenue lors de la modification de votre recette"
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
            image={getValues('image')}
            setImage={(image) => setValue('image', image)}
          />
          {props?.recipe?.imageUrl &&
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
              keyfilter="num"
            />
            {errors.number && <small className="p-error">Le nombre est obligatoire et différent de 0</small>}
          </div>
          <div className="recipe__form__field">
            <h4>Temps de préparation</h4>
            <InputText
              {...register("time", { required: true })}
              placeholder="30 minutes"
              type="time"
            />
            {errors.time && <small className="p-error">Le temps est obligatoire</small>}
          </div>
        </div>
        <Types
          typeId={getValues('type') || 1}
          setTypeId={(newId) => setValue('type', newId)}
        ></Types>
        <Regimes
          regimeId={getValues('regime') || 1}
          setRegimeId={(newId) => setValue('regime', newId)}
        ></Regimes>
        <Divider></Divider>
        <div className="recipe__form__field">
          <h4>Ingrédients</h4>
          <Controller
            name="ingredients"
            control={control}
            rules={{
              validate: () => checkIngredients(getValues('ingredients')),
            }}
            render={() =>
              <Ingredients
                ingredientList={getValues('ingredients')}
                setIngredientList={(ingredients) => setValue('ingredients', ingredients)}
              ></Ingredients>
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
              validate: () => checkSteps(getValues('steps')),
            }}
            render={() => (
              <StepsCreation
                stepsList={getValues('steps')}
                setStepsList={(steps) => setValue('steps', steps)}
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
