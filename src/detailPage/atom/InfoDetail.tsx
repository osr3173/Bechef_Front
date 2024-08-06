import { InfoDetailProps } from "./InfoProps";
import InfoIcon from "./InfoIcon";

//상세 설명 - 위치, 번호, 설명 등을 위한 component
const InfoDetail = ({ content, detailIcon }: InfoDetailProps) => {
  return (
    <div className="flex gap-2">
      <InfoIcon icon={detailIcon} className="pl-2" />
      <div className="text-sm font-thin">{content}</div>
    </div>
  );
};
export default InfoDetail;
