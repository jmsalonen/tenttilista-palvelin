import Checkbox from '@material-ui/core/Checkbox';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import { green } from '@material-ui/core/colors'
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';
import { Button } from '@material-ui/core'

const QuestionList = ({id, usertype, finished, question, handleClick, handleTitleEvent, handleoptionEvent, addNewAnswer, removeAnswer, removeQuestion}) => {
  if (usertype === "teacher")
    return (
      <Card className="kortti">
        <div>
          <div className="sulkuNappi">
            <Button color="secondary" onClick={() => removeQuestion(id)}>×</Button>
          </div>
          <TextField 
            label={`${id+1}. kysymys`} 
            value={question.title}
            style = {{width: '100%'}}
            onChange={(event) => handleTitleEvent(event, id)} 
          />
        </div>
        {question.option.map((item, index) => 
          <div>
            <Checkbox 
              style={{ color: green[500] }}
              id={index}
              name={question.title + id + "correct"} 
              type={question.type}
              checked={question.correct[index]}
              onClick={usertype === "student" ? function() {} 
                                              : () => handleClick(id, index)}
              label="" 
            /> 
            <TextField onChange={(event) => handleoptionEvent(event, id, index)} label={item} style = {{width: '50%'}} />
            <Button color="secondary" onClick={() => removeAnswer(id, index)}>×</Button>
          </div>
        )}
        <Button color="primary" onClick={() => addNewAnswer(id)}>+</Button>
      </Card>
    )
  else // student
    return (
      <Card className="kortti">
        <div>
          {question.title}
          {finished ? (JSON.stringify(question.answer) === JSON.stringify(question.correct) 
                      ? <Button><CheckIcon style={{ color: green[500] }} /></Button> 
                      : <Button><BlockIcon color="secondary"/></Button>) 
                    : "" }
        </div>
        {question.option.map((item, index) => 
          <div>
            <Checkbox
              disabled={finished}
              id={index}
              name={question.title + id} 
              type={question.type}
              checked={question.answer[index]}
              onClick={() => handleClick(id, index)}
              label="Primary"
            /> 
            {finished ? 
              <Checkbox 
                style={{ color: green[500] }}
                id={index}
                name={question.title + id + "correct"} 
                type={question.type}
                checked={question.correct[index]}
                onClick={usertype === "student" ? function() {} 
                                                : () => handleClick(id, index)}
                label="" 
              /> 
            : "" }
            <label>{item}</label>
          </div>
        )}
      </Card>
    )
}

export default QuestionList
