/**
 * 대기 시뮬레이션 유틸리티
 * setTimeout 기반 Promise를 반환하여 인위적인 지연 생성
 */

/**
 * 지정된 시간(ms) 동안 대기
 * @param ms - 대기 시간 (밀리초)
 * @returns Promise<void>
 */
export function simulateDelay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Suspense와 함께 사용할 수 있는 리소스 생성
 * React 19의 use() 훅과 함께 사용 가능
 */
export function createDelayResource(ms: number) {
  let status: "pending" | "success" | "error" = "pending";
  let result: void | Error;

  const suspender = simulateDelay(ms).then(
    () => {
      status = "success";
    },
    (error) => {
      status = "error";
      result = error;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      }
      return result;
    },
  };
}
