import React, { useState } from "react";
import { Ingredient, ingredients } from "../../atom/ingredients/Ingredients";
import IngredientsModal from "../../molecules/ingredients/IngredientsModal";

type IngredientsInputProps = {
  selectedIngredients: string[];
  onChange: (selectedIngredients: string[]) => void;
};

const IngredientsInput: React.FC<IngredientsInputProps> = ({
  selectedIngredients,
  onChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveIngredients = (ingredientIds: string[]) => {
    const ingredientNames = ingredientIds.map(
      (id) => ingredients.find((ing) => ing.id === id)?.name || ""
    );
    onChange(ingredientNames);
    handleCloseModal();
  };

  const getIngredientNames = (names: string[]) => {
    return names.join(",");
  };

  return (
    <div>
      <div className="mt-1 relative">
        <input
          id="ingredients"
          name="menu_ingredients"
          value={getIngredientNames(selectedIngredients)}
          onClick={handleOpenModal}
          placeholder="재료 선택"
          readOnly
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md cursor-pointer"
        />
        <button
          type="button"
          onClick={handleOpenModal}
          className="absolute inset-y-0 right-0 px-3 py-1 bg-gray-100 text-gray-600 rounded-r-md"
        >
          선택
        </button>
      </div>
      <IngredientsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveIngredients}
        initialIngredients={selectedIngredients}
        availableIngredients={ingredients}
      />
    </div>
  );
};

export default IngredientsInput;
