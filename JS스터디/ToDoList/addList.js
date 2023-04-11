/*해당하는 Id를 가진 요소에 접근하기
document.getElementById()*/
const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addButton");
const toDoList = document.getElementById("List");

// 이벤트의 타입에는 click, mouseover, mouseout, wheel 등 다양한 이벤트를 감지합니다.
// listener 함수의 인수에는 이벤트에 대한 정보가 담겨있습니다.
//document.createElement()는 javascript를 통해 동적으로 특정한 이름의 HTML element를 생성하는데 사용됩니다. 이 메소드는 element의 이름을 매개변수로 받아서 해당 노드를 생성합니다.
addBtn.addEventListener("click", function () {
  const list = document.createElement("li");

  //리스트 생성
  // element.appendChild(target);target 요소를 element의 자식으로 위치합니다.
  list.innerText = inputBox.value;
  toDoList.appendChild(list);
  // input 태그 공백으로
  inputBox.value = "";
  //리스트 완료
  list.addEventListener("click", function () {
    list.style.textDecoration = "line-through";
  });
  // 리스트 삭제
  list.addEventListener("dbclick", function () {
    toDoList.removeChild(list);
  });
});
