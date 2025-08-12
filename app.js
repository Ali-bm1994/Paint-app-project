const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const brushWidth = document.querySelector("#brush-width");
const brushColor = document.querySelector("#color-picker");
const brush = document.querySelector(".brush");
const ereser = document.querySelector(".eraser");
const saveBtn = document.querySelector(".save");
const clearBtn = document.querySelector(".clear");

let isDrawing = false;
let currentWith = 5;
let currentColor = "";

window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});

function statDraw() {
  isDrawing = true;
  ctx.beginPath();
  ctx.lineWidth = currentWith;
}

function drawing(e) {
  if (!isDrawing) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = `${currentColor}`;
  ctx.stroke();
}
function endDraw() {
  isDrawing = false;
}
canvas.addEventListener("mousedown", statDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", endDraw);
brushWidth.addEventListener("change", () => {
  currentWith = brushWidth.value;
});
brushColor.addEventListener("change", () => {
  currentColor = brushColor.value;
});
ereser.addEventListener("click", () => {
  ereser.classList.add("active");
  brush.classList.remove("active");
  currentColor = "white";
});
brush.addEventListener("click", () => {
  brush.classList.add("active");
  ereser.classList.remove("active");
  currentColor = brushColor.value;
});
clearBtn.addEventListener("click", () => {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
});
saveBtn.addEventListener("click", () => {
  let link = document.createElement("a");
  link.download = `${Date.now()}.gpj`;
  link.href = canvas.toDataURL();
  link.click();
});
