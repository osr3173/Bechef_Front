import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoStarIcon from "./InfoStarIcon";

//별점 컴포넌트
type InfoSetStarProps = {
  starNum: number;
};

const InfoSetStar = ({ starNum }: InfoSetStarProps) => {
  return (
    <div className="flex">
      <InfoStarIcon />
      <div className="font-semibold">{starNum}</div>
    </div>
  );
};

export default InfoSetStar;
