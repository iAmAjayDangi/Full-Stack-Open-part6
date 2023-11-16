import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery,useQueryClient, useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useReducer } from 'react'


const notificationReducer = (state, action) => {
  return action.payload
}

const App = () => {

  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get('http://localhost:3001/anecdotes').then(res => res.data),
    retry: 1
  })

  const updateAnecdoteMutation = useMutation({mutationFn: (updatedAnecdote) => axios.put(`http://localhost:3001/anecdotes/${updatedAnecdote.id}`, updatedAnecdote),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    }
  })

  if(result.error){
    return <div>anecdote service not available due to problems in server</div>
  }

  if(result.isLoading){
    return <div>loading data...</div>
  }

  const handleVote = (anecdote) => {
    console.log('vote')
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    updateAnecdoteMutation.mutate(updatedAnecdote)
    notificationDispatch({payload: `you voted '${anecdote.content}'`})
    setTimeout(() => notificationDispatch({payload: ''}),5000)
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification notification={notification} />
      <AnecdoteForm dispatch = {notificationDispatch} />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
