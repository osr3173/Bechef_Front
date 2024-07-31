import InfoMenuIngredient from "./InfoMenuIngredient";

type InfoMenuIngredientBoxProps = {
  menuContent: string[];
  menuText: string;
};
const InfoMenuIngredientBox = ({
  menuText,
  menuContent,
}: InfoMenuIngredientBoxProps) => {
  return (
    <div className="flex gap-1 pr-1 size-fit">
      <span className="font-semibold w-px75">{menuText} </span>
      <InfoMenuIngredient content={menuContent} />
    </div>
  );
};

export default InfoMenuIngredientBox;
