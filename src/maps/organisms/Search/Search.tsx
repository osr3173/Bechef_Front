import React, { useState } from "react";
import axios from "axios";
import HeaderSection from "../../molecules/HeaderSection/HeaderSection";
import SearchSection from "../../molecules/SearchSection/SearchSection";
import SearchResults, { Store } from "../../atom/SearchResults/SearchResults";
import SortBtn from "../../molecules/sortBtn/SortBtn";
import { MAP_SEARCH } from "../../../Urls/URLList";

interface SearchProps {
  setResults: React.Dispatch<React.SetStateAction<Store[]>>;
  onMarkerHover: (storeId: number | null) => void;
}

const Search = ({ setResults, onMarkerHover }: SearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResultsState] = useState<Store[]>([]);
  const [sortOption, setSortOption] = useState<string>("");

  const handleSearch = async () => {
    try {
      const response = await axios.get<Store[]>(MAP_SEARCH(query));
      setResultsState(response.data);
      setResults(response.data);
    } catch (error) {
      console.error("검색 결과를 가져오는 중 오류 발생:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSort = (sortOption: string) => {
    let sortedResults = [...results];
    if (sortOption === "review") {
      sortedResults.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sortOption === "rating") {
      sortedResults.sort((a, b) => b.store_rating - a.store_rating);
    }
    setResultsState(sortedResults);
  };

  return (
    <div className="bg-npLG w-px415 flex flex-col h-full">
      <HeaderSection />
      <div>
        <SearchSection
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
          handleKeyPress={handleKeyPress}
        />
        <SortBtn setSortOption={handleSort} />
        <SearchResults results={results} onMarkerHover={onMarkerHover} />
      </div>
    </div>
  );
};

export default Search;
