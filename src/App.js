import './App.css'
import { useEffect, useState } from 'react'
import { Button, Tab, TextField } from '@material-ui/core'
import axios from 'axios'

import Header from './Header.js'
import ExamList from './ExamList.js'

const App = () => {
  
  const [data, setData] = useState()
  const [examName, setExamName] = useState("")

  useEffect(() => {
    axios
      .get("http://localhost:3001/database")
      .then(response => {
        setData(response.data)
      })
  }, [])

  useEffect(() => {
    const updateData = async () => {
      try {
        let result = await axios.put("http://localhost:3001/database", data)
      }
      catch (exception) {
        console.log("database update failed")
      }
    }

    if (data !== undefined)
      updateData()
  }, [data])

  const updateSelected = (selected) => {
    let newData = JSON.parse(JSON.stringify(data))
    newData.selected = selected
    setData(newData)
  }

  const updateUsertype = () => {
    let newData = JSON.parse(JSON.stringify(data)); 
    newData.usertype = newData.usertype === "student" ? "teacher" : "student"
    console.log(newData.usertype)
    setData(newData)
  }
  
  const updateExam = (exam, index) => {
    let newData = JSON.parse(JSON.stringify(data))
    newData.exam[index] = exam
    setData(newData)
  }

  const handleButton = (exam, index) => {
    exam.finished = true
    updateExam(exam, index)
  }

  const addNewExam = () => {
    let newData = JSON.parse(JSON.stringify(data))
    newData.exam.push({title: "", finished: false, question: []})
    newData.selected = newData.exam.length - 1
    setData(newData)
  }

  const removeExam = (examId) => {
    let newData = JSON.parse(JSON.stringify(data))
    newData.exam = newData.exam.filter((item, index) => index !== examId)
    if (newData.exam.length < 1)
      newData.exam.push({title: "", finished: false, question: []})
    setData(newData)
  }

  const updateExamName = () => {
    let newData = JSON.parse(JSON.stringify(data))
    let lastItem = newData.exam.length - 1;
    newData.exam[lastItem].title = examName
    setData(newData)
    setExamName("")
  }
  
  if (data === undefined)
    return (<>loading</>)

  if (data.usertype === "teacher")
    return (
      <div>
        <Header updateUsertype={updateUsertype}/>
        <div className="Tenttilista">
          {data.exam.map((item, index) => 
            <Button color="primary" onClick={() => (updateSelected(index))}>
              {item.title}
            </Button>
          )}
          {data.exam[data.exam.length-1].title.length > 1 ? <Button color="primary" onClick={addNewExam}>+</Button> : "" }
          {data.exam.map((item, index) => item.title.length < 1 
          ? <div>
              <br />
              <Tab /><TextField label={"Anna Tentille Nimi"} onChange={(e) => setExamName(e.target.value)}/>
              <br /><br />
              <Tab /><Button variant="contained" color="primary" onClick={updateExamName}>OK</Button>
            </div>
          : (index === data.selected 
              ? <ExamList
                  id={index}
                  usertype={data.usertype}
                  thisExam={item}
                  updateExam={updateExam}
                  removeExam={removeExam}
                />
              : "")
            )}
        </div>
      </div>
    )
  else // student
    return (
      <div>
        <Header updateUsertype={updateUsertype}/>
        <div className="Tenttilista">
          {data.exam.map((item, index) => 
            <Button color="primary" onClick={() => (updateSelected(index))}>
              {item.title}
            </Button>
          )}
          {data.exam.map((item, index) => 
            (index === data.selected 
              ? <div>
                <ExamList
                  id={index}
                  usertype={data.usertype}
                  thisExam={item}
                  updateExam={updateExam}
                  removeExam={removeExam}
                />
                <Button variant="contained" color="primary" onClick={() => handleButton(item, index)}>Valmis</Button>
              </div>
              : "")
            )}
        </div>
      </div>
    )
}

export default App
