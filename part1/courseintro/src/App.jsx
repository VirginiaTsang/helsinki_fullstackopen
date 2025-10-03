import { useState } from 'react'

const Button = (props) => {
  return(<button onClick={props.onClick}>{props.text}</button>)
}
const StatisticLine = (props) =>{
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
)
}

const Statistics = (props) => {
  const total = props.good+props.neutral+props.bad
  const average = (props.good-props.bad)/(total)
  const positive = `${(props.good)/(total)*100} %`

 if (total === 0) {
  return (
    <table>
      <tbody>
        <tr>
          <td>No feedback given</td>
        </tr>
      </tbody>
    </table>
  );
}
  else{
    return(
      <table>
        <tbody>
          <StatisticLine text="good" value ={props.good} />
          <StatisticLine text="neutral" value ={props.neutral} />
          <StatisticLine text="bad" value ={props.bad} />
          <StatisticLine text="all" value ={total} />
          <StatisticLine text="average" value ={average} />
          <StatisticLine text="positive" value ={positive} />
        </tbody>
      </table>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h2>give feedback</h2>
      <Button onClick={()=>setGood(good+1)} text="good"/>
      <Button onClick={()=>setNeutral(neutral+1)} text="neutral"/>
      <Button onClick={()=>setBad(bad+1)} text="bad"/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>      
    </>
  )
}

export default App