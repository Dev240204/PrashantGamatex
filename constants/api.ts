export const inProduction = process.env.NODE_ENV === "production";

// export const API_URL = inProduction
//   ? "https://prashantgroup.com"
//   : process.env.EXPO_PUBLIC_API_URL;

// export const API_URL = "http://192.168.88.68:3000";
// export const API_URL = "https://pgplcrm.prasadsos.co:8091";
export const API_URL =
  "https://ca52-2409-40c1-45-7e75-798e-84c5-a9cd-4017.ngrok-free.app";

console.log("API_URL", API_URL);
