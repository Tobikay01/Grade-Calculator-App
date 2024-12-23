const form = document.getElementById('grade-form');
const outputSection = document.querySelector('.output');
const calculateGradeButton = document.getElementById('calculate-grade');
const resetFormButton = document.getElementById('reset-form');


function getAverage(scores) { 
  let sum = 0;

  for (const score of scores) {
    sum += score;
  }

  return sum / scores.length;
}

function getGrade(score) {
  if (score == 100) {
    return "A++";
  } else if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}

function hasPassingGrade(score) {
  return getGrade(score) !== "F";
}


function generateRandomClassScores() {
  const scores = [];
  for (let i = 0; i < 10; i++) {
    scores.push(Math.floor(Math.random() * 100));
  }
  return scores;
}

function countOtherClassmatesPassOrFail(classScores) {
  let count = 0;
  for (const score of classScores) {
    if (score >= 60) {
      count++;
    }
  }
  return count;
}

function passOrFail(grade) {
  if (grade === "F") {
    return "You failed the course,";
  } else {
    return "You passed the course,";
  }
}

function calculateGrade(e) {
  e.preventDefault();
  const scoreInput = document.getElementById('score').value;
  if (scoreInput === '') {
    alert('Please enter a score');
  } else if (isNaN(scoreInput) || scoreInput < 0 || scoreInput > 100) {
    alert('Please enter a valid number between 0 and 100');
    return;
  } else {
  const classScores = generateRandomClassScores();
  const studentScore = document.getElementById('score').value;
  const grade = getGrade(studentScore);
  
  const output = document.querySelector('.output');
  output.innerHTML = `

  <span class="${grade.toLowerCase()}">
  <h3>Your grade is: ${grade}</h3>
  </span>
  <hr style="width: 100%;">
  <h3>Class average: ${getAverage(classScores)}</h3>
  <p> Classmate scores: ${classScores.join(', ')}</p>
  <p>${passOrFail(grade)} and ${countOtherClassmatesPassOrFail(classScores)} classmates passed the course.</p>
  `;
  output.classList.remove('hide');
}
}

function resetForm() {
  document.getElementById('grade-form').reset();
  const outputSection = document.querySelector('.output');
  outputSection.classList.add('hide');
  
  const inputContainers = document.querySelectorAll('.output');
  inputContainers.forEach(container => {
    container.innerHTML = '';
  });
}

calculateGradeButton.addEventListener('click', calculateGrade);
resetFormButton.addEventListener('click', resetForm);

//console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));

//console.log(studentMsg([56, 23, 89, 42, 75, 11, 68, 34, 91, 19], 100))