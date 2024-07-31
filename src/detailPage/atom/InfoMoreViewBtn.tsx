type InfoMoreViewBtnProps = {
  content: string;
  clickEvent: () => void;
};

const InfoMoreViewBtn = ({ content, clickEvent }: InfoMoreViewBtnProps) => {
  return (
    <div
      className="text-center bg-skipDB text-white font-semibold w-px150 p-3 h-px50 hover:cursor-pointer"
      onClick={clickEvent}
    >
      {content}
    </div>
  );
};
export default InfoMoreViewBtn;
