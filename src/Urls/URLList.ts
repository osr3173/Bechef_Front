import { Kit } from "../admin/atom/Kit/Kit";

const DOMAIN = `http://localhost:8080`; // test용 url
const SERVER_URL = `https://bechefback-bda4fddea6hxcpda.koreacentral-01.azurewebsites.net`; // 배포 url
const API_URL = `${SERVER_URL}/api`;
const ADMIN_URL = `${SERVER_URL}/api/admin`;
const INFO_URL = `${SERVER_URL}/api/info`;
const MEMBER_URL = `${SERVER_URL}/bechef/member`;

// ADMIN 페이지
export const ADMIN_UPDATE_QUANTITY = (kit: Kit) =>
  `${ADMIN_URL}/inventory/${kit.store_id}/${kit.menu_id}`;
export const ADMIN_STORE = () => `${API_URL}/stores`;
export const ADMIN_LOAD_STORES = () => `${ADMIN_URL}/stores`;
export const ADMIN_MENU_POST = () => `${ADMIN_URL}/menu`;

export const ADMIN_STORE_SELECTED = (selectedStoreId: number) =>
  `${ADMIN_URL}/inventory/${selectedStoreId}`;
export const ADMIN_MEMBERS = () => `${ADMIN_URL}/members`;
export const ADMIN_MEMBERS_DELETE = (member_idx: number) =>
  `${ADMIN_URL}/members/${member_idx}`;

// INFO 페이지
export const INFO_TIME = (store_id: number) => `${INFO_URL}/time/${store_id}`;
export const INFO_MENU = (store_id: number) =>
  `${INFO_URL}/info_menu/${store_id}`;
export const INFO_GET_FAVORITE = (storeId: number, memberIdx: number) =>
  `${INFO_URL}/favorites/${storeId}/${memberIdx}`;
export const INFO_POST_FAVORITE = () => `${INFO_URL}/favorites`;
export const INFO_PAGE = (store_id: number) =>
  `${INFO_URL}/info_page/${store_id}`;
export const INFO_REVIEW_LIST = (store_id: number) =>
  `${INFO_URL}/info_review/${store_id}`;
export const INFO_REVIEW_INPUT = () => `${INFO_URL}/review_input`;
export const INFO_REVIEW_DELETE = (review_id: number) =>
  `${INFO_URL}/review_delete/${review_id}`;
export const INFO_REVEIW_UPDATE = (reviewId: number) =>
  `${INFO_URL}/review_update/${reviewId}`;
export const INFO_UPDATE_STORE_RATING = (store_id: number) =>
  `${INFO_URL}/upate_store_rating/${store_id}`;
export const INFO_AVERAGE_RATING = (store_id: number) =>
  `${INFO_URL}/average_rating/${store_id}`;

// MAP 페이지
export const MAP_MODAL_FAVORITE = (idx: Number) =>
  `${API_URL}/favorites?memberIdx=${idx}`;
export const MAP_MODAL_REVIEW = (idx: Number) =>
  `${API_URL}/reviews?memberIdx=${idx}`;
export const MAP_DELETE_ACCOUNT = () => `${MEMBER_URL}`;
export const MAP_SEARCH = (query: string) =>
  `${SERVER_URL}/bechef/search?query=${query}`;

// 로그인 회원가입 페이지
export const LOGIN_POST = () => `${MEMBER_URL}/login`;
export const REGISTER_POST = () => `${MEMBER_URL}/register`;
