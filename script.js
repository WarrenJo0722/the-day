// 로컬 스토리지 키 이름
const STORAGE_KEY = 'ddayCounter';
const INITIAL_DAYS = 125;

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
};
