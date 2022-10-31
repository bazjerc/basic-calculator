"use strict";

// Calculator elements

const currentOperandElement = document.querySelector(
  ".calculator__cur-operand"
);
const previousOperandElement = document.querySelector(
  ".calculator__prev-operand"
);

const calculatorButtons = document.querySelectorAll(".calculator__btn");

// Logic

class Calculator {
  constructor() {
    this.currentOperand = "0";
    this.prevOperand = "";
    this.operator = "";
    this.updateDisplay();

    calculatorButtons.forEach((btn) =>
      btn.addEventListener("click", this.handleButtonClick.bind(this))
    );
  }

  updateDisplay() {
    currentOperandElement.textContent = this.formatDisplayNumber(
      this.currentOperand
    );
    previousOperandElement.textContent = `${this.formatDisplayNumber(
      this.prevOperand
    )} ${this.operator}`;
  }

  // Format display number to show comma separator
  formatDisplayNumber(num) {
    if (num === "Error") return num;

    const integerDigits = parseInt(num.split(".")[0]);
    const decimalDigits = num.split(".")[1];
    let integerDisplay;
    
    if (isNaN(integerDigits)) { // if input is empty
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits !== undefined) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  handleButtonClick(e) {
    const button = e.target;
    const value = button.textContent;

    // Handle number button click
    if (button.dataset.btnType === "number") {
      if (this.currentOperand === "0" && value === "0") {
        return;
      } else if (this.currentOperand === "0" && value !== "0") {
        this.currentOperand = value;
      } else {
        this.currentOperand += value;
      }
    }

    // Handle point button click
    if (button.dataset.btnType === "point") {
      if (this.currentOperand.includes(".")) return;
      this.currentOperand += ".";
    }

    // Handle operator button click
    if (button.dataset.btnType === "operator") {
      if (this.prevOperand === "" && this.currentOperand === "0") {
        return;
      } else if (this.prevOperand === "" && this.currentOperand !== "0") {
        this.prevOperand = String(parseFloat(this.currentOperand));
        this.currentOperand = "0";
      } else if (this.prevOperand !== "" && this.currentOperand !== "0") {
        this.prevOperand = this.compute();
        this.currentOperand = "0";
      }
      this.operator = value;
    }

    // Handle compute button click
    if (button.dataset.btnType === "compute") {
      if (this.prevOperand === "") {
        return;
      } else {
        this.currentOperand = this.compute();
        this.prevOperand = "";
        this.operator = "";
      }
    }

    // Handle delete button click
    if (button.dataset.btnType === "del") {
      if (this.currentOperand === "0") {
        return;
      } else if (this.currentOperand.length === 1) {
        this.currentOperand = "0";
      } else {
        this.currentOperand = this.currentOperand.slice(0, -1);
      }
    }

    // Handle all-clear button click
    if (button.dataset.btnType === "ac") {
      this.reset();
    }

    this.updateDisplay();
  }

  compute() {
    const prev = parseFloat(this.prevOperand);
    const current = parseFloat(this.currentOperand);
    let result;
    switch (this.operator) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "*":
        result = prev * current;
        break;
      case "÷":
        if (current === 0) {
          result = "Error";
          this.disable();
        } else {
          result = prev / current;
        }
        break;
    }
    return String(result);
  }

  disable() {
    calculatorButtons.forEach(
      (btn) =>
        btn.dataset.btnType !== "ac" && btn.setAttribute("disabled", true)
    );
  }

  reset() {
    this.currentOperand = "0";
    this.prevOperand = "";
    this.operator = "";
    calculatorButtons.forEach((btn) => btn.removeAttribute("disabled"));
  }
}

const calculator = new Calculator();
