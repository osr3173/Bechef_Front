import InfoSetStar from "../../atom/InfoSetStar";
import InfoTitle from "../../atom/InfoTitle";
import InfoClickHeart from "./InfoClickHeart";

//가게 이름 컴포넌트 - 이름, 별점
type InfoTitleBoxProps = {
  titleContent: string;
  titleStarNum: number;
  store_id: number;
  member_idx: number | null;
};

const InfoTitleBox = ({
  titleContent,
  titleStarNum,
  store_id,
  member_idx,
}: InfoTitleBoxProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 border-x-0 border-t-0 border-b border-solid ">
      <InfoTitle content={titleContent}></InfoTitle>
      <div className="flex justify-center items-center gap-px10  mb-4">
        <InfoSetStar content={titleStarNum} />
        <InfoClickHeart storeId={store_id} />
      </div>
    </div>
  );
};
export default InfoTitleBox;
