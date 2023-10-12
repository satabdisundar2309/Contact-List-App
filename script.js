const addBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const resetBtn = document.getElementById("reset-btn");
const recordContainer = document.querySelector(".record-container");
const deleteBtn = document.getElementById("delete-btn");

const Name = document.getElementById("name");
const address = document.getElementById("address");
const number = document.getElementById("contact-num");

let contactArray = [];
let id = 0;

function Contact(id, name, address, number) {
  this.id = id;
  this.name = name;
  this.address = address;
  this.number = number;
}
document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem('contacts') == null){
        contactArray = [];
    } else {
        contactArray = JSON.parse(localStorage.getItem('contacts'));
        lastID(contactArray);
    }
  displayRecord();
});

function displayRecord() {
  contactArray.forEach((element) => {
    addToList(element);
  });
}

addBtn.addEventListener("click", function () {
  if (checkInputFields([Name, address, number])) {
    setMessage("success", "Record added successfully!");
    id++;
    const contact = new Contact(id, Name.value, address.value, number.value);
    contactArray.push(contact);
    addToList(contact);
    // Storing contact record in local storage
    localStorage.setItem("contacts", JSON.stringify(contactArray));
    clearInputFields();
  } else {
    setMessage("error", "Empty input fields or invalid input!");
  }
});
cancelBtn.addEventListener("click", function () {
  clearInputFields();
});

function clearInputFields() {
  Name.value = "";
  address.value = "";
  number.value = "";
}

// calculating last id so that no duplicate id is formed
function lastID(contactArray){
    if(contactArray.length > 0){
        id = contactArray[contactArray.length - 1].id;
    } else {
        id = 0;
    }
}


function addToList(item) {
  const newRecordDiv = document.createElement("div");
  newRecordDiv.classList.add("record-item");
  newRecordDiv.innerHTML = `
    <div class="record-el">
    <span id="labelling">Contact ID: </span>
    <span id="contact-id-content">${item.id}</span>
  </div>

  <div class="record-el">
    <span id="labelling">Name: </span>
    <span id="name-content">${item.name}</span>
  </div>

  <div class="record-el">
    <span id="labelling">Address: </span>
    <span id="address-content">${item.address}</span>
  </div>

  <div class="record-el">
    <span id="labelling">Contact Number: </span>
    <span id="contact-num-content">${item.number}</span>
  </div>

  <button type="button" id="delete-btn">
    <span>
      <i class="fas fa-trash"></i>
    </span>
    Delete
  </button>
    `;
  recordContainer.appendChild(newRecordDiv);
}

// Deletion of contact
recordContainer.addEventListener('click', (event)=>{
    if(event.target.id === 'delete-btn'){
        // removing from DOM
        let recordItem = event.target.parentElement;
        recordContainer.removeChild(recordItem);
        let tempContactList = contactArray.filter((element)=>{
            return (element.id !== parseInt(recordItem.firstElementChild.lastElementChild.textContent));
        });
        contactArray = tempContactList;
        //removing from localstorage by overwriting
        localStorage.setItem('contacts', JSON.stringify(contactArray));
    }
});

resetBtn.addEventListener('click', function(){
    contactArray = [];
    localStorage.setItem('contacts', JSON.stringify(contactArray));
    location.reload();
})
function setMessage(status, message) {
  let messageBox = document.querySelector(".message");
  if (status == "error") {
    messageBox.innerHTML = `${message}`;
    messageBox.classList.add("error");
    removeMessage(status, messageBox);
  }
  if (status == "success") {
    messageBox.innerHTML = `${message}`;
    messageBox.classList.add("success");
    removeMessage(status, messageBox);
  }
}
function removeMessage(status, messageBox) {
  setTimeout(() => {
    messageBox.classList.remove(`${status}`);
  }, 2000);
}
// Input field validation
function checkInputFields(inputArr) {
  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i].value === "") {
      return false;
    }
  }
  if (!phoneNumCheck(inputArr[2].value)) {
    return false;
  }
  return true;
}

// Phone number validation function
function phoneNumCheck(inputtxt) {
  let phoneNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (inputtxt.match(phoneNo)) {
    return true;
  } else {
    return false;
  }
}
