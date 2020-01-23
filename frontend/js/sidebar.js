const createForm = document.querySelector("#create-form");
const createFormInput = createForm.querySelector("input");

createForm.addEventListener("submit", e => {
  e.preventDefault();
  const mainBody = {
    name: createForm.name.value
  };
  const content = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(mainBody)
  };
  fetch(LOOPS_URL, content)
    .then(res => res.json())
    .then(e => {
      createLoop(e);
      currentLoop = Loop.all[Loop.all.length - 1];
      updateForm();

      stopLooper();
      startLooper();

      createForm.reset();
      createFormInput.placeholder = "New Beat |";
    })
    .catch(alert);
});

createFormInput.addEventListener("click", e => {
  createFormInput.placeholder = "";
});

loops.addEventListener("click", e => {
  if (e.target.tagName === "P") {
    const li = e.target.closest("li");
    const id = li.dataset.loopId;
    const loop = Loop.find(id);
    currentLoop = loop;
    updateForm();
    resetLooper();
  }
  if (e.target.tagName === "BTN") {
    const li = e.target.closest("li");
    const id = li.dataset.loopId;
    const loop = Loop.find(id);
    li.remove();
    loop.delete();
    if (Loop.all) currentLoop = Loop.all[0];
    updateForm();
    resetLooper();
  }
});

const honker = document.querySelector("#title > img");
const honks = [
  new Audio("frontend/honk/goose_honk_b_01.wav"),
  new Audio("frontend/honk/goose_honk_b_02.wav"),
  new Audio("frontend/honk/goose_honk_b_03.wav"),
  new Audio("frontend/honk/goose_honk_b_05.wav"),
  new Audio("frontend/honk/goose_honk_b_06.wav")
];
honker.addEventListener("click", e => {
  honks[Math.floor(Math.random() * honks.length)].play();

  const span = document.createElement("span");

  span.style = `
    color: white;
    font-size: 0rem;
    position: absolute;
    user-select:none;
    left: 75vw;
    top: 3vw;
    z-index: 1;
    	-webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #00000022;`;
  span.innerText = "honk";
  document.body.append(span);

  let i = 0;
  let size = 0;
  let x = (Math.random() * 6 - 3) * 5;
  if (x < 1 && x > -1) {
    x = 8;
  }
  let y = (Math.random() * 6 - 3) * 5;
  if (y < 5 && y > -5) {
    y = 8;
  }
  let id = setInterval(e => {
    if (i === 20) {
      span.remove();
      return clearInterval(id);
    }
    if (size < 2) {
      size = 0.1 * i;
    } else {
      size = 2;
    }
    span.style.fontSize = size + "rem";
    span.style.top = 4 - (i / 30) * y + "vw";
    span.style.left = 75 - (i / 30) * x + "vw";
    i++;
  }, 10);
});
