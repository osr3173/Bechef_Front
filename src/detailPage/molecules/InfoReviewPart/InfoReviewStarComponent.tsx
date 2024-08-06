import { useEffect, useState } from "react";
import {
  InfoEmptyStarIcon,
  InfoSolidStarIcon,
} from "../../atom/InfoIconsModule";

type InfoReviewStarComponentProps = {
  totalStars: number;
  setReviewRating: React.Dispatch<React.SetStateAction<number>>;
  initialRating?: number;
  reset: boolean;
};

const InfoReviewStarComponent: React.FC<InfoReviewStarComponentProps> = ({
  totalStars,
  setReviewRating,
  initialRating = 0,
  reset,
}) => {
  const [hover, setHover] = useState<number | null>(null);
  const [rating, setRating] = useState<number>(initialRating); // 별점 상태 추가

  useEffect(() => {
    if (reset) {
      setRating(0);
      setReviewRating(0);
    } else {
      setRating(initialRating); // 초기 별점으로 설정
    }
  }, [reset, initialRating, setReviewRating]);

  const handleMouseOver = (starIdx: number) => {
    setHover(starIdx);
  };

  const handleMouseLeave = () => {
    setHover(null);
  };

  const handleClick = (starIdx: number) => {
    const ratingValue = starIdx + 1; // 별점은 1부터 시작하므로 starIdx에 1을 더합니다.
    setRating(ratingValue);
    setReviewRating(ratingValue); // 선택된 별점을 상위 컴포넌트로 전달합니다.
  };

  return (
    <div className="flex gap-1">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            onMouseOver={() => handleMouseOver(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
            style={{ cursor: "pointer" }}
          >
            {starValue <= (hover !== null ? hover + 1 : rating) ? (
              <InfoSolidStarIcon />
            ) : (
              <InfoEmptyStarIcon />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default InfoReviewStarComponent;
