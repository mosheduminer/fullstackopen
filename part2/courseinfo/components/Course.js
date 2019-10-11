import React from 'react'

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

const Content = ({ parts }) => {
    return (
        <>
        {parts.map(part =>
            <Part title={part.name} num={part.exercises} key={part.id} />)}
        </>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((total, part) =>
        total + Number.parseInt(part.exercises), 0)
    return (
        <p>Total number of exercises {total}</p>
    )
}

const Course = ({ course }) => (
    <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </>
)

export default Course;