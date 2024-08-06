import { InfoContentProps } from "./InfoProps";

//상세 설명 이미지 도출 component
const InfoImage = ({ content }: InfoContentProps) => {
  return (
    <div className="w-full">
      <img className="size-full object-cover" src={`${content}`}></img>
    </div>
  );
};
export default InfoImage;
