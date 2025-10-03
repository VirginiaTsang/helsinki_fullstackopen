import { useState } from 'react'

//defining all, average and positive as components. they can also be as state hooks
const Statistics = (props) => {
  const total = props.good+props.neutral+props.bad
return(
  <>
  <p>all {total}</p>
  <p>average {(props.good-props.bad)/(total)}</p>
  <p>positive {(props.good)/(total)*100} %</p>
  </>
)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feebback</h2>
      <button onClick={()=>setGood(good+1)}>good</button>
      <button onClick={()=>setNeutral(neutral+1)}>neutral</button>
      <button onClick={()=>setBad(bad+1)}>bad</button>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <Statistics good={good} neutral={neutral} bad={bad}/>      
    </div>
  )
}

export default App