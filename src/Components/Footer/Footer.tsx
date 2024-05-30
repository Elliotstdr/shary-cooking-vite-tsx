import { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "src/assets/white-hat.png";
import ModalBugReport from "../Modal/ModalBugReport";

const Footer = () => {
  const navigate = useNavigate();
  const [reportBugModal, setReportBugModal] = useState(false);

  return (
    <div id="footer" className="font-dilgante w-full py-4 bg-green text-white flex items-center justify-around relative laptop:p-8">
      <img src={image} alt="" className=" invertY size-24 object-cover tablet:size-32" />
      <div className="flex flex-col gap-8 justify-around flex-grow-[0.5] laptop:gap-12">
        <h1 className="text-3xl tablet:text-4xl !leading-12">Shary Cooking</h1>
        <div className="flex flex-col gap-4 justify-around laptop:flex-row">
          <span
            onClick={() => navigate("/")}
            className="cursor-pointer text-sm mobile:text-base"
          > Accueil </span>
          <span
            onClick={() => navigate("/create")}
            className="cursor-pointer text-sm mobile:text-base"
          > Créer une recette </span>
          <span
            onClick={() => navigate("/param")}
            className="cursor-pointer text-sm mobile:text-base"
          > Profil </span>
          <span
            onClick={() => setReportBugModal(true)}
            className="cursor-pointer text-sm mobile:text-base"
          > Un problème? </span>
          <span className="cursor-pointer text-sm mobile:text-base">Mentions légales</span>
        </div>
      </div>
      <img src={image} alt="" className="size-24 object-cover tablet:size-32" />

      {reportBugModal && (
        <ModalBugReport
          reportBugModal={reportBugModal}
          setReportBugModal={setReportBugModal}
        ></ModalBugReport>
      )}
    </div>
  );
};

export default Footer;
