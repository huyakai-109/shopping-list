const itemForm = document.getElementById("item-form");
const btnS = document.querySelector(".btn");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

function creatNewItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;
  console.log(newItem);

  //Validate Input
  if (newItem === "") {
    alert("Please add an item");
    return;
  }
  // create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(newItem));

  const button = CreateButton("remove-item btn-link text-red");
  li.appendChild(button);

  itemList.appendChild(li);
  itemInput.value = "";
}

function CreateButton(classes) {
  const btn = document.createElement("button");
  btn.className = classes;

  const icon = CreateIcon("fa-solid fa-xmark");
  btn.appendChild(icon);
  return btn;
}
function CreateIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}
// btnS.addEventListener("click", creatNewItem);
itemForm.addEventListener("submit", creatNewItem);
