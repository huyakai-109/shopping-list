const itemForm = document.getElementById("item-form");
const btnS = document.querySelector(".btn");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.querySelector(".btn-clear");
const itemFilter = document.getElementById("filter");
let isEditMode = false;
const formBtn = itemForm.querySelector("button");

function displayItem() {
  const itemsFromStorage = getItemFromStorage();
  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });
  checkUI();
}

function onCreateNewItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  //Validate Input
  if (newItem === "") {
    alert("Please add an item");
    return;
  }
  // Check for edit mode and exists
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert("That Item already exists");
      return;
    }
  }

  addItemToDOM(newItem);

  addItemToStorage(newItem);

  checkUI();
  itemInput.value = "";
}

function addItemToDOM(item) {
  // create list item
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = CreateButton("remove-item btn-link text-red");
  li.appendChild(button);
  // Add li to DOM
  itemList.appendChild(li);
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

function addItemToStorage(item) {
  const itemsFromStorage = getItemFromStorage();

  // add new item to array
  itemsFromStorage.push(item);

  //Convert to JSON string and set to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    /*Nếu bạn chưa từng lưu trữ giá trị nào với key "items" trong localStorage, có nghĩa là bạn chưa bao giờ gọi localStorage.setItem("items", giá_trị) để đặt giá trị cho key "items".

        Khi bạn gọi localStorage.getItem("items") sau khi chưa từng đặt giá trị cho key "items", kết quả sẽ là null. */
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

// ---------------------------------------------------------------------+
function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function setItemToEdit(item) {
  isEditMode = true;
  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"));
  item.classList.add("edit-mode");
  formBtn.innerHTML = '<i class = "fa-solid fa-pen"></i> Update Item';
  formBtn.style.backgroundColor = "#228B22";
  itemInput.value = item.textContent;
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemFromStorage();
  return itemsFromStorage.includes(item);
}

function removeItem(item) {
  if (confirm("Are you sure?")) {
    // remove item from DOM
    item.remove();

    // remove item from localStorage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemFromStorage();

  // filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // reset to localstorage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  // clear from localStorage
  localStorage.removeItem("items"); // khác với removeItem() ở trên
  checkUI();
}

// Clear UI State
function checkUI() {
  itemInput.value = "";

  const items = itemList.querySelectorAll("li");
  // console.log(items);
  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }

  formBtn.innerHTML = '<i class = "fa-solid fa-pen"></i> Add Item';
  formBtn.style.backgroundColor = "#333";
}

//---------------------------------------------------------------------

function FilterItem(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    // đảm bảo lấy ra nội dụng của phần từ đầu tiên
    if (itemName.indexOf(text) != -1) {
      // console.log(true);
      item.style.display = "flex";
    } else {
      // console.log(false);
      item.style.display = "none";
    }
  });
}

// ---------------------------------------------------------------------
// Initialize app
function init() {
  // Event listener
  // btnS.addEventListener("click", creatNewItem);
  // itemForm.addEventListener("submit", createNewItem);
  itemForm.addEventListener("submit", onCreateNewItem);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", FilterItem);
  document.addEventListener("DOMContentLoaded", displayItem);

  checkUI();
}

init();
