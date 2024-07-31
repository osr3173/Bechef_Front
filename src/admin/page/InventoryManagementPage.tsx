import React, { useState, useEffect } from "react";
import KitList from "../organisms/Kit/KitList";
import Navigation from "../organisms/Navigation/NavigationPage";
import Sidebar from "../organisms/Sidebar/SidebarPage";
import axios from "axios";
import { Kit } from "../atom/Kit/Kit";
import { jwtDecode } from "jwt-decode";
import { log } from "console";
import { json } from "stream/consumers";
import { ADMIN_LOAD_STORES, ADMIN_STORE_SELECTED } from "../../Urls/URLList";

const InventoryManagementPage = () => {
  const [kits, setKits] = useState<Kit[]>([]);
  const [stores, setStores] = useState<
    { storeId: number; storeName: string }[]
  >([]);
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setIsAdmin(decodedToken.role === "ADMIN");
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsAdmin(false);
      }
    }
  }, []);

  useEffect(() => {
    if (isAdmin) {
      const loadStores = async () => {
        try {
          const token = localStorage.getItem("jwt-token");
          const response = await axios.get(ADMIN_LOAD_STORES(), {
            headers: { Authorization: `Bearer ${token}` },
          });
          const fetchedStores = response.data;
          setStores(fetchedStores);
          if (fetchedStores.length > 0) {
            setSelectedStoreId(fetchedStores[0].store_id);
            JSON.stringify(fetchedStores, null, 2);

            console.log();
          }
        } catch (error) {
          console.error("Error fetching stores:", error);
        }
      };
      loadStores();
    }
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin && selectedStoreId) {
      const loadKits = async () => {
        try {
          const token = localStorage.getItem("jwt-token");
          const response = await axios.get(
            ADMIN_STORE_SELECTED(selectedStoreId),
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const fetchedKits: Kit[] = response.data.map((item: any) => ({
            menu_id: item.menuId, //메뉴 ID
            menu_name: item.menuName, //메뉴 이름
            menu_description: item.menuDescription, //메뉴 설명
            menu_price: item.menuPrice, //메뉴 가격
            menu_image_url: item.menuImageUrl, //메뉴 이미지
            quantity: item.quantity, // 수량
            store_id: item.storeId, //가게 ID
            store_name: item.storeName, // 가게 이름
          }));
          console.log(fetchedKits);
          setKits(fetchedKits);
        } catch (error) {
          console.error("Error fetching kits:", error);
        }
      };
      loadKits();
    }
  }, [selectedStoreId, stores, isAdmin]);

  const handleStoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStoreId(Number(event.target.value));
  };

  const handleKitUpdate = (updatedKit: Kit) => {
    setKits((prevKits) =>
      prevKits.map((kit) =>
        kit.menu_id === updatedKit.menu_id ? updatedKit : kit
      )
    );
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
    <div className="flex flex-col h-screen bg-gray-100">
      <Navigation />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">재고 관리</h1>
            <div className="mb-6">
              <select
                value={selectedStoreId || ""}
                onChange={handleStoreChange}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                {stores.map((store) => (
                  <option key={store.storeId} value={store.storeId}>
                    {store.storeName}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <KitList kits={kits} onUpdateKit={handleKitUpdate} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InventoryManagementPage;
