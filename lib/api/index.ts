import axios from "axios";
// export const DOMAIN_NAME = "http://localhost:3000";
export const DOMAIN_NAME = "https://parkourdevs-test.vercel.app";

export const baseApi = axios.create({
  baseURL: DOMAIN_NAME + "/api",
});

export const CustomResponse = <T>(body: T, status: number): Response => {
  return new Response(JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
    },
    status,
  });
};
