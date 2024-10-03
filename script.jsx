const btns = document.querySelectorAll("button");
const num_btns = document.querySelectorAll(".number");
const fuc_btns = document.querySelectorAll(".function");
const dot_btn = document.querySelector(".dot");
const operator_btns = document.querySelectorAll(".operator");
const equals_btn = document.querySelector(".equals");
const display_num = document.getElementById("display_num");

let output_num = [0];
let firstOperand = "";
let operator = "";
let secondOperand = "";
let operatorChecked = false;

display_num.textContent = output_num.join('');

// 숫자 버튼
num_btns.forEach((x) => {
  x.addEventListener("click", function (e) {
    if ((output_num[0] === 0 && output_num.length === 1) || operatorChecked) {
      output_num = []
      output_num[0] = e.target.textContent;
      operatorChecked = false;
    } else {
      output_num.push(e.target.textContent);
    }
    display_num.textContent = output_num.join('');
  });
});

// 기능 버튼
fuc_btns.forEach((x) => {
  x.addEventListener("click", function (e) {
    if (e.target.textContent === "C") {
      output_num.splice(0, output_num.length);
      output_num.push(0);
      display_num.textContent = output_num.join('');
    }

    if (e.target.textContent === "±") {
      output_num = String(Number(output_num.join('')) * -1).split('')
      // console.log(output_num)
      display_num.textContent = output_num.join('');
    }

    if (e.target.textContent === "%") {
      output_num = String(Number(output_num.join('')) * 0.01).split('')
      // console.log(output_num)
      display_num.textContent = output_num.join('');
    }
  });
});

// 연산 버튼
operator_btns.forEach((x) => {
  x.addEventListener("click", function (e) {
    firstOperand = output_num.join('');
    operator = e.target.textContent;
    console.log(`first Operand: ${firstOperand}, Operator: ${operator}`);
    
    operatorChecked = true; 
    display_num.textContent = output_num.join('');
  });
});

// 점 버튼
dot_btn.addEventListener("click", () => {
  if (output_num[output_num.length - 1] !== "." && !output_num.includes(".")) {
    output_num.push(dot_btn.textContent);
  }
  display_num.textContent = output_num.join('');
});

// 계산 함수
function calculate(firstOperand, operator, secondOperand) {
  let result;
  firstOperand = parseFloat(firstOperand);
  secondOperand = parseFloat(secondOperand);
  console.log(firstOperand)
  console.log(secondOperand)

  switch (operator) {
    case '+':
      result = firstOperand + secondOperand;
      break;
    case '-':
      result = firstOperand - secondOperand;
      break;
    case '*':
      result = firstOperand * secondOperand;
      break;
    case '/':
      result = secondOperand !== 0 ? firstOperand / secondOperand : "0으로 나눌 수 없습니다.";
      break;
    default:
      result = "지원하지 않는 연산자입니다.";
  }

  return result;
}

// = 버튼
equals_btn.addEventListener("click", function () {
  secondOperand = output_num.join('');
  console.log(`second Operand: ${secondOperand}`);

  if (firstOperand !== "" && operator !== "" && secondOperand !== "") {
    const result = calculate(firstOperand, operator, secondOperand);
    output_num = [result];
    display_num.textContent = output_num.join('');
  }
});
