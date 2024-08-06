//밀키트 메뉴 출력 컴포넌트

import InfoMenuImage from "../../atom/InfoMenuImage";
import InfoMenuIngredientBox from "../../atom/InfoMenuIngredientBox";
import InfoMenuTextBox from "../../atom/InfoMenuTextBox";
import InfoMenuTitle from "../../atom/InfoMenuTitle";

export type InfoMenuComponentProps = {
  kitName: string;
  kitIngredient: string[];
  kitAllergies: string[] | null;
  kitCount: number;
  imageUrl: string;
  cookingTime: number;
  difficulty: string;
  calories: number;
  description: string;
};

const InfoMenuComponent = ({
  kitName,
  kitIngredient,
  kitCount,
  kitAllergies,
  imageUrl,
  cookingTime,
  difficulty,
  calories,
  description,
}: InfoMenuComponentProps) => {
  return (
    <div className="flex justify-between items-center text-base mt-px20 gap-1 w-full">
      <div className="flex gap-px20 justify-center">
        <InfoMenuImage content={imageUrl} />
        <div className="flex flex-col gap-px20 mt-px10">
          <InfoMenuTitle content={kitName} />

          <div className="flex flex-col gap-px10 w-px445">
            <div className="mb-2.5 text-xl text-gray-700 w-px445">
              {description}
            </div>
            <div>
              <InfoMenuIngredientBox
                menuText="주재료"
                menuContent={kitIngredient}
              />
              {kitAllergies && kitAllergies.length > 0 && (
                <InfoMenuIngredientBox
                  menuContent={kitAllergies}
                  menuText="알레르기"
                />
              )}
              <InfoMenuTextBox
                menuDes="조리시간"
                menuText={cookingTime}
                menuUnit="분"
              />
              <InfoMenuTextBox menuDes="난이도" menuText={difficulty} />
              <InfoMenuTextBox
                menuDes="칼로리"
                menuText={calories}
                menuUnit="kcal"
              />
              <InfoMenuTextBox
                menuDes="남은수량"
                menuText={kitCount}
                menuUnit="개"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoMenuComponent;
