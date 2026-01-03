// 로컬 스토리지 키 이름
const STORAGE_KEY = 'ddayCounter';
const LAST_CLICK_KEY = 'lastClickTime';
const INITIAL_DAYS = 125;

// 날짜와 요일을 포맷팅하는 함수
function formatDateWithDay(date) {
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dayOfWeek = days[date.getDay()];

    return `${year}년 ${month}월 ${day}일 ${dayOfWeek}`;
}

// 시간까지 포함한 포맷팅 함수 (날짜와 시간 개행)
function formatDateTimeWithDay(date) {
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dayOfWeek = days[date.getDay()];
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${dayOfWeek}<br>${hours}:${minutes}`;
}

// 페이지 로드 시 저장된 값 불러오기
function loadCounter() {
    const saved = localStorage.getItem(STORAGE_KEY);
    // 저장된 값이 있으면 그 값을, 없으면 125 사용
    return saved !== null ? parseInt(saved) : INITIAL_DAYS;
}

// 카운터 값을 로컬 스토리지에 저장
function saveCounter(value) {
    localStorage.setItem(STORAGE_KEY, value.toString());
}

// 화면에 카운터 값 표시
function updateDisplay(value) {
    document.getElementById('counter').textContent = value;

    // 진행률 계산 및 업데이트
    const progress = ((INITIAL_DAYS - value) / INITIAL_DAYS) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('progressText').textContent = `진행률: ${Math.round(progress)}% (${INITIAL_DAYS - value}/${INITIAL_DAYS}일 완료)`;
}

// 버튼 클릭 시 실행되는 함수
function decreaseDay() {
    let currentValue = loadCounter();

    // 0 이하로 내려가지 않도록 방지
    if (currentValue > 0) {
        currentValue--;
        saveCounter(currentValue);  // 로컬 스토리지에 저장
        updateDisplay(currentValue); // 화면 업데이트

        // 마지막 클릭 시간 저장
        const now = new Date();
        localStorage.setItem(LAST_CLICK_KEY, now.toISOString());
        updateLastClickTime();

        // 완료 시 축하 메시지
        if (currentValue === 0) {
            setTimeout(() => {
                alert('🎉 축하합니다! 모든 강의를 완료하셨습니다!');
            }, 100);
        }
    } else {
        alert('이미 모든 강의를 완료하셨습니다! 🎉');
    }
}

// 오늘 날짜 업데이트
function updateTodayDate() {
    const today = new Date();
    const formattedDate = formatDateWithDay(today);
    document.getElementById('todayDate').textContent = `📅 오늘: ${formattedDate}`;
}

// 마지막 클릭 시간 업데이트
function updateLastClickTime() {
    const lastClick = localStorage.getItem(LAST_CLICK_KEY);
    const lastClickElement = document.getElementById('lastClickTime');

    if (lastClick) {
        const lastClickDate = new Date(lastClick);
        const formattedDateTime = formatDateTimeWithDay(lastClickDate);
        lastClickElement.innerHTML = `⏰ 완료: ${formattedDateTime}`;
    } else {
        lastClickElement.innerHTML = '⏰ 완료: 아직 기록 없음';
    }
}

// 초기화 버튼 클릭 시 실행
function resetCounter() {
    if (confirm('정말 초기화하시겠습니까? 현재 진행 상황이 모두 사라집니다.')) {
        saveCounter(INITIAL_DAYS);
        updateDisplay(INITIAL_DAYS);
        alert('초기화되었습니다!');
    }
}

// 페이지 로드 시 초기화
window.onload = function () {
    const initialValue = loadCounter();
    updateDisplay(initialValue);
    updateTodayDate();
    updateLastClickTime();
};
