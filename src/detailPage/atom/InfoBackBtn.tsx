import { useNavigate } from "react-router-dom";
import { InfoBackArrowIcon } from "./InfoIconsModule";

//뒤로가기 버튼
const InfoBackBtn = () => {
  const back = useNavigate();
  const backBtn = () => {
    back("/");
  };
  return (
    <div
      className="flex text-center p-2.5 hover:cursor-pointer"
      onClick={backBtn}
    >
      <InfoBackArrowIcon />
    </div>
  );
};

export default InfoBackBtn;
