//2024.07.02 기준 작성한 props들의 형태가 같아서 contentprops만 제작 후 export
export type infoContentProps = {
  content: string | number;
};

//상세 설명 이미지 도출 component
const InfoImage = ({ content }: infoContentProps) => {
  return (
    <div className="w-full">
      <img className="size-full object-cover" src={`${content}`}></img>
    </div>
  );
};
export default InfoImage;
