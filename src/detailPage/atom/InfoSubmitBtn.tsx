import { InfoEditBtnProps } from "./InfoEditBtn";

//상세 페이지 - 등록 버튼 구성
type InfoSubmitBtnProps = {
  clickEvent: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  content: string;
};

const InfoSubmitBtn: React.FC<InfoSubmitBtnProps> = ({
  clickEvent,
  content,
}) => {
  return (
    <div
      onClick={clickEvent}
      className="p-1.5 w-px75 h-px70 border border-solid border-skipLB rounded-lg text-center flex justify-center items-center text-skipLB"
    >
      {content}
    </div>
  );
};

export default InfoSubmitBtn;
