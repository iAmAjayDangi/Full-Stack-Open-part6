import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const AnecdoteForm = ({dispatch}) => {

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({mutationFn: (newAnecdote) => axios.post('http://localhost:3001/anecdotes', newAnecdote),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['anecdotes']})
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if(content.length < 5){
      dispatch({payload: 'too short anecdote, must have length 5 or more'})
      setTimeout(() => dispatch({payload: ''}),5000)
      return
    }
    newAnecdoteMutation.mutate({content, votes: 0})
    dispatch({payload: `you created '${content}'`})
    setTimeout(() => dispatch({payload: ''}),5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
