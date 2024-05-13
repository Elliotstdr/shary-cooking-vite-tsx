import { useRef, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import ImageUpload from "../ui/ImageUpload";
import { fetchPost, fetchPut } from "../../Hooks/api.hook";
import { errorToast, successToast } from "../../Services/functions";
import StepsCreation from "./components/StepsCreation";
import Loader from "../ui/loader";
import { editRecipeInRecipes, updateRecipe } from "../../Store/Reducers/recipeReducer";
import { checkIngredients, checkSteps, defaultValues } from "../../Services/createRecipeFunctions";
import IngredientsCreation from "./components/IngredientsCreation";
import Regimes from "./components/Regimes";
import Types from "./components/Types";
import Bouton from "../ui/Bouton";
import { Separator } from "../ui/Separator";

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

const RecipeCreationContainer = (props: Props) => {
  const [file, setFile] = useState<any>(null);
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

      delete values.image
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
    const data: any = {
      title: getValues('title'),
      time: getValues('time'),
      number: Number(getValues("number")),
      typeId: getValues('type'),
      regimeId: getValues('regime'),
      steps: getValues('steps'),
      ingredients: getValues('ingredients').map((ingredient: FormIngredient) => {
        return {
          label: ingredient.label,
          quantity: Number(ingredient.quantity),
          unitId: ingredient?.unit?.id
        }
      }),
    };

    if (props.recipe) data.id = props.recipe.id;
    if (!props.recipe) data.fromHellof = !!props.HFFillRecipe
    if (props.HFFillRecipe) data.imageUrl = props.HFFillRecipe.image

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
    setFile(null)
  };

  const createRecipeFunction = async () => {
    const data = setFields();

    const response = await fetchPost(`/recipes`, data);
    if (response.error) {
      errorToast(errorMessage(response.error));
      return;
    }

    if (getValues('image')) {
      await addPicture(response.data.id)
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

    if (getValues('image')) {
      const imageUrl = await addPicture(props.recipe.id)
      response.data.imageUrl = imageUrl
    }

    props.setVisibleModif(false)
    dispatch(editRecipeInRecipes(response.data))
  };

  const addPicture = async (recipeId: number) => {
    const formData = new FormData()
    formData.append('file', getValues('image') as any);

    const response = await fetchPost(`/recipes/${recipeId}/addPicture`, formData);
    if (response.error) return null;

    return response.data
  }

  const deletePicture = async () => {
    if (!props.recipe) return

    const response = await fetchPost(`/recipes/${props.recipe.id}/deletePicture`, {})

    if (response.error) {
      errorToast(errorMessage(response.error));
      return
    }

    successToast("Image supprimée")
    dispatch(editRecipeInRecipes({ ...props.recipe, imageUrl: "" }))
  }

  const errorMessage = (error: any) => {
    return error?.response?.data?.detail?.includes("visiteur")
      ? error.response.data.detail
      : "Une erreur est survenue lors de la modification de votre recette"
  }

  return (
    <form
      className={`flex flex-col gap-4 my-12 relative ${isFilled && "mt-0"}`}
      onSubmit={handleSubmit(onSubmit)}
      ref={ref}
      id="create"
    >
      {!isRestored && !isFilled && recipe.savedForm && <a
        onClick={(e) => {
          e.preventDefault()
          setIsRestored(true);
          fillForm({ ...recipe.savedForm })
        }}
        className="underline py-8 px-4 cursor-pointer absolute left-0 -top-12 tablet:-top-8"
      > Restaurer le précedent formulaire</a>}
      {!props.HFFillRecipe && !props.recipe?.fromHellof &&
        <div className="flex items-center flex-col">
          <h4 className="mb-2 mt-5 font-bold">Photo :</h4>
          <ImageUpload
            {...register("image")}
            file={file}
            setFile={setFile}
            setImage={(image) => setValue('image', image)}
            id='recipeUpld'
          />
          {props?.recipe?.imageUrl &&
            <a onClick={() => deletePicture()} className="underline py-8 px-4 cursor-pointer">
              Supprimer l'image actuelle
            </a>
          }
        </div>}
      <div className="flex flex-col justify-center laptop:flex-row">
        <div className="flex items-center flex-col laptop:mr-8">
          <h4 className="mb-2 mt-5 font-bold">Titre de la recette</h4>
          <InputText
            {...register("title", { required: true })}
            placeholder="Ma super recette"
            autoFocus
          />
          {errors.title && <small className="p-error">Le titre est obligatoire</small>}
        </div>
        <div className="flex items-center flex-col laptop:mr-8">
          <h4 className="mb-2 mt-5 font-bold">Pour combien de personnes ?</h4>
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
        <div className="flex items-center flex-col laptop:mr-8">
          <h4 className="mb-2 mt-5 font-bold">Temps de préparation</h4>
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
      <Separator></Separator>
      <div className="flex items-center flex-col">
        <h4 className="my-2 font-bold">Ingrédients</h4>
        <Controller
          name="ingredients"
          control={control}
          rules={{
            validate: () => checkIngredients(getValues('ingredients')),
          }}
          render={() =>
            <IngredientsCreation
              ingredientList={getValues('ingredients')}
              setIngredientList={(ingredients) => setValue('ingredients', ingredients)}
            ></IngredientsCreation>
          }
        />
        {errors.ingredients && <small className="p-error">{errors.ingredients.message}</small>}
      </div>
      <Separator></Separator>
      <div className="flex items-center flex-col">
        <h4 className="my-2 font-bold">Etapes</h4>
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
      <Separator></Separator>
      {isSubmitting ? (
        <Loader></Loader>
      ) : (
        <Bouton className="self-center my-4">
          {props.recipe ? "Modifier ma recette" : "Créer ma recette"}
        </Bouton>
      )}
      {Object.keys(errors).length > 0 && <small className="p-error">Il y a une erreur dans le formulaire</small>}
    </form>
  );
};

export default RecipeCreationContainer;
