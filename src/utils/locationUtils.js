// src/utils/locationUtils.js
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("브라우저가 위치 정보를 지원하지 않습니다"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.warn("위치 정보 접근 실패:", error.message);

        // 에러 유형별 구체적인 메시지
        let errorMessage;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "위치 정보 접근 권한이 거부되었습니다.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "위치 정보를 사용할 수 없습니다.";
            break;
          case error.TIMEOUT:
            errorMessage = "위치 정보 요청 시간이 초과되었습니다.";
            break;
          default:
            errorMessage = "위치 정보를 가져오는 중 오류가 발생했습니다.";
        }
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: false, // 배터리 절약을 위해 false
        timeout: 5000, // 5초 시간 제한
        maximumAge: 0, // 캐시된 위치 정보를 사용하지 않음
      }
    );
  });
};
