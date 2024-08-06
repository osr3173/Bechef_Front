//상세 페이지 - 간단 버튼 구성 (수정, 삭제)
import { InfoBtnProps } from "./InfoProps";

const InfoEditBtn = ({ content, clickEvent }: InfoBtnProps) => {
  return (
    <div
      className="text-skipLB text-base hover:cursor-pointer w-px31"
      onClick={clickEvent}
    >
      {content}
    </div>
  );
};

export default InfoEditBtn;
