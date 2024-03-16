import { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/white-hat.png";
import BugReport from "../Modal/BugReport/BugReport";

// type FooterProps = {
//   text: string,
//   className?: string
//   btnAction?: () => void
// }

const Footer = () => {
  const navigate = useNavigate();
  const [reportBugModal, setReportBugModal] = useState<boolean>(false);

  // const FooterItem = ({ text, btnAction }: FooterProps) => {
  //   return (
  //     <span
  //       onClick={btnAction}
  //       className="cursor-pointer text-sm mobile:text-base"
  //     >
  //       {text}
  //     </span>
  //   );
  // };

  return (
    <div className="font-dilgante w-full h-32 bg-green text-white flex items-center justify-center relative laptop:h-40 desktop:h-48">
      <img src={image} alt="" className=" invertY absolute top-4 size-12 object-cover left-4 laptop:left-8 desktop:left-16 tablet:size-24 laptop:top-8 desktop:size-32" />
      <div className="h-full flex flex-col justify-around flex-grow-[0.5]">
        <h1 className="text-3xl tablet:text-4xl">Shary Cooking</h1>
        <div className="flex justify-around">
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
            className="hidden cursor-pointer text-sm mobile:text-base tablet:block"
          > Un problème? </span>
          <span className="hidden cursor-pointer text-sm mobile:text-base tablet:block">Mentions légales</span>
        </div>
      </div>
      <img src={image} alt="" className="absolute top-4 size-12 object-cover right-4 laptop:right-8 desktop:right-16 tablet:size-24 laptop:top-8 desktop:size-32" />

      {reportBugModal && (
        <BugReport
          reportBugModal={reportBugModal}
          setReportBugModal={setReportBugModal}
        ></BugReport>
      )}
    </div>
  );
};

export default Footer;
