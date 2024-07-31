import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

//뒤로가기 버튼
const InfoBackBtn = () => {
  const back = useNavigate();
  const backBtn = () => {
    back("/");
  };
  return (
    <div
      className="text-lg text-white flex text-center p-2.5 hover:cursor-pointer"
      onClick={backBtn}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
    </div>
  );
};

export default InfoBackBtn;
