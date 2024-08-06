import Logo from "../../../maps/atom/Logo/Logo";
import InfoBackBtn from "../../atom/InfoBackBtn";

const InfoHeader = () => {
  return (
    <div className="bg-skipDB w-full h-14 flex justify-between items-center mb-1.5">
      <div>
        <InfoBackBtn />
      </div>
      <div className="w-40 flex items-center ">
        <Logo url="https://i.ibb.co/98s8n03/Logo.png" />
      </div>
      <div className="w-px50"></div>
    </div>
  );
};

export default InfoHeader;
