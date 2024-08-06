import { useCallback, useEffect, useState } from "react";
import InfoReviewComponent, {
  InfoReviewComponentProps,
} from "./InfoReviewComponent";
import axios from "axios";
import InfoReviewEditBox from "./InfoReviewEditBox";
import { jwtDecode } from "jwt-decode";
// import { log } from "console";
import {
  INFO_REVIEW_UPDATE, //오타
  INFO_REVIEW_DELETE,
  INFO_REVIEW_LIST,
} from "../../../Urls/URLList";

type InfoReviewListProps = {
  store_id: number;
  infoNewReviewList: InfoReviewComponentProps[];
  fetchAverageRating: () => void;
};

const InfoReviewList = ({
  store_id,
  infoNewReviewList,
  fetchAverageRating,
}: InfoReviewListProps) => {
  const [infoReviewList, setInfoReviewList] = useState<
    InfoReviewComponentProps[]
  >([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const getToken = () => {
    return localStorage.getItem("jwt-token");
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        // console.log("Decoded token:", decodedToken);
        setCurrentUser(decodedToken);
      } catch (error) {
        console.error("토큰 디코딩 중 오류 발생:", error);
      }
    }
  }, []);

  const fetchReview = useCallback(async () => {
    try {
      const token = getToken();
      const response = await axios.get(INFO_REVIEW_LIST(store_id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: InfoReviewComponentProps[] = response.data.reverse();
      // console.log("리뷰 데이터: ", data);
      setInfoReviewList(data);
    } catch (error) {
      console.error("리뷰 정보를 가져오는 중 오류 발생: ", error);
    }
  }, [store_id]);

  useEffect(() => {
    fetchReview();
  }, [fetchReview]);

  useEffect(() => {
    fetchReview();
  }, [infoNewReviewList, fetchReview]);

  const handleDeleteReview = useCallback(
    async (review_id: number) => {
      try {
        // console.log("리뷰 삭제 요청 시작:", review_id);
        const token = getToken();
        await axios.delete(INFO_REVIEW_DELETE(review_id), {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log("리뷰 삭제 요청 완료");
        await fetchReview();
        await fetchAverageRating();
        alert("리뷰가 성공적으로 삭제되었습니다.");
      } catch (error) {
        console.error("리뷰 삭제 중 오류 발생:", error);
        alert("리뷰 삭제 중 오류가 발생했습니다.");
      }
    },
    [fetchReview, fetchAverageRating]
  );

  const handleEditSubmit = useCallback(
    async (reviewId: number, content: string, rating: number) => {
      try {
        const token = getToken();
        // console.log("리뷰 수정:" + reviewId, content, rating);
        await axios.put(
          INFO_REVIEW_UPDATE(reviewId), //오타
          {
            comment: content,
            reviewRating: rating,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        await fetchReview();
        await fetchAverageRating();
        alert("리뷰가 성공적으로 수정되었습니다.");
      } catch (error) {
        console.error("리뷰 수정 중 오류 발생:", error);
        alert("리뷰 수정 중 오류가 발생했습니다.");
      }
    },
    [fetchReview, fetchAverageRating]
  );

  return (
    <div className="max-w-768 w-full h-px600 overflow-y-scroll my-0 mx-auto flex flex-col gap-px20">
      {infoReviewList.map((data) => (
        <div
          key={data.reviewId}
          className="relative flex justify-between w-full"
        >
          <InfoReviewComponent {...data} />
          {currentUser !== null && currentUser.idx === data.memberIdx && (
            <InfoReviewEditBox
              reviewId={data.reviewId}
              comment={data.comment}
              rating={data.reviewRating}
              onDelete={handleDeleteReview}
              onEditSubmit={handleEditSubmit}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default InfoReviewList;
