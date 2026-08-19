// const
const STORAGE_KEY = "12-post-data";

// DOM 객체 참조
const postListEl = document.querySelector("#post-list");
const postInputEl = document.querySelector("#post-input");
const postAddButtonEl = document.querySelector("#post-add-button");

// State
let postData = [];

// load
const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY));
postData = storageData ?? [];

// render
renderPostData();

// setter
function updatePostData(newData) {
    postData = newData;
}

// state setter
function setPostState(nextState) {
    updatePostData(nextState);
    savePostData();
    renderPostData();
}

// State -> Storage
function savePostData() {
    const stringData = JSON.stringify(postData);
    localStorage.setItem(STORAGE_KEY, stringData);
}

// State -> View
function renderPostData() {
    // clear
    postListEl.replaceChildren();

    // loop
    postData.forEach((item, index) => {
        // index 가 필요한 이유
        // -> 삭제 버튼의 각 handler 함수가 지정된 요소를 삭제하도록 연결하기 위해서
        
        // span, button, li 구성 및 조립

        const span = document.createElement("span");
        span.textContent = item;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X";

        deleteButton.addEventListener("click", () => {
            // post 상태 갱신
            setPostState(postData.filter((_, idx) => idx !== index));
        });

        const li = document.createElement("li");
        li.appendChild(span);
        li.appendChild(deleteButton);

        postListEl.appendChild(li);
    });
}

// Handler
function handlePostAddButtonClick() {
    // input 참조
    const inputData = postInputEl.value;
    
    // post 상태 갱신
    setPostState([...postData, inputData]);

    // input 상태 원복
    postInputEl.value = "";
}

postAddButtonEl.addEventListener("click", handlePostAddButtonClick);
