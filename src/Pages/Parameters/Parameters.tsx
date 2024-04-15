import { useState } from "react";
import "./Parameters.scss"
import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";
import { SelectButton } from "primereact/selectbutton";
import InformationsForm from "./components/InformationsForm";
import PasswordForm from "./components/PasswordForm";

const Parameters = () => {
  const items = [
    { name: 'Informations personnelles', value: 1 },
    { name: 'Mot de passe', value: 2 },
  ];

  const [value, setValue] = useState<1 | 2>(1)

  return (
    <div className="parameters">
      <NavBar></NavBar>
      <SelectButton
        value={value}
        onChange={(e) => e.value && setValue(e.value)}
        optionLabel="name"
        options={items}
      ></SelectButton>
      {value === 1 && <InformationsForm />}
      {value === 2 && <PasswordForm />}
      <Footer></Footer>
    </div>
  );
};

export default Parameters;