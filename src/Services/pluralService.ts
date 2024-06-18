export const getIngredientFullName = (
  ingredient: Ingredient,
  ratio: number = 1
) => {
  const ratioIngredientQuantity = ingredient.quantity * ratio;

  let quantity = "";
  if (ingredient.unit.label !== "un peu")
    quantity += parseFloat(ratioIngredientQuantity.toFixed(1)) + " ";
  if (ingredient.unit.label !== "unité")
    quantity += ingredient.unit.label + " de ";

  const splittedName = ingredient.label.split(" ");
  const firstElement = splittedName[0];
  const endElement = splittedName.slice(1).join(" ");

  const name =
    ratioIngredientQuantity > 1 && ingredient.unit.label === "unité"
      ? ingredient.label.split(" ").length > 1
        ? plural(firstElement) + " " + endElement
        : plural(ingredient.label)
      : ingredient.label;

  return {
    quantity: quantity,
    name: name.toLowerCase(),
  };
};

const plural = (label: string) => {
  if (
    label.slice(-1) === "s" ||
    label.slice(-1) === "z" ||
    label.slice(-1) === "x"
  ) {
    return label;
  }

  if (label.slice(-2) === "al") {
    if (ALexceptions.includes(label)) return label + "s";
    else return label.slice(0, -2) + "aux";
  }

  if (label.slice(-2) === "ou") {
    if (OUexceptions.includes(label)) return label + "x";
    else return label + "s";
  }

  if (label.slice(-3) === "ail") {
    if (AILexception.includes(label)) return label.slice(0, -3) + "aux";
    else return label + "s";
  }

  if (
    label.slice(-2) === "au" ||
    label.slice(-2) === "eu" ||
    label.slice(-2) === "œu"
  ) {
    if (EUexceptions.includes(label)) return label + "s";
    else return label + "x";
  }

  return label + "s";
};

const ALexceptions = ["cantal", "emmental", "chacal"];

const OUexceptions = ["chou", "hibou"];

const AILexception = ["corail"];

const EUexceptions = ["bleu", "lieu"];
