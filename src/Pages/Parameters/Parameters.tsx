import InformationsForm from "./components/InformationsForm";
import PasswordForm from "./components/PasswordForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"

const Parameters = () => {
  return (
    <Tabs defaultValue="account" className="mt-16" id="params">
      <TabsList>
        <TabsTrigger value="account">Informations personnelles</TabsTrigger>
        <TabsTrigger value="password">Mot de passe</TabsTrigger>
      </TabsList>
      <TabsContent value="account"><InformationsForm /></TabsContent>
      <TabsContent value="password"><PasswordForm /></TabsContent>
    </Tabs>
  );
};

export default Parameters;