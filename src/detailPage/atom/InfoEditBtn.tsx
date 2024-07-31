import { infoContentProps } from "./InfoImage";

//상세 페이지 - 간단 버튼 구성 (수정, 삭제)
export type InfoEditBtnProps = {
  content: string;
  clickEvent: () => void;
};

const InfoEditBtn = ({ content, clickEvent }: InfoEditBtnProps) => {
  return (
    <div
      className="text-skipLB text-base hover:cursor-pointer"
      onClick={clickEvent}
    >
      {content}
    </div>
  );
};

export default InfoEditBtn;
