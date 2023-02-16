const laptopsElement = document.getElementById("laptopModel");
const priceElement = document.getElementById("price");
const quantityElement = document.getElementById("quantity");
const buyButtonElement = document.getElementById("buyButton");
const addButtonElement = document.getElementById("add");
const addToListElement = document.getElementById("addToList");
const balanceElement = document.getElementById("balance");
const specsElement = document.getElementById("specs");
const getLoanElement = document.getElementById("getLoan");
const transferMoneyElement = document.getElementById("transferMoney");
const description = document.getElementById("description");
const image = document.getElementById("image");
const payElement = document.getElementById("pay");

let images = [];
let laptops = [];
let work = [];
let balance = 0.0;
let pay = 0.0;
//get information about items, specs, prices from JSON file
fetch("https://hickory-quilled-actress.glitch.me/computers")
  .then((response) => response.json())
  .then((data) => (laptops = data))
  .then((laptops) => addLaptopsToMenu(laptops));

const addLaptopsToMenu = (laptops) => {
  laptops.forEach((x) => addLaptopToMenu(x));
  priceElement.innerText = laptops[0].price;
  specsElement.innerText = laptops[0].specs;
  description.innerText = laptops[0].description;
  image.innerText = laptops[0].image;
};

//function to display items and specs
const addLaptopToMenu = (laptop) => {
  const laptopElement = document.createElement("option");
  laptopElement.value = laptop.id;
  laptopElement.appendChild(document.createTextNode(laptop.title));
  specsElement.appendChild(document.createTextNode(laptop.specs));
  description.appendChild(document.createTextNode(laptop.description));
  image.appendChild(document.createTextNode(laptop.image));
  laptopsElement.appendChild(laptopElement);
};

const handleLaptopMenuChange = (e) => {
  const selectedLaptop = laptops[e.target.selectedIndex];
  priceElement.innerText = selectedLaptop.price;
  specsElement.innerText = selectedLaptop.specs;
  description.innerText = selectedLaptop.description;
  image.src =
    "https://hickory-quilled-actress.glitch.me/" + selectedLaptop.image;
};

//create a function add items to basket and shows total payment request
const handleBuyLaptop = () => {
  const selectedLaptop = laptops[laptopsElement.selectedIndex];
  const quantity = parseInt(quantityElement.value);
  const laptopItem = document.createElement("li");
  const lineTotal = quantity * selectedLaptop.price;

  laptopItem.innerText = `${selectedLaptop.title}    
    ${new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(selectedLaptop.price)}   ${quantity}     ${new Intl.NumberFormat(
    "de-DE",
    { style: "currency", currency: "EUR" }
  ).format(lineTotal)}`;
  addToListElement.appendChild(laptopItem);

  balance += lineTotal;
  balanceElement.innerHTML = `Total amount: ${new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(balance)}`;
};
//make a payment for items in the basket
const handlePayItems = () => {
  const totalPaid = bankBalance;
  const change = parseFloat(totalPaid) - balance;
  if (balance <= bankBalance) {
    alert(
      `Congratulations! You just bought a laptop! Total change due: ${new Intl.NumberFormat(
        "de-DE",
        {
          style: "currency",
          currency: "EUR",
        }
      ).format(change)}`
    );
    c;
  } else {
    alert(
      `Your Bank account has insufficient money. You need extra ${new Intl.NumberFormat(
        "de-DE",
        {
          style: "currency",
          currency: "EUR",
        }
      ).format(change)}, you can get a loan if you don't have any.`
    );
  }
};

laptopsElement.addEventListener("change", handleLaptopMenuChange);
addButtonElement.addEventListener("click", handleBuyLaptop);
buyButtonElement.addEventListener("click", handlePayItems);

const bankBalanceElement = document.getElementById("bankBalance");
const remainingLoanElement = document.getElementById("remainingLoan");
let loanBalance = 0;
let bankBalance = 0;

//show bank account balance
bankBalanceElement.innerHTML = `Overview: ${new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
}).format(bankBalance)}`;

//creates a function that checks conditions for getting a loan
const handleGetALoan = () => {
  const loanAmount = prompt("Enter loan amount: ");

  if (loanAmount < 0) {
    alert(`Please enter an amount greater than zero`);
  }
  if (loanBalance > 0) {
    alert(`You have already a loan, you need to repay first`);
    return;
  }
  if (loanAmount > bankBalance * 2) {
    alert(
      `You need more money in your bank account. Minimum bank account balance is 50% of your requested loan `
    );
  } else if (loanAmount !== null && loanAmount <= bankBalance * 2) {
    loanBalance += parseInt(loanAmount);
    remainingLoanElement.innerHTML = `Remaining loan: ${new Intl.NumberFormat(
      "de-DE",
      { style: "currency", currency: "EUR" }
    ).format(loanBalance)}`;
    const workDiv = document.getElementById("work");
    const repayLoanButton = document.createElement("button");
    const t = document.createTextNode("Repay Loan");
    repayLoanButton.appendChild(t);
    workDiv.appendChild(repayLoanButton);
    repayLoanButton.addEventListener("click", repayLoan);
  }
};

getLoanElement.addEventListener("click", handleGetALoan);

let workMoneyBalance = 0;
const workMoneyElement = document.getElementById("workMoney");

payElement.innerHTML = `Pay: ${new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
}).format(workMoneyBalance)}`;

//create a function that pays a salary by clicking a button
const paySalary = () => {
  workMoneyBalance += 100;
  payElement.innerHTML = `Overview: ${new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(workMoneyBalance)}`;
};
workMoneyElement.addEventListener("click", paySalary);

