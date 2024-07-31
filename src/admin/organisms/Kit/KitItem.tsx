import React, { useState, useEffect } from "react";
import KitInfo from "../../molecules/Kit/KitInfo";
import { Kit } from "../../atom/Kit/Kit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ADMIN_UPDATE_QUANTITY } from "../../../Urls/URLList";

type KitItemProps = {
  kit: Kit;
  onUpdate: (updatedKit: Kit) => void;
};

const KitItem: React.FC<KitItemProps> = ({ kit, onUpdate }) => {
  const [inputQuantity, setInputQuantity] = useState(kit.quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    setInputQuantity(isNaN(newQuantity) ? 0 : newQuantity);
  };

  const handleUpdateQuantity = async () => {
    if (!isAdmin) {
      alert("관리자만 수량을 업데이트할 수 있습니다.");
      return;
    }

    try {
      setIsUpdating(true);
      const token = localStorage.getItem("jwt-token");
      const response = await axios.put(
        //`http://localhost:8080/api/admin/inventory/${kit.store_id}/${kit.menu_id}`
        ADMIN_UPDATE_QUANTITY(kit),
        {
          quantity: inputQuantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedKit = response.data;
      onUpdate({ ...kit, quantity: updatedKit.quantity });
      alert("수량이 성공적으로 업데이트되었습니다.");
    } catch (error) {
      console.error("Error updating kit quantity:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error("Server response:", error.response.data);
      }
      alert("수량 업데이트에 실패했습니다.");
    } finally {
      setIsUpdating(false);
    }
  };

  const formatPrice = (menu_price: number) => Math.floor(menu_price);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <img
        src={kit.menu_image_url}
        alt={kit.menu_name}
        className="w-full h-48 object-cover"
      />
      <KitInfo
        name={kit.menu_name}
        description={kit.menu_description}
        price={formatPrice(kit.menu_price)}
        quantity={kit.quantity}
      />
      <div className="p-4 bg-gray-50">
        <div className="mb-2 text-center font-bold">
          가격: {formatPrice(kit.menu_price)}원
        </div>
        <div className="mb-2 text-center font-bold">
          현재 수량: {kit.quantity}
        </div>
        {isAdmin && (
          <>
            <input
              type="number"
              value={inputQuantity}
              onChange={handleQuantityChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleUpdateQuantity}
              disabled={isUpdating}
              className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400 transition-colors duration-300"
            >
              {isUpdating ? "업데이트 중..." : "수량 업데이트"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default KitItem;
