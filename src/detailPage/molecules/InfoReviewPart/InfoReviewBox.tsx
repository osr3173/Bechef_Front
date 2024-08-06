import { useCallback, useEffect, useState } from "react";
import InfoSubTitle from "../../atom/InfoSubTitle";
import { InfoReviewComponentProps } from "./InfoReviewComponent";
import InfoReviewInputBox from "./InfoReviewInputBox";
import InfoReviewList from "./InfoReviewList";
import axios from "axios";
import { INFO_REVIEW_LIST } from "../../../Urls/URLList";

//상세페이지 - 리뷰 전체 박스
type InfoReviewBoxProps = {
  store_id: number;
  member_idx: number | null;
  onRatingUpdate: () => void; // 별점 갱신 함수 추가
};

const InfoReviewBox = ({
  store_id,
  member_idx,
  onRatingUpdate,
}: InfoReviewBoxProps) => {
  const [infoReviewList, setInfoReviewList] = useState<
    InfoReviewComponentProps[]
  >([]);

  const fetchReviewList = useCallback(async () => {
    try {
      const response = await axios.get<InfoReviewComponentProps[]>(
        INFO_REVIEW_LIST(store_id)
      );
      setInfoReviewList(response.data.reverse());
    } catch (error) {
      console.error("리뷰 정보를 가져오는 중 오류 발생:", error);
    }
  }, [store_id]);

  useEffect(() => {
    fetchReviewList();
  }, [fetchReviewList]);

  return (
    <div className="mt-4 max-w-800 w-full my-4 mx-auto mb-9 drop-shadow-lg bg-white rounded-lg">
      <div className="max-w-768 w-full mt-9 mx-auto mb-9 gap-px20 pb-6">
        <InfoSubTitle content="리뷰" />
        <div className="flex flex-col gap-px20">
          <InfoReviewInputBox
            store_id={store_id}
            member_idx={member_idx}
            setInfoReviewList={setInfoReviewList}
            fetchAverageRating={onRatingUpdate}
          />
          <InfoReviewList
            store_id={store_id}
            infoNewReviewList={infoReviewList}
            fetchAverageRating={onRatingUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default InfoReviewBox;
