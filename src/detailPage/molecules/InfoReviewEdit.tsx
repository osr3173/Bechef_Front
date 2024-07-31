import { useState } from "react";
import InfoEditBtn from "../atom/InfoEditBtn";
import InfoReviewStarComponent from "./InfoReviewStarComponent";

type InfoReviewEditProps = {
  review_id: number;
  currentComment: string;
  currentRating: number;
  onEditSubmit: (
    review_id: number,
    reviewContent: string,
    reveiw_rating: number
  ) => void;
  onCancel: () => void;
};
//상세 페이지 - 리뷰 수정 컴포넌트
const InfoReviewEdit = ({
  review_id,
  currentComment,
  currentRating,
  onEditSubmit,
  onCancel,
}: InfoReviewEditProps) => {
  const [editReview, setEditReview] = useState(currentComment); //현재 댓글 상황
  const [editRating, setEditRating] = useState(currentRating); //현재 별점 상황

  const handleUpdateComment = () => {
    if (editReview.trim()) {
      onEditSubmit(review_id, editReview, editRating);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <InfoReviewStarComponent
        totalStars={5}
        setReviewRating={setEditRating} // 별점 수정 시 상태 업데이트
        initialRating={editRating} // 초기 별점 설정
        reset={false}
      />
      <textarea
        value={editReview}
        onChange={(e) => setEditReview(e.target.value)}
        className="border p-2"
      />
      <div className="flex gap-2">
        <button onClick={handleUpdateComment}>저장</button>
        <button onClick={onCancel}>취소</button>
      </div>
    </div>
  );
};

export default InfoReviewEdit;
