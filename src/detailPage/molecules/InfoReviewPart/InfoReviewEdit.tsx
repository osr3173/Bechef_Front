import { ChangeEvent, useEffect, useState } from "react";
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
  //0801 글자수 제한 및 글자 수 표현 추가
  const [inputCount, setInputCount] = useState(currentComment.length); //글자수 count
  const maxCommentLength = 200;

  const handleUpdateComment = () => {
    if (editReview.trim()) {
      onEditSubmit(review_id, editReview, editRating);
    }
  };

  //0801 추가
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditReview(e.target.value);
    setInputCount(e.target.value.length);
  };

  // currentComment가 변경되었을 때 inputCount를 업데이트하는 useEffect 추가
  useEffect(() => {
    setInputCount(currentComment.length);
  }, [currentComment]);

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
        onChange={handleInputChange} //0801 추가
        className="border p-2 resize-none"
        maxLength={maxCommentLength}
      />
      <div className="text-right text-sm">
        {inputCount}/{maxCommentLength}
      </div>
      <div className="flex gap-2">
        <button className="w-px31" onClick={handleUpdateComment}>
          저장
        </button>
        <button className="w-px31" onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  );
};

export default InfoReviewEdit;
