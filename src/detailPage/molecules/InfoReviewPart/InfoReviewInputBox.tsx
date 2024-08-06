import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import InfoReviewInput from "../../atom/InfoReviewInput";
import InfoSubmitBtn from "../../atom/InfoSubmitBtn";
import InfoReviewStarComponent from "./InfoReviewStarComponent";
import { InfoReviewComponentProps } from "./InfoReviewComponent";
// import { log } from "console";
import { INFO_REVIEW_INPUT, INFO_REVIEW_LIST } from "../../../Urls/URLList";
import { jwtDecode } from "jwt-decode";

type InfoReviewInputBoxProps = {
  store_id: number;
  member_idx: number | null;
  setInfoReviewList: React.Dispatch<
    React.SetStateAction<InfoReviewComponentProps[]>
  >;
  fetchAverageRating: () => void;
};

type ReviewResponse = {
  id: number;
  member_idx: number;
  store_id: number;
  comment: string;
  review_rating: number;
};

const InfoReviewInputBox = ({
  store_id,
  setInfoReviewList,
  fetchAverageRating,
}: InfoReviewInputBoxProps) => {
  const [comment, setComment] = useState("");
  const [reviewRating, setReviewRating] = useState<number>(0);
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);
  const [resetInput, setResetInput] = useState<boolean>(false);
  const [member_idx, setMember_idx] = useState<number | null>(null);
  const [token, setToken] = useState<any>(null);

  const getToken = () => {
    return localStorage.getItem("jwt-token");
  };

  const isTokenValid = () => {
    const token = getToken();
    return !!token;
  };

  useEffect(() => {
    const token = getToken();

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setMember_idx(decodedToken.idx);
        setToken(decodedToken);
      } catch (error) {
        console.error("토큰 디코딩 중 오류 발생:", error);
      }
    }
  }, []);

  const fetchReviewList = useCallback(async () => {
    try {
      const token = getToken();

      const response = await axios.get<InfoReviewComponentProps[]>(
        INFO_REVIEW_LIST(store_id),
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = response.data.reverse();
      // console.log("리뷰데이터" + data);

      setInfoReviewList(data);
    } catch (error) {
      console.error("리뷰 정보를 가져오는 중 오류 발생: ", error);
    }
  }, [store_id, setInfoReviewList]);

  const handleSubmit = async () => {
    if (!member_idx) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!isTokenValid()) {
      alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
      return;
    }

    if (reviewRating === 0 || comment.trim() === "") {
      alert("별점과 리뷰를 작성해주세요.");
      return;
    }

    try {
      const token = getToken();
      if (!token) {
        throw new Error("토큰이 없습니다.");
      }
      const decodedToken = jwtDecode(token);
      // console.log("Sending review data:", {
      //   token: decodedToken,
      //   memberIdx: member_idx,
      //   storeId: store_id,
      //   comment: comment,
      //   reviewRating: reviewRating,
      // });
      const response = await axios.post<ReviewResponse>(
        INFO_REVIEW_INPUT(),
        {
          memberIdx: member_idx,
          storeId: store_id,
          comment: comment,
          reviewRating: reviewRating,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // console.log("리뷰가 성공적으로 제출되었습니다.", response.data);

      // 여기서 알림을 표시합니다
      alert("리뷰가 성공적으로 등록되었습니다.");

      setComment("");
      setResetInput(true);
      setReviewSubmitted(true);

      await fetchReviewList();
      fetchAverageRating();
    } catch (error) {
      console.error("리뷰 제출 중 오류 발생:", error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert("인증에 실패했습니다. 다시 로그인해주세요.");
        } else {
          alert("리뷰 제출 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  useEffect(() => {
    if (reviewSubmitted) {
      setReviewRating(0);
      setReviewSubmitted(false);
      setResetInput(false);
      // console.log("초기화됨");
    }
  }, [reviewSubmitted]);

  return (
    <div>
      <InfoReviewStarComponent
        totalStars={5}
        setReviewRating={setReviewRating}
        initialRating={reviewRating}
        reset={reviewSubmitted}
      />
      <div className="flex gap-px10 justify-center hover:cursor-pointer">
        <InfoReviewInput setComment={setComment} reset={resetInput} />
        <InfoSubmitBtn
          clickEvent={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          content="등록"
        />
      </div>
    </div>
  );
};

export default InfoReviewInputBox;
