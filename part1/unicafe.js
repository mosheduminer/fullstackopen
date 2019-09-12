import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Button = ({ onClick, text }) => (
    <button onClick={onClick}>{text}</button>
)

const Statistic = (props) => {
    if (props.percent) return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value} %</td>
        </tr>
    )
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {
    if (good || neutral || bad) {
        return (
            <>
                <h1>Statistics</h1>
                <table>
                    <Statistic text="good" value={good} />
                    <Statistic text="neutral" value={neutral} />
                    <Statistic text="bad" value={bad} />
                    <Statistic text="total" value={good + neutral + bad} />
                    <Statistic text="average" value={(good - bad) / (good + neutral + bad)} />
                    <Statistic text="positive" value={good / (good + neutral + bad) * 100} percent="true" />
                </table>
            </>
        )
    }
    return (
        <>
            <h1>Statistics</h1>
            <p>No Feedback Submitted Yet!</p>
        </>
    )
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <>
            <h1>Give Feedback</h1>
            <Button text="good" onClick={() => setGood(good + 1)} />
            <Button text="neutral" onClick={() => setNeutral(neutral + 1)} />
            <Button text="bad" onClick={() => setBad(bad + 1)} />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
