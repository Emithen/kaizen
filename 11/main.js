// CONST
const STORAGE_KEY = "11-post-data";

// DOM 참조
const postListEl = document.querySelector("#post-list");
const postInputEl = document.querySelector("#post-input");
const postAddButtonEl = document.querySelector("#post-add-button");

// State
let postData = [];
function updatePostData(newData) { postData = newData; }
function removePostData(index) { postData.splice(index, 1); }
// Storage 참조
const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
// State 에 반영
updatePostData(storageData);
// rerender
renderPostData();

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
        // span
        const span = document.createElement("span");
        span.textContent = item;

        // delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "삭제"

        deleteButton.addEventListener("click", () => {
            removePostData(index);
            savePostData();
            renderPostData();
        })

        // li
        const li = document.createElement("li");
        li.appendChild(span);
        li.appendChild(deleteButton);

        // place
        postListEl.appendChild(li);
    });
}

// Handler
function handlePostAddButtonClick() {
    // Input 참조
    const inputData = postInputEl.value;
    
    // State 갱신
    let newData = postData;
    newData.push(inputData);
    updatePostData(newData);

    // Save & Render
    savePostData();
    renderPostData();

    // 후처리
    postInputEl.value = "";
}

postAddButtonEl.addEventListener("click", handlePostAddButtonClick);