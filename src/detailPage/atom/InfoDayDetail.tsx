import { InfoDayDetailProps } from "./InfoProps";

const InfoDayDetail = ({
  dayInfo,
  dayOpenTime,
  dayCloseTime,
  isClosed,
}: InfoDayDetailProps) => {
  return (
    <div className="flex max-w-768 w-full my-0 mx-auto gap-px10 text-sm font-normal ">
      <div className="font-bold">{dayInfo}</div>
      {isClosed ? (
        <span>휴무</span>
      ) : (
        <div>
          {dayOpenTime}-{dayCloseTime}
        </div>
      )}
    </div>
  );
};
export default InfoDayDetail;
