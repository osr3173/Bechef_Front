import { InfoSolidStarIcon } from "./InfoIconsModule";
import { InfoContentProps } from "./InfoProps";

//별점 컴포넌트
const InfoSetStar = ({ content }: InfoContentProps) => {
  return (
    <div className="flex">
      <InfoSolidStarIcon />
      <div className="font-semibold">{content}</div>
    </div>
  );
};

export default InfoSetStar;
