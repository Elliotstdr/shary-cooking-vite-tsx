import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "../Pages/Accueil/Accueil";
import ShoppingList from "../Pages/ShoppingList/ShoppingList";
import Parameters from "../Pages/Parameters/Parameters";
import CreateRecipe from "../Pages/CreateRecipe/CreateRecipe";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import Recipes from "../Pages/Recipes/Recipes";
import { useAxiosInterceptors } from "../Hooks/useAxiosInterceptor.hook";
import { updateAuth } from "../Store/Reducers/authReducer";
import Favorites from "../Pages/Favorites/Favorites";
import MyRecipes from "../Pages/MyRecipes/MyRecipes";

const App = () => {
  const isInterceptorActive = useAxiosInterceptors();
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const toast = useRef(null);

  useEffect(() => {
    if (!auth.isConnected && window.location.pathname !== "/") window.location.replace("/")
  }, [auth.isConnected])

  useEffect(() => {
    dispatch(updateAuth({
      toast: toast.current,
    }));
    // eslint-disable-next-line
  }, [toast.current]);

  return (
    <div className="App" id="app">
      {isInterceptorActive &&
        <BrowserRouter>
          <Toast ref={toast}></Toast>
          <Routes>
            <Route path="/" element={<Accueil />}></Route>
            {auth.isConnected && (
              <>
                <Route path="/all" element={<Recipes />}></Route>
                <Route path="/fav" element={<Favorites />}></Route>
                <Route path="/myrecipes" element={<MyRecipes />}></Route>
                <Route path="/shop" element={<ShoppingList />}></Route>
                <Route path="/param" element={<Parameters />}></Route>
                <Route path="/create" element={<CreateRecipe />}></Route>
              </>
            )}
          </Routes>
        </BrowserRouter>
      }
    </div>
  );
};

export default App;
