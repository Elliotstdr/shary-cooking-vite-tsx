import { useState } from "react";
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
    <>
      <SelectButton
        value={value}
        onChange={(e) => e.value && setValue(e.value)}
        optionLabel="name"
        options={items}
        className="mt-16"
      ></SelectButton>
      {value === 1 && <InformationsForm />}
      {value === 2 && <PasswordForm />}
    </>
  );
};

export default Parameters;