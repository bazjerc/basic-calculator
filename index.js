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
    currentOperandElement.textContent = this.currentOperand;
    previousOperandElement.textContent = this.prevOperand;
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
      !this.currentOperand.includes(".") ? (this.currentOperand += ".") : null;
    }

    // Handle operator button click
    if (button.dataset.btnType === "operator") {
      if (this.prevOperand === "") {
        this.prevOperand = this.currentOperand + ` ${value}`;
        this.currentOperand = "0";
      } else if (this.prevOperand !== "") {
        this.prevOperand = this.compute() + ` ${value}`;
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
    let result;
    switch (this.operator) {
      case "+":
        result =
          Number.parseFloat(this.prevOperand) + Number(this.currentOperand);
        break;
      case "-":
        result =
          Number.parseFloat(this.prevOperand) - Number(this.currentOperand);
        break;
      case "*":
        result =
          Number.parseFloat(this.prevOperand) * Number(this.currentOperand);
        break;
      case "÷":
        result =
          Number.parseFloat(this.prevOperand) / Number(this.currentOperand);
        break;
    }
    return String(result);
  }

  reset() {
    this.currentOperand = "0";
    this.prevOperand = "";
    this.operator = "";
  }
}

const calculator = new Calculator();
