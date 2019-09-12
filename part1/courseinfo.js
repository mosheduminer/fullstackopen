import React from 'react';
import ReactDOM from 'react-dom';


const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.title} {props.num}
        </p>
    )
}

const Content = (props) => {
    return (
        <>
            <Part title={props.parts[0].name} num={props.parts[0].exercises} />
            <Part title={props.parts[1].name} num={props.parts[1].exercises} />
            <Part title={props.parts[2].name} num={props.parts[2].exercises} />
        </>
    )
}

const Total = (props) => {
    return (
        <p>Total number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    )
}


const App = () => {
    const course = {
        name: "Half stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10
            },
            {
                name: "Using props to pass data",
                exercises: 7
            },
            {
                name: "State of a component",
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

