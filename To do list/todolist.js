const ctinput = document.querySelector("input");
const btn = document.querySelector(".addtask > button");

btn.addEventListener("click", addtasklist);
ctinput.addEventListener("keyup", (event) => {
  event.number === 13 ? addtasklist(e) : null;
});

function addtasklist(e) {
  const notcompl = document.querySelector(".notcomplet");
  const compl = document.querySelector(".complet");

  const newli = document.createElement("li");
  const checkbtn = document.createElement("button");
  const deletbt = document.createElement("button");
  const editbtn = document.createElement("button");

  editbtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
  checkbtn.innerHTML = '<i class="fa fa-check"></i>';
  deletbt.innerHTML = '<i class="fa fa-trash"></i>';
  if (ctinput !== "") {
    newli.textContent = ctinput.value;
    ctinput.value = "";
    notcompl.appendChild(newli);
    newli.appendChild(checkbtn);
    newli.appendChild(deletbt);
    newli.appendChild(editbtn);
  } else {
    newli.textContent = "";
  }

  checkbtn.addEventListener("click", function () {
    const adding = this.parentNode;
    adding.remove();
    compl.appendChild(adding);
    checkbtn.style.display = "none";
  });
  deletbt.addEventListener("click", function () {
    const adding = this.parentNode;
    adding.remove();
  });
  editbtn.addEventListener("click", function () {
    newli.contentEditable = true;
    newli.style.backgroundColor = "#D3D3D3";
  });
}
