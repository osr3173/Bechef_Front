import { Link } from "react-router-dom";

type MapInfoBtnProps = {
  store_id: number;
  user_id?: number;
  content: string | number;
};

const MapInfoBtn = ({ store_id, user_id, content }: MapInfoBtnProps) => {
  const linkTo = user_id
    ? `/information/${store_id}?userId=${user_id}`
    : `/information/${store_id}`;

  return (
    <Link to={linkTo}>
      <span className="text-skipLB underline">{content}</span>
    </Link>
  );
};

export default MapInfoBtn;