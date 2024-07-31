import React from "react";
import InfoClickHeart from "../../../detailPage/molecules/InfoClickHeart";
import MapInfoBtn from "../Button/MapInfoBtn";
import InfoStar from "../../../detailPage/atom/InfoSetStar";

export type Store = {
  store_id: number;
  store_name: string;
  store_address: string;
  store_latitude: number;
  store_longitude: number;
  store_rating: number;
  reviewCount: number;
  img: string;
};

type SearchResultsProps = {
  results: Store[];
  user_id?: number;
  onMarkerHover: (storeId: number | null) => void;
};

const SearchResults = ({
  results,
  user_id,
  onMarkerHover,
}: SearchResultsProps) => {
  if (results.length === 0) {
    return <div className="p-3">검색 결과가 없습니다.</div>;
  }

  console.log(results);

  const handleListHover = (storeId: number | null) => {
    onMarkerHover(storeId);
  };

  return (
    <ul className="mt-4 h-[900px] overflow-y-scroll">
      {results.map((result, index) => (
        <li
          key={index}
          className="border p-2 mb-2 hover:bg-skipMB transition-colors duration-200"
          onMouseEnter={() => {
            handleListHover(result.store_id);
          }}
          onMouseLeave={() => {
            handleListHover(null);
          }}
        >
          <div className="w-full h-70">
            <img
              className="w-full h-full object-cover"
              src={`${result.img}`}
              alt={`${result.store_name}`}
            />
          </div>
          <div>이름: {result.store_name}</div>
          <div>주소: {result.store_address}</div>
          <div className="flex gap-1 text-sm">
            <InfoStar starNum={result.store_rating} />
            <span>리뷰: {result.reviewCount}</span>
            <MapInfoBtn
              store_id={result.store_id}
              user_id={user_id}
              content="상세 정보"
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;