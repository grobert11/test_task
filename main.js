const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

const INITIAL_STATE = {
  MIN_A: 6,
  MAX_A: 9,
  MIN_SUM: 11,
  MAX_SUM: 14
};

function init(state) {
  const firstValue = randomNumber(state.MIN_A, state.MAX_A);
  const secondValue = randomNumber(state.MIN_SUM, state.MAX_SUM);

  initSpans(firstValue, secondValue);
  const firstElement = createArc(firstValue);


  createInput(firstElement.radius, firstElement.x)
	  .addEventListener('keyup', (e) => {
		e.target.style.color = 'black';
		if (+e.target.value === firstValue) {	
			e.target.disabled = true
			const secondElement = createArc(secondValue, firstElement.x);
			createInput(secondElement.radius, secondElement.x).addEventListener('keyup', (e) => {
				if(+e.target.value === secondValue - firstValue) {
					e.target.disabled = true;
					document.getElementById('result').innerHTML = '';
					document.getElementById('result').appendChild(document.createElement('input')).addEventListener('keyup', (e) => {
						if (+e.target.value === secondValue) {
							e.target.disabled = true
						}
					})
				}
			});
		} else {
			e.target.style.color = 'red'
		}
		
	});
  
}
init(INITIAL_STATE)

/**
 * 
 * @param {number} firstValue 
 * @param {number} secondValue 
 */
function initSpans (firstValue, secondValue) {
	document.getElementById('first').innerHTML = firstValue + ' + '
	document.getElementById('second').innerHTML = secondValue - firstValue + ' = '
	document.getElementById('result').innerHTML = ' ?'
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
  context.strokeStyle = "black";
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
 * @param {string} id
 */
function createInput(radius, position = 0, id) {
  let container, input;

  input = document.createElement("input");
  input.setAttribute('type', 'number')
  input.setAttribute("class", "inputField");
  if (id) {
    input.setAttribute("id", id);
  }
  input.style.bottom = radius - 10 + "px";
  input.style.left = position + 30 + "px";

  container = document.getElementById("container");
  container.appendChild(input);
  return input
}
