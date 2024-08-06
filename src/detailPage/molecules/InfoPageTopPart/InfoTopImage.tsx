import InfoImage from "../../atom/InfoImage";

//상단 이미지 컴포넌트
type InfoTopImageProps = {
  imgUrl: string;
};

const InfoTopImage = ({ imgUrl }: InfoTopImageProps) => {
  return (
    <div className="flex w-full h-64 mb-4">
      <InfoImage content={imgUrl} />
    </div>
  );
};
export default InfoTopImage;
