import { InfoMenuIngredientProps } from "./InfoProps";

const InfoMenuIngredient = ({ content }: InfoMenuIngredientProps) => {
  return (
    <div className="w-px360">
      {content.map((ingredient, index) => (
        // <span key={index}>{ingredient}</span>
        <span key={index}>
          {ingredient}
          {index < content.length - 1 && ", "}
        </span>
      ))}
    </div>
  );
};

export default InfoMenuIngredient;
