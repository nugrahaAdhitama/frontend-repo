import axios from "axios";
import { getToken } from "@/utils/token";

export const fetchUserData = async () => {
  const storedToken = getToken();
  if (!storedToken) {
    throw new Error("Token not found");
  }
  const response = await axios.get(
    "http://localhost:4000/api/fetch-user-data",
    {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    }
  );
  return response.data;
};
