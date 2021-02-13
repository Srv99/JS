'use strict';

/*
const dogsCheck = function (JuliaDogs, KateDogs) {
  const JuliaDogsCorrected = JuliaDogs.slice();
  JuliaDogsCorrected.splice(0, 1);
  JuliaDogsCorrected.splice(-2);
  const dogs = JuliaDogsCorrected.concat(KateDogs);
  dogs.forEach(function (doggy, i) {
    const age =
      doggy >= 3 ? `an adult, and is ${doggy} years old` : 'still a puppy 🐶';
    console.log(`Dog number ${i + 1} is ${age}`);
  });
};

dogsCheck([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

const calcAverageHumanAge = (dogsAges) =>
  dogsAges
    .map((age) => (age > 2 ? 16 + age * 4 : 2 * age))
    .filter((age) => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/

const dogs = [
  {
    weight: 22,
    curFood: 250,
    owners: ['Alice', 'Bob'],
  },
  {
    weight: 8,
    curFood: 200,
    owners: ['Matilda'],
  },
  {
    weight: 13,
    curFood: 275,
    owners: ['Sarah', 'John'],
  },
  {
    weight: 32,
    curFood: 340,
    owners: ['Michael'],
  },
];

// Question 1 Solution
dogs.forEach((dog) => {
  dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28);
});

console.log(dogs);

// Question 2 Solution

const checkSarah = dogs.find((dog) => dog.owners.includes('Sarah'));
console.log(
  `Sarah's dog is eating too ${
    checkSarah.curFood > checkSarah.recommendedFood ? 'much' : 'little'
  }`
);

// Question 3 Solution

const ownersEatTooMuch = dogs
  .filter((dog) => dog.curFood > dog.recommendedFood)
  .map((dog) => dog.owners)
  .flat();
const ownersEatTooLittle = dogs
  .filter((dog) => dog.curFood < dog.recommendedFood)
  .map((dog) => dog.owners)
  .flat();

// Question 4 Solution

console.log(`${ownersEatTooMuch.join(' and ')}'s eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')}'s eat too little`);

// Question 5 Solution
console.log(dogs.some((dog) => dog.curFood === dog.recommendedFood));

// Question 6 Solution
const okayEatingDogs = (dog) =>
  dog.recommendedFood * 0.9 < dog.curFood &&
  dog.curFood < dog.recommendedFood * 1.1;
console.log(dogs.some(okayEatingDogs));

// Question 7 Solution
console.log(dogs.filter(okayEatingDogs));

console.log(dogs);

console.log(dogs.slice().sort((a, b) => a.recommendedFood - b.recommendedFood));
