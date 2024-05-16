import { useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import InformationsForm from "./components/InformationsForm";
import PasswordForm from "./components/PasswordForm";

const Parameters = () => {
  const items = [
    { label: 'Informations' },
    { label: 'Mot de passe' },
  ];

  const [value, setValue] = useState(0)

  return (
    <div id="params">
      <TabMenu
        activeIndex={value}
        onTabChange={(e) => setValue(e.index)}
        model={items}
        className="mt-8 w-fit mx-auto"
      ></TabMenu>
      {value === 0 && <InformationsForm />}
      {value === 1 && <PasswordForm />}
    </div>
  );
};

export default Parameters;