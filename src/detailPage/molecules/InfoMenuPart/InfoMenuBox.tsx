import InfoSubTitle from "../../atom/InfoSubTitle";
import InfoMenuList, { InfoMenuListProps } from "./InfoMenuList";

const InfoMenuBox = ({ store_id }: InfoMenuListProps) => {
  return (
    <div className="drop-shadow-lg mt-4 max-w-768 w-full my-4 mx-auto gap-px20 rounded-lg">
      <InfoSubTitle content={"메뉴"} />
      <InfoMenuList store_id={store_id} />
    </div>
  );
};

export default InfoMenuBox;
