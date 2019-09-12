import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Anecdote = ({anecdote, votes}) => (
    <div>
        {anecdote}<br />
        has {votes} votes
    </div>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(
        new Array(6).fill(0)
    )

    const incrementVotes = () => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
    }

    return (
        <>
            <h2>Anecdote of the day</h2>
            <Anecdote anecdote={props.anecdotes[selected]} votes={votes[selected]} />
            <button onClick={() => setSelected(Math.floor(Math.random() * 6))}>Next Anecdote</button>
            <button onClick={incrementVotes}>upvote</button>
            <h2>Most popular anecdote</h2>
            <Anecdote anecdote={props.anecdotes[votes.indexOf(Math.max(...votes))]} votes={votes[votes.indexOf(Math.max(...votes))]} />
        </>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
