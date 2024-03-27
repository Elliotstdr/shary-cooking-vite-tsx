import { store } from "../Store/store"

export const getTime = (time: string) => {
  const newTime = time.split('PT')[1]

  const splitH = newTime.split('H')

  if(splitH.length === 1 && splitH[0].includes('M')) {
    return `00:${newTime.split('M')[0]}`
  } else if(splitH.length === 2 && !splitH[1]) {
    return `0${splitH[0]}:00`
  } else {
    return `0${splitH[0]}:${splitH[1].split('M')[0]}`
  }
}

export const findRegime = (recipeTags: HFTag[]) => {
  const secondaryTables = store.getState().secondaryTables
  const defaultRegime = { id: 1, label: "Omnivore" }

  if(!secondaryTables.regimes) {
    return defaultRegime
  }

  const regime = recipeTags.some((x) => x.type === "veggie")
    ? secondaryTables.regimes.find((x) => x.label === "Végétarien")
    : secondaryTables.regimes.find((x) => x.label === "Omnivore")

  return regime || defaultRegime
}

export const fillIngredient = (ingredients: HFIngredient[], yields: HFYield[]) => {
  const secondaryTables = store.getState().secondaryTables

  const correctYield = yields.find((x)=>x.yields === 2)?.ingredients

  if(!correctYield) {
    return [
      {
        unit: null,
        quantity: undefined,
        label: "",
        id: 1,
      },
    ]
  }

  const finalYield = adaptYields(correctYield)
  const filledIngredients: FormIngredient[] = []
  ingredients.filter((ing) => ing.name !== "Poivre et sel").forEach((x) => {
    const relatedYield = finalYield.find((y) => y.id === x.id)
    const relatedUnit = secondaryTables.units?.find((z) => z.label === relatedYield?.unit)
    
    filledIngredients.push({
      label: x.name,
      quantity: relatedYield?.amount?.toString() || undefined,
      unit: relatedUnit || null 
    })
  })

  return filledIngredients
}

const adaptYields = (yields: HFYieldsIngredient[]) => {
  return yields.map((yieldItem) => {
    switch (yieldItem.unit) {
      case "pièce(s)":
        yieldItem.unit = "unité";
        break;
      case "botte(s)":
        yieldItem.unit = "botte";
        break;
      case "sachet(s)":
        yieldItem.unit = "unité";
        break;
      case "pot(s)":
        yieldItem.unit = "pot";
        break;
      case "paquet(s)":
        yieldItem.unit = "paquet";
        break;
      case "g":
        yieldItem.unit = "grammes";
        break;
      case "cm":
        yieldItem.unit = "centimètres";
        break;
      case "ml":
        yieldItem.unit = "millilitres";
        break;
      case "pincée(s)":
        yieldItem.unit = "pincée";
        break;
    }
    return yieldItem;
  });
}