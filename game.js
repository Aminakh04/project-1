
  

let questions =[

    {
        question: 'Q1:How many planets are there in the Solar System?',
        answers: [
            { text: '7', correct: false },
            { text: '8', correct: false },
            { text: '9', correct: true },
            { text: '10', correct: false }
          ]
        },
     
        {
            question: 'Q2:What planet is closest to the sun?',
            answers: [
                { text: 'Mars', correct: false },
                { text: 'Mercury', correct: true },
                { text: 'Earth ', correct: false },
                { text: 'Venus', correct: false }
              ]
            },

            {
                question: 'Q3:What is the smallest planet?',
                answers: [
                    { text: 'Earth', correct: false },
                    { text: 'Mercury', correct: false },
                    { text: 'Venus ', correct: false },
                    { text: 'Pluto', correct: true }
                  ]
                },

                {
                    question: 'Q4:What is the rotational period of Earth?',
                    answers: [
                        { text: '1 Year', correct: false },
                        { text: '48 Hours', correct: false },
                        { text: '24 Hours ', correct: true },
                        { text: '12 Hours', correct: false }
                      ]
                    },

                    {
                        question: 'Q5:How long could a long-period comet take to orbit around the Sun?',
                        answers: [
                            { text: '1000 Years', correct: false },
                            { text: '10000 Years', correct: false },
                            { text: '100000 Years ', correct: false },
                            { text: '30 Million Years', correct: true }
                          ]
                        },



];
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}



