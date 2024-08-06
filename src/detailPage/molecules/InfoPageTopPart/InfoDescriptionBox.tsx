import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import InfoDetail from "../../atom/InfoDetail";

//상단 가게 정보 - 위치, 전화번호
type InfoDescriptionBoxProps = {
  store_address: string;
  store_phone: string;
};

const InfoDescriptionBox = ({
  store_address,
  store_phone,
}: InfoDescriptionBoxProps) => {
  return (
    <div className="flex flex-col gap-1 h-28 justify-center">
      <InfoDetail detailIcon={faLocationDot} content={store_address} />
      <InfoDetail detailIcon={faPhone} content={store_phone} />
    </div>
  );
};
export default InfoDescriptionBox;
