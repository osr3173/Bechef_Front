import React, { useState, useMemo, useEffect } from "react";
import { Ingredient } from "../../atom/ingredients/Ingredients";

type IngredientsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (selectedIngredients: string[]) => void;
  initialIngredients: string[];
  availableIngredients: Ingredient[];
};

const IngredientsModal = ({
  isOpen,
  onClose,
  onSave,
  initialIngredients,
  availableIngredients,
}: IngredientsModalProps) => {
  const [selectedIngredients, setSelectedIngredients] =
    useState<string[]>(initialIngredients);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleIngredient = (ingredientId: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredientId)
        ? prev.filter((id) => id !== ingredientId)
        : [...prev, ingredientId]
    );
  };

  useEffect(() => {
    //만약 모달이 열려있다면 메인 화면스크롤 비활성화
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      //모달이 닫혀 있으면 스크롤을 활성화
      document.body.style.overflow = "unset";
    }
    //클린업 함수 : 컴포넌트가 언마운트거나 effect가 다시 실행될 때 스크롤을 활성화함
  return () => {
    document.body.style.overflow = "unset";
  };
},[isOpen]);



  const handleSave = () => {
    onSave(selectedIngredients);
    onClose();
  };

  const handleReset = () => {
    setSelectedIngredients([]);
  };

  const filteredIngredients = useMemo(() => {
    return availableIngredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [availableIngredients, searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-xl max-w-md w-full max-h-[80vh] flex flex-col">
        <h2 className="text-xl font-bold mb-4">재료 선택</h2>
        <input
          type="text"
          placeholder="재료 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2 border rounded w-full"
        />
        <div className="flex-grow overflow-y-auto mb-4">
          <div className="grid grid-cols-3 gap-2">
            {filteredIngredients.map((ingredient) => (
              <button
                key={ingredient.id}
                onClick={() => handleToggleIngredient(ingredient.id)}
                className={`p-2 rounded ${
                  selectedIngredients.includes(ingredient.id)
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {ingredient.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleReset}
            className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
          >
            초기화
          </button>
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-300 rounded"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default IngredientsModal;
