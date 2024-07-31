import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import InfoSolidHeart from "../atom/InfoSolidHeart";
import InfoHeartIcon from "../atom/InfoHeartIcon";
import { jwtDecode } from "jwt-decode";
import { INFO_GET_FAVORITE, INFO_POST_FAVORITE } from "../../Urls/URLList";

type InfoClickHeartProps = {
  storeId: number;
};

type FavoriteResponse = {
  id: number;
  memberIdx: number;
  storeId: number;
  favorite: boolean;
};

const InfoClickHeart = ({ storeId }: InfoClickHeartProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [memberIdx, setMemberIdx] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log("decodedToken", decodedToken);
        setMemberIdx(decodedToken.idx);
      } catch (error) {
        console.error("토큰 디코딩 중 오류 발생:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (memberIdx !== null) {
      const fetchHeart = async () => {
        try {
          const token = localStorage.getItem("jwt-token");
          const response = await axios.get<FavoriteResponse>(
            //`http://localhost:8080/api/info/favorites/${storeId}/${memberIdx}`,
            INFO_GET_FAVORITE(storeId, memberIdx),
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log("서버 응답 전체 데이터:", response.data);
          console.log("서버 응답 타입:", typeof response.data);
          const data = response.data;
          console.log("서버 응답 전체 데이터:", data);
          console.log("받은데이터 찜", data.favorite);
          setIsFavorite(data.favorite);
          console.log("설정된 isFavorite 값:", data.favorite);
        } catch (error) {
          console.error("찜 상태 조회 중 오류 발생:", error);
        }
      };
      fetchHeart();
    } else {
      setIsFavorite(false);
    }
  }, [storeId, memberIdx]);

  useEffect(() => {
    console.log("현재 isFavorite 상태:", isFavorite);
  }, [isFavorite]);

  const handleHeartClick = useCallback(async () => {
    if (memberIdx === null) {
      alert("로그인하세요");
      return;
    }

    const newFavoritesStatus = !isFavorite;
    try {
      const token = localStorage.getItem("jwt-token");
      const response = await axios.post<FavoriteResponse>(
        INFO_POST_FAVORITE(),
        {
          memberIdx: memberIdx,
          storeId,
          favorite: newFavoritesStatus,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsFavorite(response.data.favorite);
      console.log("업데이트된 찜 상태:", response.data.favorite);
    } catch (error) {
      console.error("찜 상태 업데이트 중 오류 발생:", error);
    }
  }, [isFavorite, memberIdx, storeId]);

  return (
    <div className="text-lg font-bold" onClick={handleHeartClick}>
      {isFavorite ? <InfoSolidHeart /> : <InfoHeartIcon />}
    </div>
  );
};

export default InfoClickHeart;
