import { useState } from "react";
import MyMap from "../atom/maps/MyMap";
import Search from "../organisms/Search/Search";
import { Store } from "../atom/SearchResults/SearchResults";

const MapPage = () => {
  const [results, setResults] = useState<Store[]>([]); // Store[] 타입으로 초기화

  const handleMarkerHover = (storeId: number | null) => {
    //임의 이벤트 집어넣음
    console.log("Hovered Store ID:", storeId);
  };

  return (
    <div className="flex h-screen gap-1 overflow-hidden">
      <Search setResults={setResults} onMarkerHover={handleMarkerHover} />
      <div className="flex-grow">
        <MyMap results={results} onMarkerHover={handleMarkerHover} />
      </div>
    </div>
  );
};
export default MapPage;
