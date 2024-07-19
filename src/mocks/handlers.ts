import { http, HttpResponse } from "msw";

export const handlers = [
  // 예시: GET 요청을 모킹
  http.get("/api/example", () => {
    return HttpResponse.json({ message: "Mocked response" });
  }),
];
