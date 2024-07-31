import { useEffect, useState } from "react";

//상세 페이지 - 리뷰 작성
type InfoReviewInputProps = {
  setComment: React.Dispatch<React.SetStateAction<string>>;
  reset?: boolean;
};

const InfoReviewInput: React.FC<InfoReviewInputProps> = ({
  setComment,
  reset,
}) => {
  const [inputValue, setInputValue] = useState("");

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
    <textarea
      value={inputValue} // controlled component로 변경
      onChange={handleChange}
      className="border rounded-lg p-2 w-full"
      placeholder="리뷰를 작성하세요"
    />
  );
};

export default InfoReviewInput;