// create a function that transfers the money to the bank account, checks if there is a loan to repay on 10% of the salary
const transferToBank = function () {
  if (loanBalance <= 0) {
    let transferAmount = workMoneyBalance;
    bankBalance += transferAmount;
    workMoneyBalance = 0;
    bankBalanceElement.innerHTML = `Overview: ${new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(bankBalance)}`;
    payElement.innerHTML = `Pay: ${new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(workMoneyBalance)}`;
  }
  if (loanBalance > 0) {
    let transferAmountWithPayBack = workMoneyBalance - workMoneyBalance * 0.1;
    bankBalance += transferAmountWithPayBack;
    loanBalance -= workMoneyBalance * 0.1;
    workMoneyBalance = 0;
    bankBalanceElement.innerHTML = `Overview: ${new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(bankBalance)}`;
    payElement.innerHTML = `Pay: ${new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(workMoneyBalance)}`;
    remainingLoanElement.innerHTML = `Remaining loan: ${new Intl.NumberFormat(
      "de-DE",
      { style: "currency", currency: "EUR" }
    ).format(loanBalance)}`;
  }
};
transferMoneyElement.addEventListener("click", transferToBank);

//--********************SOLUTION 1***********************--
const repayLoan = function () {
  if (loanBalance >= workMoneyBalance) {
    let payBackLoan = workMoneyBalance;
    loanBalance -= payBackLoan;
    workMoneyBalance = 0;
    payElement.innerHTML = `Pay: ${new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(workMoneyBalance)}`;
    remainingLoanElement.innerHTML = `Remaining loan: ${new Intl.NumberFormat(
      "de-DE",
      { style: "currency", currency: "EUR" }
    ).format(loanBalance)}`;
  }
  if (loanBalance < workMoneyBalance) {
    let payBackFullAmountOfLoan = workMoneyBalance;
    let restOfLoan = payBackFullAmountOfLoan - loanBalance;
    loanBalance -= restOfLoan;
    bankBalance += restOfLoan;
    workMoneyBalance = 0;
    bankBalanceElement.innerHTML = `Overview: ${new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(bankBalance)}`;
    payElement.innerHTML = `Pay: ${new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(workMoneyBalance)}`;
    remainingLoanElement.innerHTML = `Remaining loan: ${new Intl.NumberFormat(
      "de-DE",
      { style: "currency", currency: "EUR" }
    ).format(loanBalance)}`;
  }
};

//--********************SOLUTION 2***********************--
// const repayLoan = () => {
//   if (workMoneyBalance >= loanBalance) {
//     loanBalance = 0;
//     workMoneyBalance -= loanBalance;
//   } else {
//     loanBalance -= workMoneyBalance;
//     workMoneyBalance = 0;
//   }
//   bankBalance += workMoneyBalance;
// };
// repayLoanButton.addEventListener("click", function () {
//   // Call the repayLoan function to update the loan balance and bank balance
//   repayLoan;
//   // Display the updated loan and bank balances on the page
//   bankBalanceElement.innerHTML = `Overview: ${new Intl.NumberFormat("de-DE", {
//     style: "currency",
//     currency: "EUR",
//   }).format(bankBalance)}`;
//   remainingLoanElement.innerHTML = `Remaining loan: ${new Intl.NumberFormat(
//     "de-DE",
//     { style: "currency", currency: "EUR" }
//   ).format(loanBalance)}`;
//   // Set the work money balance to 0 and update the display
//   workMoneyBalance = 0;
//   remainingLoanElement.innerHTML = `Remaining loan: ${new Intl.NumberFormat(
//     "de-DE",
//     { style: "currency", currency: "EUR" }
//   ).format(loanBalance)}`;
// });

//--************************SOlUTION 3*******************--
// //create a function to repay the loan full by pressing a button, any remaining adds to bank account
// function repayLoan(workMoneyBalance, loanBalance, bankBalance) {
//   // Check if the work money balance is greater than or equal to the loan balance
//   if (workMoneyBalance >= loanBalance) {
//     // Apply the full work money balance towards the loan
//     loanBalance = 0;
//     workMoneyBalance -= loanBalance;
//   } else {
//     // Apply as much of the work money balance as possible towards the loan
//     loanBalance -= workMoneyBalance;
//     workMoneyBalance = 0;
//   }
//   // Transfer any remaining work money balance to the bank
//   bankBalance += workMoneyBalance;

//   return { loanBalance, bankBalance };
// }
// // Add an event listener to the button to handle clicks
// repayButton.addEventListener("click", function () {
//   // Call the repayLoan function to update the loan balance and bank balance
//   const { newLoanBalance, newBankBalance } = repayLoan(
//     workMoneyBalance,
//     loanBalance,
//     bankBalance
//   );
//   // Display the updated loan and bank balances on the page
//   bankBalanceElement.innerHTML = `Overview: ${new Intl.NumberFormat("de-DE", {
//     style: "currency",
//     currency: "EUR",
//   }).format(bankBalance)}`;
//   remainingLoanElement.innerHTML = `Remaining loan: ${new Intl.NumberFormat(
//     "de-DE",
//     { style: "currency", currency: "EUR" }
//   ).format(loanBalance)}`;
//   // Set the work money balance to 0 and update the display
//   workMoneyBalance = 0;
//   remainingLoanElement.innerHTML = `Remaining loan: ${new Intl.NumberFormat(
//     "de-DE",
//     { style: "currency", currency: "EUR" }
//   ).format(loanBalance)}`;
// });
