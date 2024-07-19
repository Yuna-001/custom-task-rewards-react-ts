import "@testing-library/jest-dom";

import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./mocks/server";

// 모든 테스트에 앞서 API 모킹을 하기 위해 수행하는 작업
beforeAll(() => server.listen());

// 테스트 동안 핸들러를 추가했을 경우, 다른 테스트에 영향이 가지 않게 하기 위해
// 테스트 간의 핸들러를 리셋
afterEach(() => server.resetHandlers());

// 모든 테스트가 끝났을 때, 서버를 끔.
afterAll(() => server.close());
