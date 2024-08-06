import { useEffect, useState } from "react";
import { InfoReviewInputProps } from "./InfoProps";

//상세 페이지 - 리뷰 작성
const InfoReviewInput: React.FC<InfoReviewInputProps> = ({
  setComment,
  reset,
}) => {
  const [inputValue, setInputValue] = useState("");
  const maxCommentLength = 200;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    setComment(event.target.value);
  };

  // reset이 변경될 때 inputValue를 초기화합니다.
  useEffect(() => {
    if (reset) {
      setInputValue("");
    }
  }, [reset]);

  return (
    <div className="w-full">
      <textarea
        value={inputValue} // controlled component로 변경
        onChange={handleChange}
        className="border rounded-lg p-2 w-full resize-none h-px100"
        placeholder="리뷰를 작성하세요"
        maxLength={maxCommentLength}
      />
      <div className="text-right text-sm">
        {inputValue.length}/{maxCommentLength}
      </div>
    </div>
  );
};

export default InfoReviewInput;
