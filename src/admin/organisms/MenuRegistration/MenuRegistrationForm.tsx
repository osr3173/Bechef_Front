import React, { useState } from "react";
import axios from "axios";
import IngredientsInput from "../ingredients/IngredientsInput";

export type Store = {
  storeId: number;
  storeName: string;
};

type FormData = {
  storeId: number;
  menuName: string;
  menuDescription: string;
  menuPrice: string;
  menuImageUrl: string;
  menuCookingTime: string;
  menuDifficulty: string;
  menuIngredients: string;
  menuCalories: string;
  quantity: string;
};

type MenuRegistrationFormProps = {
  stores: Store[];
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
};

const MenuRegistrationForm: React.FC<MenuRegistrationFormProps> = ({
  stores,
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState<FormData>({
    storeId: 1,
    menuName: "",
    menuDescription: "",
    menuPrice: "",
    menuImageUrl: "",
    menuCookingTime: "",
    menuDifficulty: "",
    menuIngredients: "",
    menuCalories: "",
    quantity: "",
  });

  const [uploadImgUrl, setUploadImgurl] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log("가게의 아이디" + name, value);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageData = new FormData();
    imageData.append("image", file);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        imageData,
        {
          params: {
            key: "115376878bc76479b9c6775a72f120aa",
          },
        }
      );

      const menuImageUrl = response.data.data.url;
      setFormData((prev) => ({ ...prev, menuImageUrl }));
      setUploadImgurl(menuImageUrl);
    } catch (error) {
      console.error("Image upload error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      menuIngredients: selectedIngredients.join(", "),
    };
    onSubmit(submissionData);
  };

  const handleIngredientsChange = (newIngredients: string[]) => {
    setSelectedIngredients(newIngredients);
  };

  return (
    <>
      <style>
        {`
          input[type=number]::-webkit-outer-spin-button,
          input[type=number]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type=number] {
            -moz-appearance: textfield;
          }
        `}
      </style>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-4 bg-white rounded-lg shadow-md"
      >
        <div>
          <label
            htmlFor="storeId"
            className="block text-sm font-medium text-gray-700"
          >
            가게 선택
          </label>
          <select
            id="storeId"
            value={formData.storeId}
            onChange={handleChange}
            name="storeId"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="" disabled>
              가게 선택
            </option>
            {stores.map((store) => (
              <option key={store.storeId} value={store.storeId}>
                {store.storeName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="menuName"
            className="block text-sm font-medium text-gray-700"
          >
            메뉴 이름
          </label>
          <input
            id="menuName"
            value={formData.menuName}
            onChange={handleChange}
            name="menuName"
            placeholder="메뉴 이름"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="menuDescription"
            className="block text-sm font-medium text-gray-700"
          >
            설명
          </label>
          <input
            id="menuDescription"
            value={formData.menuDescription}
            onChange={handleChange}
            name="menuDescription"
            placeholder="설명"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="menuPrice"
            className="block text-sm font-medium text-gray-700"
          >
            가격
          </label>
          <input
            id="menuPrice"
            value={formData.menuPrice}
            onChange={handleChange}
            name="menuPrice"
            type="number"
            placeholder="가격"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md appearance-none"
          />
        </div>
        <div>
          <label
            htmlFor="menuImageUrl"
            className="block text-sm font-medium text-gray-700"
          >
            이미지 업로드
          </label>
          <input
            id="menuImageUrl"
            type="file"
            name="menuImageUrl"
            onChange={handleImageUpload}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          />
          {uploadImgUrl && (
            <img
              src={uploadImgUrl}
              alt="Uploaded"
              className="mt-2 max-w-full h-auto rounded-lg"
            />
          )}
        </div>
        <div>
          <label
            htmlFor="menuCookingTime"
            className="block text-sm font-medium text-gray-700"
          >
            조리 시간 (분)
          </label>
          <input
            id="menuCookingTime"
            value={formData.menuCookingTime}
            onChange={handleChange}
            name="menuCookingTime"
            type="number"
            placeholder="조리 시간 (분)"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md appearance-none"
          />
        </div>
        <div>
          <label
            htmlFor="menuDifficulty"
            className="block text-sm font-medium text-gray-700"
          >
            난이도
          </label>
          <select
            id="menuDifficulty"
            value={formData.menuDifficulty}
            onChange={handleChange}
            name="menuDifficulty"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="" disabled>
              난이도
            </option>
            <option value="Easy">쉬움</option>
            <option value="Medium">보통</option>
            <option value="Hard">어려움</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="ingredients"
            className="block text-sm font-medium text-gray-700"
          >
            재료
          </label>
          <IngredientsInput
            selectedIngredients={selectedIngredients}
            onChange={handleIngredientsChange}
          />
        </div>
        <div>
          <label
            htmlFor="menuCalories"
            className="block text-sm font-medium text-gray-700"
          >
            칼로리
          </label>
          <input
            id="menuCalories"
            value={formData.menuCalories}
            onChange={handleChange}
            name="menuCalories"
            type="number"
            placeholder="칼로리"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md appearance-none"
          />
        </div>
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            초기 수량
          </label>
          <input
            id="quantity"
            value={formData.quantity}
            onChange={handleChange}
            name="quantity"
            type="number"
            placeholder="초기 수량"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md appearance-none"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          메뉴 등록
        </button>
      </form>
    </>
  );
};

export default MenuRegistrationForm;
