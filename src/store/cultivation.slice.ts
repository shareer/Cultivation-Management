import { createSlice } from '@reduxjs/toolkit'
import {
    addUsers,
    changeRole,
    getUsersByCultivation,
    removeUser,
} from '../services/UserService'
import { CultivationState } from '../types/types'

const initialState: CultivationState = {
    users: [],
    status: '',
}

export const cultivationSlice = createSlice({
    name: 'cultivations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsersByCultivation.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getUsersByCultivation.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.users = action.payload
            })
            .addCase(getUsersByCultivation.rejected, (state) => {
                state.status = 'failed'
            })

            .addCase(addUsers.fulfilled, (state, action) => {
                state.users = action.payload.concat(state.users)
            })
            .addCase(removeUser.fulfilled, (state, action) => {
                state.users = state.users.filter(
                    (user) => user.user.id !== action.payload.user.id
                )
            })
            .addCase(changeRole.fulfilled, (state, action) => {
                const index = state.users.findIndex(
                    (user) => user.user.id === action.payload.user.id
                )
                if (index !== -1) {
                    state.users[index] = action.payload
                }
            })
    },
})

export const actions = cultivationSlice.actions
export default cultivationSlice.reducer
