// window.onload = () => {
//   const launcher = document.querySelector(".launcher");
//   const slideOut = document.querySelectorAll(".launcher span");
//   console.log(slideOut);
//   slideOut.forEach((e) => {
//     e.classList.add("slide-out");
//   });
//   setInterval(() => {
//     launcher.style.opacity = `0`;
//     launcher.style.zIndex = `-1`;
//   }, 1000);
// };

const inp = document.querySelector('input[type="text"]'),
  sub = document.querySelector('input[type="submit"]'),
  currTask = document.querySelector(".current"),
  endedTask = document.querySelector(".ended");
let num = document.querySelectorAll(".num");

// store input value in session storage :

storeInSession();
function storeInSession() {
  inp.oninput = () => {
    sessionStorage.setItem("task", inp.value);
  };
  window.onload = () => {
    inp.value = sessionStorage.getItem("task");
  };
}

// preventdefault of submit & Type number of tasks

sub.onclick = (e) => e.preventDefault();
document.querySelector(".container").onclick = () => {
  num[0].textContent = `(${currTask.childElementCount})`;
  num[1].textContent = `(${endedTask.childElementCount})`;
};

sub.addEventListener("click", () => {
  if (inp.value !== "") {
    createTask();
  } else {
    alert("Please enter a task...")
  }
});

function createTask() {
  let data = {
    id: Date.now(),
    task: inp.value,
    done: false,
  };

  // Create task Element
  let task = document.createElement("div");
  task.className = "task";
  task.id = data.id;
  task.textContent = data.task;
  let del = document.createElement("span");
  del.className = "del";
  del.textContent = `حذف`;
  task.append(del);
  currTask.append(task);
  task.onclick = (e) => {
    if (e.target.className != "del") {
      e.target.classList.toggle("end");
      e.target.classList.contains("end")
        ? endedTask.append(e.target)
        : currTask.append(e.target);
    } else {
      e.target.parentElement.remove();
    }
  };
  inp.value = "";
}
