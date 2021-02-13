'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:32:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2021-01-27T10:17:24.185Z',
    '2021-01-26T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2021-01-24T23:36:17.929Z',
    '2021-01-28T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-IN',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:32:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
Splice
-------------------
let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

console.log(arr.splice(2, 4));
console.log(arr);
*/

/*
ForEach
--------------------
console.log('-------------FOREACH----------------');
movements.forEach(function (movement, index, array) {
  if (movement > 0)
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  else console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
});
*/

/*
Dictionary
-------------
currencies.forEach(function (value, key, dict) {
  console.log(`${key}: ${value}`);
});
*/
/*
const mov = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.22;
const movUsd = mov.map((mov) => mov * eurToUsd);

console.log(mov);
console.log(movUsd);
*/

// Create a Date
/*
const now = new Date();
console.log(now);

console.log(new Date(account1.movementsDates[0]));
*/

const formatMovementDate = (date, locale) => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date1 - date2) / (24 * 60 * 60 * 1000));
  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed == 0) return 'Today';
  if (daysPassed == 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach(function (mov, i) {
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const transaction = mov > 0 ? `deposit` : `withdrawal`;
    const html = `<div class='movements__row'>
      <div class='movements__type movements__type--${transaction}'>${
      i + 1
    } ${transaction}</div>
      <div class='movements__date'>${displayDate}</div>
      <div class='movements__value'>${formattedMov}</div>
    </div>;`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcPrintBalance = (acc) => {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = (account) => {
  const income = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const expenditure = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = formatCur(income, account.locale, account.currency);
  labelSumOut.textContent = formatCur(
    Math.abs(expenditure),
    account.locale,
    account.currency
  );

  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * account.interestRate) / 100)
    .filter((mov) => mov > 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = formatCur(
    interest,
    account.locale,
    account.currency
  );
};

const createUserNames = (accs) =>
  accs.forEach(
    (acc) =>
      (acc.username = acc.owner
        .toLowerCase()
        .split(' ')
        .map((name) => name[0])
        .join(''))
  );

createUserNames(accounts);

let currentAccount, timer;

const updateUI = (user) => {
  displayMovements(user);
  calcPrintBalance(user);
  calcDisplaySummary(user);
};

const startLogOutTimer = () => {
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }
    time--;
  };
  let time = 20;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

// Even Handler
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin == inputLoginPin.value) {
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    containerApp.style.opacity = 100;
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    };
    const locale = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const recieverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.username
  ) {
    recieverAcc.movements.push(amount);
    recieverAcc.movementsDates.push(new Date().toISOString());
    currentAccount.movements.push(-amount);
    inputTransferAmount.blur();
    currentAccount.movementsDates.push(new Date().toISOString());
  } else {
    alert(`User doesn't exist`);
  }
  clearInterval(timer);
  timer = startLogOutTimer();
  updateUI(currentAccount);
  inputTransferTo.value = inputTransferAmount.value = '';
});

btnClose.addEventListener('click', (e) => {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const accountIndex = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );

    accounts.splice(accountIndex, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
  labelWelcome.value = 'Log in to get started';
});

btnLoan.addEventListener('click', (e) => {
  e.preventDefault();
  const loanAmount = +inputLoanAmount.value;
  if (
    loanAmount > 0 &&
    currentAccount.movements.some((deposit) => deposit >= loanAmount * 0.1)
  ) {
    setTimeout(() => {
      currentAccount.movements.push(loanAmount);
      currentAccount.movementsDates.push(new Date().toISOString());
      inputLoanAmount.value = '';
      updateUI(currentAccount);
    }, 2500);
  } else {
    alert('Loan cancelled');
  }
  clearInterval(timer);
  timer = startLogOutTimer();
});

let sorted;
btnSort.addEventListener('click', (e) => {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

labelBalance.addEventListener('click', () => {
  const movementUI = Array.from(
    document.querySelectorAll('.movements__value'),
    (mov) => +mov.textContent.replace('€')
  );
});
