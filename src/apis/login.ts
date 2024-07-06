/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { getToken, setTokenWithExpiration } from "@/utils/token";

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:4000/api/login-user", {
      username,
      password,
    });

    if (response.status === 200) {
      Swal.fire("Success!", "You are now logged in.", "success");
      setTokenWithExpiration(response.data.token, 3600);
      window.location.href = "/dashboard";
      return response.data;
    }
  } catch (error) {
    Swal.fire("Error!", "Login failed.", "error");
    throw error;
  }
};
