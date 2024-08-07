import axios from "axios";
import { Store } from "./Store";
import { ADMIN_STORE } from "../../../Urls/URLList";

const fetchStores = async (): Promise<Store[]> => {
  const response = await axios.get<Store[]>(ADMIN_STORE());
  return response.data;
};

export default fetchStores;
