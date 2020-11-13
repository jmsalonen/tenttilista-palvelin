import { Button } from '@material-ui/core'
import { useEffect, useState } from 'react'
import QuestionList from './QuestionList.js'

const ExamList = ({thisExam, id, updateExam, removeExam, usertype}) => {

  const [exam, setExam] = useState(thisExam)

  const handleStudentClick = (questionId, answerId) => {
    console.log('Clicked', questionId, answerId)
    let newData = JSON.parse(JSON.stringify(exam))
    let newQuestion = newData.question[questionId];
    if (newQuestion.type === "radio") 
      newQuestion.answer = newQuestion.answer.map(
        (item, index) => (item = answerId === index ? true : false)
      )
    else
      newQuestion.answer[answerId] = newQuestion.answer[answerId] === false ? true : false
    setExam(newData)
  }

  const handleTeacherClick = (questionId, correctId) => {
    console.log('Clicked', questionId, correctId)
    let newData = JSON.parse(JSON.stringify(exam))
    let newQuestion = newData.question[questionId];
    newQuestion.correct[correctId] = newQuestion.correct[correctId] === false ? true : false
    if (newQuestion.correct.filter(item => item).length < 2)
      newQuestion.type = "radio"
    else
      newQuestion.type = "checkbox"
    setExam(newData)
  }

  const updateTitle = (event, questionId) => {
    let newData = JSON.parse(JSON.stringify(exam))
    newData.question[questionId].title = event.target.value
    setExam(newData)
  }

  const updateoption = (event, questionId, opinionsId) => {
    let newData = JSON.parse(JSON.stringify(exam))
    newData.question[questionId].option[opinionsId] = event.target.value
    setExam(newData)
  }

  const addNewAnswer = (questionId) => {
    let newData = JSON.parse(JSON.stringify(exam))
    newData.question[questionId].option.push("")
    newData.question[questionId].answer.push(false)
    newData.question[questionId].correct.push(false)
    setExam(newData)
  }

  const addNewQuestion = () => {
    let newData = JSON.parse(JSON.stringify(exam))
    newData.question.push({title: "", type: "", option: [], answer: [], correct: []})
    setExam(newData)
  }

  const removeAnswer = (questionId, optionId) => {
    let newData = JSON.parse(JSON.stringify(exam))
    newData.question[questionId].option = newData.question[questionId].option.filter((item, index) => index !== optionId)
    newData.question[questionId].answer = newData.question[questionId].answer.filter((item, index) => index !== optionId)
    newData.question[questionId].correct = newData.question[questionId].correct.filter((item, index) => index !== optionId)
    setExam(newData)
  }

  const removeQuestion = (questionId) => {
    let newData = JSON.parse(JSON.stringify(exam))
    newData.question = newData.question.filter((item, index) => index !== questionId)
    setExam(newData)
  }

  useEffect(() => {
    updateExam(exam, id)
  }, [exam])
  
  return ( 
    <div>
      {exam.question.map((item, index) => 
        <QuestionList 
          id={index} 
          usertype={usertype}
          finished={exam.finished} 
          question={item} 
          handleClick={usertype === "student" ? handleStudentClick : handleTeacherClick}
          handleTitleEvent={updateTitle}
          handleoptionEvent={updateoption}
          addNewAnswer={addNewAnswer}
          removeAnswer={removeAnswer}
          removeQuestion={removeQuestion}
        />
      )}
      {usertype === "teacher" 
        ? <div>
            <Button color="primary" onClick={addNewQuestion}>Uusi Kysymys</Button> 
            <div className="sulkuNappi"><Button color="secondary" onClick={() => removeExam(id)}>Poista Tentti</Button> </div>
          </div>
        : "" }
    </div>
  )
}

export default ExamList
