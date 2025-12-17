import http from "k6/http";
export const options = { vus: 80, duration: "60s" };
export default function () {
  http.get(`${__ENV.TARGET}/waiting?ms=15000`);
}
