let allMemo = JSON.parse(localStorage.getItem("allMemo"));
allMemo = allMemo ?? [];

const Editor = toastui.Editor;

const editor = new Editor({
  el: document.querySelector("#editor"),
  height: "600px",
  initialEditType: "markdown",
  previewStyle: "vertical",
});
// editor.getHTML()
// editor.getMarkdown()

render();

function saveNote() {
  const title = document.getElementById("title").value;
  // const content = document.getElementById("content").value;
  const content = editor.getHTML();
  const createdDate = new Date().toLocaleString();

  allMemo.push({ title, content, len: allMemo.length });

  localStorage.setItem("allMemo", JSON.stringify(allMemo));
  render();

  // 입력 버튼을 눌러 목록에 들어가면 사라지게 한다.
  document.getElementById("title").value = "";
  editor.setMarkdown("");
}

// 작성한 메모가 없을 때 뜨는 멘트
if (allMemo.length === 0) {
  display.textContent = "오늘의 메모가 없습니다.";
}

function render() {
  const display = document.getElementById("display");
  display.innerHTML = "";

  // // 최신 게시물이 위로 올라오도록
  // for (let i = allMemo.length; i > 0 ; i--) {
  //     // 아래와 유사 코드
  // }

  for (const item of allMemo) {
    const saveTitle = document.createElement("h2");
    const saveContent = document.createElement("div");
    const saveId = document.createElement("p");
    saveId.textContent = item.len;
    saveId.classList.add("memo-id");
    const deleteMemoBtn = document.createElement("button");

    saveTitle.textContent = item.title;
    saveContent.innerHTML = item.content;
    saveId.textContent = item.len + 1;
    deleteMemoBtn.textContent = "삭제";
    deleteMemoBtn.dataset.id = item.len;
    deleteMemoBtn.addEventListener("click", remove);

    display.appendChild(saveId);
    display.appendChild(saveTitle);
    display.appendChild(saveContent);
    display.appendChild(deleteMemoBtn);

    deleteMemoBtn.addEventListener("click", () => remove(item.len));
  }
}

// 오늘의 날짜 표시
const memoContainer = document.querySelector(".memo-container");
const memoDate = document.createElement("p");

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();

const dateString = `${year}-${month < 10 ? `0${month}` : month}-${
  day < 10 ? `0${day}` : day
}`;

memoDate.textContent = `오늘은? ${dateString}`;
memoContainer.prepend(memoDate);

// 삭제하기
function remove(id) {
  const idx = allMemo.findIndex((item) => item.len == id);
  if (idx > -1) {
    allMemo.splice(idx, 1);
  }
  localStorage.setItem("allMemo", JSON.stringify(allMemo));
  render();
}
