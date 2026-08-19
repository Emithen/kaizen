// const
const STORAGE_KEY = "10-today-story";

// DOM 참조
const todayStoryListEl = document.querySelector("#today-story-list");
const todayStoryInputEl = document.querySelector("#today-story-input");
const todayStoryButtonEl = document.querySelector("#today-story-button");

// State
let todayStoryData = [];

// Init
// localStorage 상태 참조
const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY));
// State, View 초기화
todayStoryData = storageData ?? [];
renderTodayStory();

// State -> Storage
function saveTodayStory() {
    const stringData = JSON.stringify(todayStoryData);
    localStorage.setItem(STORAGE_KEY, stringData);
}

// State -> View
function renderTodayStory() {
    // clear
    todayStoryListEl.replaceChildren();
    
    // loop
    for (const item of todayStoryData) {
        // assemble
        const li = document.createElement("li");
        li.textContent = item;

        // place
        todayStoryListEl.appendChild(li);
    }
}

// Handler
function handleTodayStoryButtonClick() {
    // State 갱신
    const inputData = todayStoryInputEl.value;
    todayStoryData.push(inputData);

    // Storage 갱신
    saveTodayStory();

    // View 갱신
    renderTodayStory();

    // 후처리
    todayStoryInputEl.value = "";
}

// Handler 등록
todayStoryButtonEl.addEventListener("click", handleTodayStoryButtonClick);