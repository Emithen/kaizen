// env
const STORAGE_KEY = "13-post-data";

// DOM 참조
const postListEl = document.querySelector("#post-list");
const postInputEl = document.querySelector("#post-input");
const addPostButtonEl = document.querySelector("#add-post-button");

// state
let posts = [];

// setter
function setPosts(newPosts) {
    posts = newPosts;
    savePosts();
    renderPosts();
}

// load
const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY));
posts = storageData ?? [];

// render
renderPosts();

// State -> Storage
function savePosts() {
    const stringData = JSON.stringify(posts);
    localStorage.setItem(STORAGE_KEY, stringData);
}

// State -> View
function renderPosts() {
    // TODO : HTML 로 UI 뼈대 생성 -> 데이터 채우기 / 이런 구조 만들어 보기

    // clear
    postListEl.replaceChildren();

    // generate
    posts.forEach((item, index) => {
        // span
        const span = document.createElement("span");
        span.textContent = item;

        // delete button
        const button = document.createElement("button");
        button.textContent = " X ";

        button.addEventListener("click", () => {
            setPosts(posts.filter((_, idx) => idx !== index));
        })

        // li
        const li = document.createElement("li");

        // assemble
        li.appendChild(span);
        li.appendChild(button);

        // place
        postListEl.appendChild(li);
    })
}

// Handler
function handleAddPostButtonClick() {
    const input = postInputEl.value;

    setPosts([...posts, input]);
    
    postInputEl.value = "";
}
addPostButtonEl.addEventListener("click", handleAddPostButtonClick);