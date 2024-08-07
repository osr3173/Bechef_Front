import { useState } from "react";
import MyMap from "../atom/maps/MyMap";
import Search from "../organisms/Search/Search";
import { Store } from "../atom/SearchResults/SearchResults";

const MapPage = () => {
  const [results, setResults] = useState<Store[]>([]); // Store[] 타입으로 초기화
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null); // hover된 마커의 storeId 상태

  const handleMarkerHover = (storeId: number | null) => {
    setHoveredMarker(storeId);
  };

  return (
    <div className="flex h-screen gap-1 ">
      <Search setResults={setResults} onMarkerHover={handleMarkerHover} />
      <div className="flex-grow">
        <MyMap
          results={results}
          onMarkerHover={handleMarkerHover}
          hoveredMarker={hoveredMarker}
        />
      </div>
    </div>
  );
};

export default MapPage;
