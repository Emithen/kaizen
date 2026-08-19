// HTML 객체 참조
const todayListEl = document.querySelector("#today-list");
const todayInputEl = document.querySelector("#today-input");
const addBtnEl = document.querySelector("#add-btn");

// State
let todayList = [];

// init
const initData = JSON.parse(localStorage.getItem("09-todayList"));
todayList = initData ?? [];
renderTodayList();

// State -> Storage
function saveTodayList() {
    // refine
    const todayListString = JSON.stringify(todayList);
    
    // save
    localStorage.setItem("09-todayList", todayListString);
}

// State -> View
function renderTodayList() {
    // ul clear
    todayListEl.replaceChildren();

    // State 반영 loop
    for (const item of todayList) {
        // li 생성
        const li = document.createElement("li");

        // data 주입
        li.textContent = item;
        
        // li 삽입
        todayListEl.appendChild(li);
    }
}

// Handler 함수
function handleAddBtnClick() {
    // 입력 데이터 참조
    const input = todayInputEl.value;

    // State 갱신
    todayList.push(input);

    // Storage 반영
    saveTodayList();

    // rerender
    renderTodayList();

    // 입력값 초기화
    todayInputEl.value = "";
}

// Handler 등록
addBtnEl.addEventListener("click", handleAddBtnClick);

/*
    ### 새롭게 등장한 키워드들
    - localStorage.setItem("key", "value");
    - localStorage.getItem("key");
    - JSON.stringify(value);                    // 값 -> 문자열
    - JSON.parse("string");                     // 문자열 -> 값
    - for (const item of someList) { ... }
*/

/*
    ### Use Case 1 : 이번 이야기 목록에 기록 추가
    - View(HTML) / State(Run time JS) / Storage(LocalStorage) 협응 구조
    - entry -> init (load -> state update -> render)
            -> pending... 
            -> input envent -> handle event (state update -> save -> render)
*/