import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        pushNotification(state, action) {
            return action.payload
        }
    }
})

export const setNotification = (notification, time) => {
    return async dispatch => {
        dispatch(pushNotification(notification))
        setTimeout(() => {
            dispatch(pushNotification(''))
        }, time)
    }
}

export const { pushNotification } = notificationSlice.actions
export default notificationSlice.reducer