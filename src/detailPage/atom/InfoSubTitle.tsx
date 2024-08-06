import { InfoContentProps } from "./InfoProps";

//모든 중간 크기의 부제목
const InfoSubTitle = ({ content }: InfoContentProps) => {
  return <div className="text-3xl font-semibold mb-px20">{content}</div>;
};
export default InfoSubTitle;
