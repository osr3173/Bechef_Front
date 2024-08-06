import InfoSubTitle from "../../atom/InfoSubTitle";
import InfoDescriptionBox from "./InfoDescriptionBox";
import InfoTitleBox from "./InfoTitleBox";
import InfoTopImage from "./InfoTopImage";

export type InfoPageComponentProps = {
  store_name: string;
  store_rating: number;
  store_image_url: string;
  store_address: string;
  store_phone: string;
  store_id: number;
  member_idx: number | null;
};

const InfoPageComponent = ({
  store_name,
  store_rating,
  store_image_url,
  store_address,
  store_phone,
  store_id,
  member_idx,
}: InfoPageComponentProps) => {
  console.log("InfoPageComponent에서 렌더됨:", {
    store_name,
    store_rating,
    store_image_url,
    store_address,
    store_phone,
    store_id,
    member_idx,
  });

  return (
    <div className="max-w-800 w-full my-0 mx-auto">
      <InfoTopImage imgUrl={store_image_url} />
      <div className="max-w-786 w-full my-0 mx-auto rounded-lg">
        <InfoTitleBox
          titleContent={store_name}
          titleStarNum={store_rating}
          store_id={store_id}
          member_idx={member_idx}
        />
        <InfoDescriptionBox
          store_address={store_address}
          store_phone={store_phone}
        />
      </div>
    </div>
  );
};
export default InfoPageComponent;
