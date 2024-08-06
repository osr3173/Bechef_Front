import React, { useEffect, useState } from "react";
import Button from "./Button/Button";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  MAP_DELETE_ACCOUNT,
  MAP_MODAL_FAVORITE,
  MAP_MODAL_REVIEW,
} from "../../Urls/URLList";
import { useNavigate } from "react-router-dom"; // import useNavigate for navigation

type ModalProps = {
  showModal: boolean;
  closeModal: () => void;
  onLogout: () => void;
};

type JwtPayload = {
  idx: Number;
};

type FavoriteDTO = {
  id: number;
  memberIdx: number;
  storeId: number;
  favorite: boolean;
  storeName: string;
};

const Modal = ({ showModal, closeModal, onLogout }: ModalProps) => {
  const [favorites, setFavorites] = useState<FavoriteDTO[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const navigate = useNavigate(); // initialize useNavigate

  useEffect(() => {
    if (showModal) {
      fetchUserData();
    }
  }, [showModal]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("jwt-token");
      if (!token) {
        throw new Error("로그인이 필요합니다.");
      }

      const decodedToken = jwtDecode<JwtPayload>(token);
      const idx = decodedToken.idx;
      // console.log("Decoded memberIdx:", idx); // 디버깅을 위해 콘솔에 출력

      const favoritesResponse = await axios.get(MAP_MODAL_FAVORITE(idx), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(favoritesResponse.data);
      // review 불러오기
      const reviewsResponse = await axios.get(MAP_MODAL_REVIEW(idx), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReviews(reviewsResponse.data);
    } catch (error) {
      console.error("데이터 불러오기 실패", error);
      alert("사용자 데이터를 불러오는 데 실패했습니다.");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("정말로 회원 탈퇴를 하시겠습니까?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("jwt-token");
      if (!token) {
        throw new Error("로그인이 필요합니다.");
      }
      //console.log("JWT Token for account deletion:", token);

      const response = await axios.delete(MAP_DELETE_ACCOUNT(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log("Account Deleted");
        alert("탈퇴가 완료되었습니다.");
        closeModal();
        localStorage.removeItem("jwt-token");
        onLogout();
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting account", error.message);
        alert("탈퇴 중 오류가 발생했습니다: " + error.message);
      } else {
        console.error("Unexpected error", error);
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const handleStoreClick = (storeId: number) => {
    navigate(`/information/${storeId}`); // navigate to store detail page
  };

  if (!showModal) return null;

  return (
    <div className="text-black fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={closeModal}
      ></div>
      <div className="bg-white p-4 rounded shadow-lg z-10 w-[1200px] h-[500px] overflow-hidden flex flex-col">
        <h2 className="text-xl mb-4">마이페이지</h2>

        <div className="flex-1 flex space-x-4 overflow-hidden">
          <div className="w-1/2 flex flex-col">
            <div className="font-semibold mb-2">내가 작성한 리뷰</div>
            <div className="text-sm border-2 border-black p-2 rounded flex-1 overflow-y-auto">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div
                    className="flex gap-5 mb-2 cursor-pointer"
                    key={index}
                    onClick={() => handleStoreClick(review.storeId)}
                  >
                    <div className="w-52">{review.storeName}</div>
                    <div className="w-52">{review.comment}</div>
                    <div className="text-left">{review.reviewDate}</div>
                  </div>
                ))
              ) : (
                <div>리뷰 없음</div>
              )}
            </div>
          </div>

          <div className="w-1/2 flex flex-col">
            <div className="font-semibold mb-2">찜리스트</div>
            <div className="border-2 border-black p-2 rounded flex-1 overflow-y-auto">
              {favorites.length > 0 ? (
                favorites.map((favorite, index) => (
                  <div
                    className="cursor-pointer"
                    key={index}
                    onClick={() => handleStoreClick(favorite.storeId)}
                  >
                    {favorite.storeName}
                  </div>
                ))
              ) : (
                <div>찜 목록 없음</div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center relative">
          <div className="mt-4">
            <Button
              onClick={closeModal}
              text="닫기"
              className="mt-4 border p-2 rounded text-white bg-red-500 flex"
            />
          </div>
          <div className="absolute left-1">
            <Button
              text="회원탈퇴"
              onClick={handleDeleteAccount}
              className="mt-7 text-red-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
