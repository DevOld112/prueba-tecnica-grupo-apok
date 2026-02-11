import api from "@/lib/axios";
import { isAxiosError } from "axios";

export const getNodes = async () => {
  try {
    const { data } = await api.get("/");
    console.log(data)
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.error;
      throw new Error(errorMessage);
    }
  }
};
