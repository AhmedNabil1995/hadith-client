import axios from "axios";

const API_BASE_URL = "https://hadith-smoky.vercel.app/api";

export const fetchHadiths = async (hadithNo: number) => {
  const response = await axios.get(`${API_BASE_URL}/hadiths`, {
    params: { hadith_no: hadithNo },
  });
  return response.data.hadiths || [];
};
