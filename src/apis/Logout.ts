import Swal from "sweetalert2";
import { NextRouter } from "next/router";
import { getToken } from "@/utils/token";

export const Logout = async () => {
  const storedToken = getToken();
  const router = useRouter();

  try {
    localStorage.removeItem("token");
    Swal.fire("Success", "Logout successful", "success");
    router.push("/auth");
  } catch (error) {
    Swal.fire("Error", "Logout failed", "error");
  }
};
