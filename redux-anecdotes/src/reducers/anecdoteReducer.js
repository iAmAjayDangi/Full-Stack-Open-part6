import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdotes(state, action) {
      return state.concat(action.payload).sort((a, b) => a.votes > b.votes ? -1 : 1)
    },
    voteAnecdotes(state, action){
      return state.map(s => s.id === action.payload ? {...s, votes: s.votes + 1} : s).sort((a,b) => a.votes > b.votes ? -1 : 1)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const {createAnecdotes, voteAnecdotes, setAnecdotes} = anecdoteSlice.actions


export const initializeAnecdotes= () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote =  await anecdoteService.createNew(content)
    dispatch(createAnecdotes(newAnecdote))
  }
}

export const updateAnecdotes = (anecdote) => {
  return async dispatch => {
    await anecdoteService.updateAnecdote(anecdote)
    dispatch(voteAnecdotes(anecdote.id))
  }
}

export default anecdoteSlice.reducer