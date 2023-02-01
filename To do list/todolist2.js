const taskinput = document.querySelector(".inputfield input");
filters = document.querySelectorAll(".filters span");
clear = document.querySelector(".clearbtn");
taskbox = document.querySelector(".todolist");
dateshow = document.getElementById("date");
let editid;
const isidedit = false;
const todo = JSON.parse(localStorage.getItem("ToDo"));

// date show
const options = {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
};
const today = new Date();
dateshow.innerHTML = today.toLocaleDateString("en-US", options);

//Modified date and time
const optionsDate = {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
};

const datemodified = document.lastModified;
const lastdate = new Date(datemodified);
const time = lastdate.getHours() + ":" + lastdate.getMinutes();
document.getElementById("result").innerHTML =
  "The document was last time modified on : " +
  lastdate.toLocaleDateString("en-US", optionsDate);
document.getElementById("timeshow").innerHTML = ", " + time;

// drag and drop task
dragtask = document.querySelector(".todolist");
new Sortable(dragtask, {
  animation: 300,
});

//Filters function

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showToDo(btn.id);
  });
});

function showToDo(filter) {
  let list = "";
  if (todo) {
    todo.forEach((todos, id) => {
      let complet = todos.status == "completed" ? "checked" : "";
      if (filter == todos.status || filter == "all") {
        list += ` <li class="task">
      <label for="${id}">
        <input onclick="updatestatus(this)" type="checkbox" id="${id}" ${complet} />
        <p class="${complet}">${todos.name}</p>
      </label>
      <div class="settings">
        <i onclick="showmenu(this)" class="fa-solid fa-bars"></i>
        <ul class="taskmenu">
          <li onclick="edittask(${id},'${todos.name}')"><i class="fa-regular fa-pen-to-square"></i>Edit</li>
          <li onclick="deletetask(${id})"><i class="fa-solid fa-trash-can"></i>Delete</li>
        </ul>
      </div>
    </li>`;
      }
    });
  }
  taskbox.innerHTML = list || `<span> You don't have any task</span>`;
}
showToDo("all");

// Menu edit and delete btn

function showmenu(select) {
  const taskmenu = select.parentElement.lastElementChild;
  taskmenu.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != select)
      taskmenu.classList.remove("show");
  });
}

function edittask(taskId, taskName) {
  editid = taskId;
  isidedit = true;
  taskinput.value = taskName;
}

function deletetask(deleteId) {
  todo.splice(deleteId, 1);
  localStorage.setItem("ToDo", JSON.stringify(todo));
  showToDo("all");
}

clear.addEventListener("click", () => {
  todo.splice(0, todo.length);
  localStorage.setItem("ToDo", JSON.stringify(todo));
  showToDo("all");
});

// Update status and event for add task

function updatestatus(select) {
  const taskname = select.parentElement.lastElementChild;
  if (select.checked) {
    taskname.classList.add("checked");
    todo[select.id].status = "completed";
  } else {
    taskname.classList.remove("checked");
    todo[select.id].status = "pending";
  }
  localStorage.setItem("ToDo", JSON.stringify(todo));
}

taskinput.addEventListener("keyup", (e) => {
  const usertask = taskinput.value.trim();
  if (e.key == "Enter" && usertask) {
    if (!isidedit) {
      if (!todo) {
        todo = [];
      }
      let taskinfo = { name: usertask, status: "pending" };
      todo.push(taskinfo);
    } else {
      isidedit = false;
      todo[editid].name = usertask;
    }

    taskinput.value = "";

    localStorage.setItem("ToDo", JSON.stringify(todo));
    showToDo("all");
  }
});

// share Button

const face = document.querySelector(".facebook");
const twit = document.querySelector(".twitter");
const what = document.querySelector(".whatsapp");
const linke = document.querySelector(".linkedin");
const pin = document.querySelector(".pinterest");

const pageurl = location.href;
const message = "This is my ToDo List";

const whatapi = `https://wa.me/?text=${pageurl}. ${message}`;
const faceapi = `https://www.facebook.com/sharer.php?u=${pageurl}`;
const linkapi = `https://linkedin.com/sharing/share-offsite/?url=${pageurl}`;
const twitterapi = `https://twitter.com/intent/tweet?url=${pageurl}&amp;text=${message}`;
const pinapi = `http://pinterest.com/pin/create/button/?url=${pageurl}&description=${message}`;

face.addEventListener("click", () => {
  window.open((url = faceapi), (target = "blank"));
});

twit.addEventListener("click", () => {
  window.open((url = twitterapi), (target = "blank"));
});

what.addEventListener("click", () => {
  window.open((url = whatapi), (target = "blank"));
});

linke.addEventListener("click", () => {
  window.open((url = linkapi), (target = "blank"));
});

pin.addEventListener("click", () => {
  window.open((url = pinapi), (target = "blank"));
});
