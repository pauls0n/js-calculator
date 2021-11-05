const display = document.querySelector(".display");
const userInput = display.querySelector(".user-input");
const result = display.querySelector(".result");
const numbers = [...document.querySelectorAll(".number")];
const actions = [...document.querySelectorAll(".action")];
const equalTo = document.querySelector(".equal-to");
const point = document.querySelector(".point");
const ac = document.querySelector(".ac");
const c = document.querySelector(".c");



function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}



function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return Math.round((add(+a, +b) + Number.EPSILON) * 100) / 100;
    case "-":
      return Math.round((subtract(+a, +b) + Number.EPSILON) * 100) / 100;
    case "*":
      return Math.round((multiply(+a, +b) + Number.EPSILON) * 100) / 100;
    case "/":
      return Math.round((divide(+a, +b) + Number.EPSILON) * 100) / 100;
  }
}



function populateDisplay(val, overwrite = false) {
  if (overwrite) {
    userInput.textContent = val;
  } else {
    userInput.textContent += val;
  }
}



numbers.forEach((number) => {
  number.addEventListener("click", (e) => populateDisplay(e.target.innerHTML));
  window.addEventListener("keydown", (e) => {
    if (e.key === number.innerHTML) {
      populateDisplay(number.innerHTML);
    }
  });
});



function addPoint(val) {
  if (
    typeof parseInt(
      userInput.textContent.trim().split(" ")[
        userInput.textContent.trim().split(" ").length - 1
      ]
    ) === "number" &&
    !isNaN(
      parseInt(
        userInput.textContent.trim().split(" ")[
          userInput.textContent.trim().split(" ").length - 1
        ]
      )
    ) &&
    userInput.textContent
      .trim()
      .split(" ")
      [userInput.textContent.trim().split(" ").length - 1].indexOf(
        val.innerHTML
      ) === -1
  ) {
    userInput.textContent += val.innerHTML;
  }
}

point.addEventListener("click", (e) => addPoint(e.target));

window.addEventListener("keydown", (e) => {
  if (e.key === point.innerHTML) {
    addPoint(point);
  }
});



function addAction(val) {
  if (userInput.textContent.trim().split(" ").length === 3) {
    populateDisplay(
      operate(
        userInput.textContent.split(" ")[1],
        userInput.textContent.split(" ")[0],
        userInput.textContent.split(" ")[2]
      ),
      true
    );
    populateDisplay(" " + val.innerHTML + " ");
  } else {
    populateDisplay(" " + val.innerHTML + " ");
  }
}

actions.forEach((action) => {
  action.addEventListener("click", (e) => addAction(e.target));
  window.addEventListener("keydown", (e) => {
    if (e.key === action.innerHTML) {
      addAction(action);
    }
  });
});



function showResult() {
  let calculation = operate(
    userInput.textContent.trim().split(" ")[1],
    userInput.textContent.trim().split(" ")[0],
    userInput.textContent.trim().split(" ")[2]
  );
  if (!calculation) {
    alert("Please check your input");
  } else if (calculation === Infinity) {
    alert("Cannot divide by zero");
  } else {
    result.textContent = calculation;
  }
}

equalTo.addEventListener("click", showResult);

window.addEventListener("keydown", (e) => {
  if (e.key === equalTo.innerHTML) {
    showResult();
  }
});



ac.addEventListener("click", () => {
  userInput.textContent = "";
  result.textContent = 0;
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Delete") {
    userInput.textContent = "";
    result.textContent = 0;
  }
});



function clear() {
  userInput.textContent = userInput.textContent
    .split("")
    .slice(0, userInput.textContent.length - 1)
    .join("");
}

c.addEventListener("click", clear);

window.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    clear();
  }
});
