import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { INFO_GET_FAVORITE, INFO_POST_FAVORITE } from "../../../Urls/URLList";
import { InfoHeartIcon, InfoSolidHeartIcon } from "../../atom/InfoIconsModule";

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
            INFO_GET_FAVORITE(storeId, memberIdx),
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const data = response.data;
          setIsFavorite(data.favorite);
        } catch (error) {
          console.error("찜 상태 조회 중 오류 발생:", error);
        }
      };
      fetchHeart();
    } else {
      setIsFavorite(false);
    }
  }, [storeId, memberIdx]);

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
      if (response.data.favorite) {
        alert("찜 목록에 추가되었습니다");
      } else {
        alert("찜 목록에서 제거하였습니다");
      }
    } catch (error) {
      console.error("찜 상태 업데이트 중 오류 발생:", error);
    }
  }, [isFavorite, memberIdx, storeId]);

  return (
    <div
      className="text-lg font-bold hover:cursor-pointer"
      onClick={handleHeartClick}
    >
      {isFavorite ? <InfoSolidHeartIcon /> : <InfoHeartIcon />}
    </div>
  );
};

export default InfoClickHeart;
