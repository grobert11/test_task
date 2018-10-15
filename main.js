const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

const INITIAL_STATE = {
  MIN_A: 6,
  MAX_A: 9,
  MIN_SUM: 11,
  MAX_SUM: 14
};
// INITIALISATION

init(INITIAL_STATE);

function init(state) {
  const firstValue = randomNumber(state.MIN_A, state.MAX_A);
  const secondValue = randomNumber(state.MIN_SUM, state.MAX_SUM);
  const container = document.getElementById("container");

  //слушатель на котейнер для валидаций инпутов
  container.addEventListener("keyup", validation);
  initSpans(firstValue, secondValue);

  const firstElement = createArc(firstValue);
  const secondElement = createArc(secondValue, firstElement.x);

  const input_1 = createInput(
    firstElement.radius,
    firstElement.x,
    firstValue,
	 "first",
  );
  const input_2 = createInput(
    secondElement.radius,
    secondElement.x,
    secondValue - firstValue,
    "second"
  );
  input_1.hidden = false;
  

  container.appendChild(input_1);
  container.appendChild(input_2);

  const inputResult = document.createElement("input");
  inputResult.setAttribute('data-value', secondValue);
  inputResult.setAttribute('data-link', 'result');
  inputResult.setAttribute('class', 'lastInput');
  inputResult.hidden = true;
  document
    .getElementById("result")
    .appendChild(inputResult)
}

function validation(event) {
  const target = event.target;
  const linkedElement = document.getElementById(target.dataset.link);
  target.style.color = "black";
  if (target.value !== target.dataset.value) {
    linkedElement.style.background = "yellow";
    target.style.color = "red";
    return 
  }
  linkedElement.style.background = "transparent";
  target.disabled = true;
  showNextStep(target.dataset.link)
}

function showNextStep(name) {
	if(name === 'first') {
		const secondInput = document.querySelector("[data-link='second']");
		secondInput.hidden = false;
		secondInput.focus();
	} else if(name === 'second') {
		const resultInput = document.querySelector("[data-link='result']");
		const firstResultChild = document.getElementById("result").firstChild
		document.getElementById("result").replaceChild(resultInput, firstResultChild)
		resultInput.hidden = false;
		resultInput.focus();
	}
}

/**
 *
 * @param {number} firstValue
 * @param {number} secondValue
 */
function initSpans(firstValue, secondValue) {
	document.getElementById('expression').hidden = false;
  document.getElementById("first").innerHTML = firstValue;
  document.getElementById("second").innerHTML =
    secondValue - firstValue;
  document.getElementById("result").innerHTML = "<span> ? </span>";
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 6 - 115
// 7 - 135
// 8 - 155
// 9 - 175

/**
 *
 * @param {number} inputValue
 * @param {number} startPosition
 * @returns { Object }  x, radius
 */
function createArc(inputValue, startPosition = 0) {
  const x = 20 * inputValue - 5 + startPosition;
  const y = 240;
  const radius = 20 * inputValue - 5 - startPosition;
  const startAngle = 0.9 * Math.PI;
  const endAngle = 2.1 * Math.PI;
  const counterClockwise = false;

  context.beginPath();
  context.arc(x, y, radius, startAngle, endAngle, counterClockwise);
  context.lineWidth = 1;

  // line color
  context.strokeStyle = "red";
  context.stroke();
  return {
    x,
    radius
  };
}

/**
 *
 * @param {number} radius
 * @param {number} position
 * @param {number} value
 */
function createInput(radius, position = 0, value, linkedId) {
  let input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("class", "inputField");
  input.setAttribute("data-link", linkedId);
  input.setAttribute("data-value", value);
  input.hidden = true;
  input.style.bottom = radius - 10 + "px";
  input.style.left = position + 30 + "px";

  return input;
}
