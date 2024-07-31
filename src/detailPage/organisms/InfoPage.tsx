import { useLocation, useParams } from "react-router-dom";
import InfoHeader from "../molecules/InfoHeader";
import InfoPageBox from "../molecules/InfoPageBox";
import InfoMiddleBox from "../molecules/InfoMiddleBox";
import InfoMenuBox from "../molecules/InfoMenuBox";
import InfoReviewBox from "../molecules/InfoReviewBox";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { INFO_AVERAGE_RATING } from "../../Urls/URLList";

const InfoPage = () => {
  const { store_id } = useParams<{ store_id: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const member_idx = queryParams.get("member_idx");

  // 별점 갱신 상태와 함수 추가
  const [ratingKey, setRatingKey] = useState(0);
  const [averageRating, setAverageRating] = useState(0); // 별점 상태 추가

  const handleRatingUpdate = useCallback(() => {
    setRatingKey((prevKey) => prevKey + 1);
  }, []);

  //별점 평균 가져와서 데이터 보내기
  const fetchAverageRating = useCallback(async () => {
    try {
      const response = await axios.get<number>(
        INFO_AVERAGE_RATING(Number(store_id))
      );
      setAverageRating(response.data);
    } catch (error) {
      console.error("별점 평균을 가져오는 중 오류 발생:", error);
    }
  }, [store_id]);

  useEffect(() => {
    fetchAverageRating();
  }, [fetchAverageRating, ratingKey]); // ratingKey가 변경될 때마다 호출

  return (
    <div className="bg-gray-100">
      <div className="bg-npLG w-screen">
        <div className="max-w-800 w-full my-0 mx-auto gap-6 bg-white mb-11">
          <InfoHeader />
          <InfoPageBox
            key={ratingKey}
            store_id={Number(store_id)}
            member_idx={member_idx ? Number(member_idx) : null}
            averageRating={averageRating} // 전달
          />
          <InfoMiddleBox store_id={Number(store_id)} />
          <InfoMenuBox store_id={Number(store_id)} />
          <InfoReviewBox
            store_id={Number(store_id)}
            member_idx={member_idx ? Number(member_idx) : null}
            onRatingUpdate={() => {
              handleRatingUpdate();
              fetchAverageRating(); // 별점 갱신 함수 호출
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
