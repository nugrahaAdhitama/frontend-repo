import axios from "axios";
import Swal from "sweetalert2";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/register-user",
      {
        username,
        email,
        password,
      }
    );

    if (response.status === 200) {
      Swal.fire("Success!", "You are now registered.", "success");
      return response.data;
    }
  } catch (error) {
    Swal.fire("Error!", "Registration failed.", "error");
    throw error;
  }
};
