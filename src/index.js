import "./styles.css";

const onClickAdd = () => {
  // textボックスから値取得、テキストボックス初期化
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  // 未完了のTODOリストに追加する
  createIncompleteList(inputText);
};

// 指定のTODOリストから指定の要素を削除
const deleteFromToDoList = (target, id) => {
  document.getElementById(id).removeChild(target);
};

// 未完了のTODOリストに追加する
const createIncompleteList = (text) => {
  // divタグ生成
  const div = document.createElement("div");
  div.className = "list-row";

  // liタグ生成
  const li = document.createElement("li");
  li.innerText = text;

  // button(完了)タグ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押下された完了ボタンの親タグ(div)を未完了のTODOリストから削除
    deleteFromToDoList(completeButton.parentNode, "incomplete-list");

    // 完了のTODOリストに追加する要素
    const addTarget = completeButton.parentNode;
    // TODOのテキストを取得
    const innerText = addTarget.firstElementChild.innerText;
    // div以下を初期化
    addTarget.textContent = null;

    // liタグ生成
    const li = document.createElement("li");
    li.innerText = innerText;

    // button(戻す)タグ生成
    const moveButton = document.createElement("button");
    moveButton.innerText = "戻す";
    moveButton.addEventListener("click", () => {
      // 押下された戻すボタンの親タグ(div)を削除
      deleteFromToDoList(moveButton.parentNode, "complete-list");

      // 未完了のTODOリストに追加する要素
      const moveTarget = moveButton.parentNode;
      // TODOのテキストを取得
      const moveTargetInnerText = moveTarget.firstElementChild.innerText;
      // 未完了のTODOリストに追加する
      createIncompleteList(moveTargetInnerText);
    });

    // divタグに上記要素追加
    addTarget.appendChild(li);
    addTarget.appendChild(moveButton);

    // 未完了のTODOリストに追加
    document.getElementById("complete-list").appendChild(addTarget);
  });

  // button(削除)タグ生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押下された削除ボタンの親タグ(div)を削除
    deleteFromToDoList(deleteButton.parentNode, "incomplete-list");
  });

  // divタグに上記要素追加
  div.appendChild(li);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // 未完了のTODOリストに追加
  document.getElementById("incomplete-list").appendChild(div);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
