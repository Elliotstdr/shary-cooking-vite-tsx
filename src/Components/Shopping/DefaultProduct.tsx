import CreateDefaultProduct from "./DefaultProduct/CreateDefaultProduct";
import DefaultProductsList from "./DefaultProduct/DefaultProductsList";

const DefaultProduct = () => {
  return (
    <div className="flex flex-col gap-4 w-full tablet:mt-10 tablet:w-2/3 laptop:w-1/4">
      <div className="text-left font-bold text-lg mt-1 hidden laptop:block">Produits communs</div>
      <CreateDefaultProduct></CreateDefaultProduct>
      <DefaultProductsList></DefaultProductsList>
    </div>
  );
};

export default DefaultProduct;