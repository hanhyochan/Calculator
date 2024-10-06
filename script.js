const display_input = document.querySelector("#display_num");
const onoff_btn = document.querySelector(".onoff_btn");

let onoff = true;
let display;
let onoff_event_add = false;

onoff_btn.addEventListener("click", (e) => {
  onoff = !onoff;
  if (onoff) {
    display = "";
    return (display_input.textContent = display);
  } else {
    display = "0";
    display_input.textContent = display;
    let firstOperand = display;
    let operator = null;
    let secondOperand = null;
    let reset = false;

    if (onoff_event_add === false) {
      document.querySelectorAll(".button").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          // 숫자 눌렀을 때
          if (e.target.classList.contains("number")) {
            if (e.target.textContent === "00" && display == "0") {
              display = "0";
            } else {
              click_num(e);
            }
          }

          // 연산 눌렀을 때
          if (e.target.classList.contains("operator")) {
            click_ops(e);
          }

          // 결과 눌렀을 때
          if (e.target.classList.contains("equals")) {
            click_equals();
          }

          // 기능 눌렀을 때
          if (e.target.classList.contains("function")) {
            click_fuc(e);
          }

          // dot 눌렀을 때
          if (e.target.classList.contains("dot")) {
            click_dot();
          }
        });
      });
      onoff_event_add = true;
    }

    // 숫자 눌렀을 때
    const click_num = (e) => {
      if ((display === "0" && display.length === 1) || reset) {
        display = "";
        display += e.target.textContent;
        reset = false;
      } else {
        display += e.target.textContent;
      }
      display_input.textContent = display;
    };

    // 연산 눌렀을 떄
    const click_ops = (e) => {
      firstOperand = display;
      operator = e.target.textContent;
      reset = true;
    };

    // 결과 눌렀을 때
    const click_equals = () => {
      secondOperand = display;
      display = calculate(firstOperand, operator, secondOperand);
      display_input.textContent = display;
      reset = true;
    };

    // 연산 함수
    function calculate(firstOperand, operator, secondOperand) {
      let result;
      firstOperand = Number(firstOperand);
      secondOperand = Number(secondOperand);
      switch (operator) {
        case "%":
          result = firstOperand * (secondOperand / 100);
          break;
        case "/":
          result = firstOperand / secondOperand;
          break;
        case "*":
          result = firstOperand * secondOperand;
          break;
        case "-":
          result = firstOperand - secondOperand;
          break;
        case "+":
          result = firstOperand + secondOperand;
          break;
      }
      if (result.isInteger === true) {
        return Number(result);
      } else {
        return Number(result.toFixed(11));
      }
    }

    // 기능 눌렀을 때
    const click_fuc = (e) => {
      let fuc = e.target.textContent;
      switch (fuc) {
        case "C":
          display = "0";
          break;
        case "±":
          display = String(Number(display) * -1);
          break;
      }
      display_input.textContent = display;
    };

    // dot 눌렀을 때
    const click_dot = () => {
      if (reset) {
        display = "0.";
        reset = false;
      } else if (!display.includes(".")) {
        display += ".";
      }
      display_input.textContent = display;
    };
  }
});
