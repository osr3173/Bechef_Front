import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Navigation from "../organisms/Navigation/NavigationPage";
import Sidebar from "../organisms/Sidebar/SidebarPage";
import MenuRegistrationForm from "../organisms/MenuRegistration/MenuRegistrationForm";
import { ADMIN_LOAD_STORES, ADMIN_MENU_POST } from "../../Urls/URLList";

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
  menuCalories: string;
  quantity: string;
};

const MenuRegistrationPage: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadStores();
    }
  }, [isAdmin]);

  const checkAdminStatus = () => {
    const token = localStorage.getItem("jwt-token");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setIsAdmin(decodedToken.role === "ADMIN");
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  };

  const loadStores = async () => {
    try {
      const token = localStorage.getItem("jwt-token");
      const response = await axios.get(ADMIN_LOAD_STORES(), {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("가게들 불러옴:", response.data);
      setStores(response.data);
    } catch (error) {
      console.error("Error fetching stores:", error);
      setMessage("가게 목록을 불러오는 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setIsSuccess(false);

    if (
      !formData.storeId ||
      !formData.menuName ||
      !formData.menuDescription ||
      !formData.menuPrice ||
      !formData.menuImageUrl ||
      !formData.menuCookingTime ||
      !formData.menuDifficulty ||
      !formData.menuCalories ||
      !formData.quantity
    ) {
      setMessage("모든 필드를 입력해주세요.");
      setIsLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("jwt-token");
      console.log(
        "등록하려고 하는 메뉴의 정보:",
        JSON.stringify(formData, null, 2)
      );

      const response = await axios.post(
        ADMIN_MENU_POST(),
        {
          ...formData,
          storeId: Number(formData.storeId),
          menu_price: Number(formData.menuPrice),
          menu_cooking_time: Number(formData.menuCookingTime),
          menu_calories: Number(formData.menuCalories),
          quantity: Number(formData.quantity),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("메뉴가 성공적으로 등록되었습니다.");
      setIsSuccess(true);
    } catch (error) {
      console.error("Error registering mealkit:", error);
      if (axios.isAxiosError(error) && error.response) {
        setMessage(
          `메뉴 등록 중 오류가 발생했습니다: ${
            error.response.data.details || error.response.data.error
          }`
        );
      } else {
        setMessage("메뉴 등록 중 오류가 발생했습니다.");
      }
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex flex-col h-screen bg-gray-100 items-center justify-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          접근 권한이 없습니다
        </h1>
        <p className="text-gray-600">
          이 페이지는 관리자만 접근할 수 있습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navigation />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-2xl mx-auto bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                메뉴 등록
              </h3>
            </div>
            {isSuccess && (
              <div className="px-4 py-3 bg-green-100 text-green-700">
                등록이 완료되었습니다.
              </div>
            )}
            {message && !isSuccess && (
              <div className="px-4 py-3 bg-red-100 text-red-700">{message}</div>
            )}
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <MenuRegistrationForm
                  stores={stores}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MenuRegistrationPage;
