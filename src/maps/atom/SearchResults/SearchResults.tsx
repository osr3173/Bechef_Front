import React, { forwardRef } from "react";

import MapInfoBtn from "../Button/MapInfoBtn";

import { useNavigate } from "react-router-dom";
import InfoSetStar from "../../../detailPage/atom/InfoSetStar";

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

const SearchResults = forwardRef<HTMLUListElement, SearchResultsProps>(
  ({ results, user_id, onMarkerHover }: SearchResultsProps, ref) => {
    const navigate = useNavigate(); // navigate

    if (results.length === 0) {
      return <div className="p-3">검색 결과가 없습니다.</div>;
    }

    const handleListHover = (storeId: number | null) => {
      onMarkerHover(storeId);
    };

    // 매장 이동
    const handleListClick = (storeId: number) => {
      navigate(`/information/${storeId}`);
    };

    return (
      <ul ref={ref} className="mt-4 h-[900px] overflow-y-scroll">
        {results.map((result, index) => (
          <li
            key={index}
            className="border p-2 mb-2 hover:bg-skipMB transition-colors duration-200 hover:cursor-pointer"
            onMouseEnter={() => {
              handleListHover(result.store_id);
            }}
            onMouseLeave={() => {
              handleListHover(null);
            }}
            onClick={() => {
              handleListClick(result.store_id); // 해당하는 매장 이동
            }}
          >
            <div className="w-full h-70">
              <img
                className="w-full h-[250px] object-cover"
                src={`${result.img}`}
                alt={`${result.store_name}`}
              />
            </div>
            <div>이름: {result.store_name}</div>
            <div>주소: {result.store_address}</div>
            <div className="flex gap-1 text-sm">
              <InfoSetStar content={result.store_rating} />
              <span>리뷰: {result.reviewCount}</span>
            </div>
          </li>
        ))}
      </ul>
    );
  }
);
SearchResults.displayName = "SearchResults";
export default SearchResults;
