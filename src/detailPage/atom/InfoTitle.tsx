import { infoContentProps } from "./InfoImage";

//상세 설명 - 상단에서 가장 크게 보이는 제목 component
const InfoTitle = ({ content }: infoContentProps) => {
  return <div className="text-px32 font-bold">{content}</div>;
};

export default InfoTitle;
