import React, { useState, useEffect } from "react";
// React와 필요한 훅들을 import합니다.

import KitList from "../organisms/Kit/KitList";
// KitList 컴포넌트를 import합니다.

import Navigation from "../organisms/Navigation/NavigationPage";
// Navigation 컴포넌트를 import합니다.

import Sidebar from "../organisms/Sidebar/SidebarPage";
// Sidebar 컴포넌트를 import합니다.

import axios from "axios";
// HTTP 요청을 위한 axios를 import합니다.

import { Kit } from "../atom/Kit/Kit";
// Kit 타입을 import합니다.

import { jwtDecode } from "jwt-decode";
// JWT 토큰을 디코딩하기 위한 함수를 import합니다.

import { log } from "console";
// console.log를 사용하기 위해 import합니다.

import { json } from "stream/consumers";
// JSON 관련 기능을 사용하기 위해 import합니다.

import { ADMIN_LOAD_STORES, ADMIN_STORE_SELECTED } from "../../Urls/URLList";
// API 엔드포인트 URL들을 import합니다.

const InventoryManagementPage = () => {
  // InventoryManagementPage 컴포넌트를 정의합니다.

  const [kits, setKits] = useState<Kit[]>([]);
  // 키트 목록 상태와 그 상태를 변경하는 함수를 선언합니다.

  const [stores, setStores] = useState<
    { storeId: number; storeName: string }[]
  >([]);
  // 매장 목록 상태와 그 상태를 변경하는 함수를 선언합니다.

  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  // 선택된 매장 ID 상태와 그 상태를 변경하는 함수를 선언합니다.
  console.log(selectedStoreId);

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  // 관리자 여부 상태와 그 상태를 변경하는 함수를 선언합니다.

  useEffect(() => {
    // 컴포넌트가 마운트될 때 실행되는 효과를 정의합니다.
    const token = localStorage.getItem("jwt-token");
    // 로컬 스토리지에서 JWT 토큰을 가져옵니다.
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        // 토큰을 디코딩합니다.
        setIsAdmin(decodedToken.role === "ADMIN");
        // 디코딩된 토큰의 role이 "ADMIN"이면 isAdmin을 true로 설정합니다.
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsAdmin(false);
        // 토큰 디코딩 중 오류가 발생하면 isAdmin을 false로 설정합니다.
      }
    }
  }, []);

  useEffect(() => {
    // isAdmin 상태가 변경될 때 실행되는 효과를 정의합니다.
    if (isAdmin) {
      const loadStores = async () => {
        // 매장 목록을 불러오는 비동기 함수를 정의합니다.
        try {
          const token = localStorage.getItem("jwt-token");
          // 로컬 스토리지에서 JWT 토큰을 가져옵니다.
          const response = await axios.get(ADMIN_LOAD_STORES(), {
            headers: { Authorization: `Bearer ${token}` },
          });
          // 매장 목록을 가져오기 위해 API 요청을 보냅니다.
          const fetchedStores = response.data;
          // 응답에서 매장 데이터를 추출합니다.
          setStores(fetchedStores);
          // 매장 목록 상태를 업데이트합니다.
          if (fetchedStores.length > 0) {
            setSelectedStoreId(fetchedStores[0].store_id);
            // 매장이 하나 이상 있으면 첫 번째 매장을 선택합니다.
            JSON.stringify(fetchedStores, null, 2);
            // 매장 데이터를 JSON 문자열로 변환합니다 (사용되지 않는 코드).
            console.log();
            // 빈 console.log 호출 (의도가 불분명합니다).
          }
        } catch (error) {
          console.error("Error fetching stores:", error);
          // 매장 목록을 가져오는 중 오류가 발생하면 콘솔에 오류를 출력합니다.
        }
      };
      loadStores();
      // 매장 목록을 불러오는 함수를 실행합니다.
    }
  }, [isAdmin]);

  useEffect(() => {
    // selectedStoreId, stores, isAdmin 상태가 변경될 때 실행되는 효과를 정의합니다.
    if (isAdmin && selectedStoreId) {
      const loadKits = async () => {
        // 키트 목록을 불러오는 비동기 함수를 정의합니다.
        try {
          const token = localStorage.getItem("jwt-token");
          // 로컬 스토리지에서 JWT 토큰을 가져옵니다.
          const response = await axios.get(
            ADMIN_STORE_SELECTED(selectedStoreId),
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          // 선택된 매장의 키트 목록을 가져오기 위해 API 요청을 보냅니다.
          const fetchedKits: Kit[] = response.data.map((item: any) => ({
            menu_id: item.menuId,
            menu_name: item.menuName,
            menu_description: item.menuDescription,
            menu_price: item.menuPrice,
            menu_image_url: item.menuImageUrl,
            quantity: item.quantity,
            store_id: item.storeId,
            store_name: item.storeName,
          }));
          // 응답 데이터를 Kit 타입의 배열로 변환합니다.
          console.log(fetchedKits);
          // 가져온 키트 목록을 콘솔에 출력합니다.
          setKits(fetchedKits);
          // 키트 목록 상태를 업데이트합니다.
        } catch (error) {
          console.error("Error fetching kits:", error);
          // 키트 목록을 가져오는 중 오류가 발생하면 콘솔에 오류를 출력합니다.
        }
      };
      loadKits();
      // 키트 목록을 불러오는 함수를 실행합니다.
      setKits([]); // '매장을 선택하세요' 를 선택하면 빈 배열 설정
      // 이 라인은 loadKits 함수 실행 직후에 키트 목록을 비우므로, 의도한 대로 동작하지 않을 수 있습니다.
    }
  }, [selectedStoreId, stores, isAdmin]);

  const handleStoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // 매장 선택이 변경될 때 호출되는 함수입니다.
    const storeId = Number(event.target.value); // storeId 선언

    if (storeId == 0) {
      setSelectedStoreId(null);
      setKits([]);
    }
    // 선택된 매장의 ID를 숫자로 변환합니다.
    setSelectedStoreId(storeId || null); // 매장 or Null 값
    // 선택된 매장 ID를 설정합니다. 값이 없으면 null로 설정합니다.
    console.log(storeId);
  };

  const handleKitUpdate = (updatedKit: Kit) => {
    // 키트가 업데이트될 때 호출되는 함수입니다.
    setKits((prevKits) =>
      prevKits.map((kit) =>
        kit.menu_id === updatedKit.menu_id ? updatedKit : kit
      )
    );
    // 업데이트된 키트로 키트 목록을 갱신합니다.
  };

  if (!isAdmin) {
    // 관리자가 아닌 경우 접근 권한 없음 메시지를 표시합니다.
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
    // 관리자인 경우 재고 관리 페이지를 렌더링합니다.
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
                <option value="">매장을 선택하세요</option>
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
