import Button from "../../atom/Button/Button";

type SortBtnProps = {
  setSortOption: (sortOption: string) => void;
};

const SortBtn = ({ setSortOption }: SortBtnProps) => {
  return (
    <div className="ml-2 p-2 flex gap-3">
      <Button
        text="리뷰순"
        onClick={() => setSortOption("review")}
        className="border border-black"
      />
      <Button
        text="별점순"
        onClick={() => setSortOption("rating")}
        className=" border border-black"
      />
    </div>
  );
};

export default SortBtn;