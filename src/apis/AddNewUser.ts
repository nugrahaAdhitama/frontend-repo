import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { getToken } from "@/utils/token";

export const addNewUser = async (user: any) => {
  const { docId, ...userWithoutDocId } = user;
  console.log(userWithoutDocId);
  const router = useRouter();
  const storedToken = getToken();

  try {
    const response = await axios.post(
      "http://localhost:4000/api/create-user-data",
      userWithoutDocId,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );

    if (response.status === 200) {
      Swal.fire("Success!", "Success Add New User", "success");
      window.location.href = "/dashboard";
      return response.data;
    }
  } catch (error) {
    Swal.fire("Error", "Failed to add user", "error");
    // router.reload();
    throw error;
  }
};
