import CreateDefaultProduct from "./components/CreateDefaultProduct";
import DefaultProductsList from "./components/DefaultProductsList";

const DefaultProduct = () => {
  return (
    <div className="flex flex-col gap-4 w-full tablet:mt-10 tablet:w-2/3 laptop:w-1/4">
      <CreateDefaultProduct></CreateDefaultProduct>
      <DefaultProductsList></DefaultProductsList>
    </div>
  );
};

export default DefaultProduct;