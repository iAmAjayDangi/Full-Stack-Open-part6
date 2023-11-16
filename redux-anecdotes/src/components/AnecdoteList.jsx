import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    console.log(anecdotes)
    const filter = useSelector(state => state.filter)
    console.log(filter)
    const dispatch = useDispatch()

    const anecdotesList = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))

    const vote = (id) => {
        const anecdote = anecdotes.filter(anecdote => anecdote.id === id)
        console.log(anecdote[0])
        dispatch(updateAnecdotes(anecdote[0]))
        dispatch(setNotification(`you voted '${anecdote[0].content}'`, 5000))
    }

    return (
        <div>
            {anecdotesList.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )

}

export default AnecdoteList