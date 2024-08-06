import InfoMenuText from "../../atom/InfoMenuText";
import InfoSetStar from "../../atom/InfoSetStar";

//상세페이지 - 리뷰출력 컴포컨트 구성
export type InfoReviewComponentProps = {
  userName: string;
  comment: string;
  reviewRating: number;
  reviewDate: string;
  memberIdx?: number;
  reviewId: number;
};
const InfoReviewComponent = ({
  userName,
  comment,
  reviewRating,
  reviewDate,
  reviewId,
}: InfoReviewComponentProps) => {
  return (
    <div className="flex flex-col gap-1" key={reviewId}>
      <div className="text-bold">{userName}</div>
      <div className="flex gap-1">
        <InfoSetStar content={reviewRating} />
        <span>{reviewDate}</span>
      </div>
      <InfoMenuText content={comment} />
    </div>
  );
};

export default InfoReviewComponent;
