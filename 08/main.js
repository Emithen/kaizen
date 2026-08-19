// 사용할 element 들 식별하기
// ul, input, button

const ul = document.querySelector("#list");
const input = document.querySelector("#input");
const button = document.querySelector("#button");

function handleClick() {
    // 사용자가 input 필드에 입력한 값을 불러온다
    const text = input.value;

    // <li> 객체를 생성한다
    const li = document.createElement("li");

    // 사용자 입력을 li 에 적용한다
    li.textContent = text;

    // <ul> 에 <li> 를 추가한다
    ul.appendChild(li);

    // input 필드의 입력값을 지워서 초기화한다
    input.value = "";
}

button.addEventListener("click", handleClick);