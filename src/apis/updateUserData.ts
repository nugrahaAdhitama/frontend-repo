/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { getToken } from "@/utils/token";
import Swal from "sweetalert2";

export const updateUserData = async (userData: any) => {
  const storedToken = getToken();
  console.log(userData);

  try {
    const response = await axios.put(
      `http://localhost:4000/api/update-user-data?id=${userData.docId}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    if (response.status === 200) {
      Swal.fire("Success!", "Succesfully update data.", "success");
      return response.data;
    }
  } catch (error) {
    Swal.fire("Error!", "Failed to update", "error");
    throw error;
  }
};
