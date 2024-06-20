import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { CultivationMember } from '../types/types'
import { toast } from 'react-toastify'
import { ENDPOINTS } from '../constants/endpoints'

export const getAllUsers = createAsyncThunk('users/fetchAll', async () => {
    try {
        const response = await axios.get(ENDPOINTS.USERS)
        return response.data
    } catch (error) {
        console.error('Error fetching users:', error)
        throw error
    }
})

export const addUsers = createAsyncThunk<
    CultivationMember[],
    { cultivationId: string; users: CultivationMember[] }
>('users/addUsers', async ({ cultivationId, users }) => {
    const results = await Promise.allSettled(
        users.map((item) =>
            axios
                .post(ENDPOINTS.getCultivationUsers(cultivationId), item)
                .then((response) => ({
                    status: 'fulfilled',
                    value: response.data,
                }))
                .catch((error) => ({ status: 'rejected', value: item, error }))
        )
    )

    const fulfilledResults =
        results
            ?.filter((result) => result.value.status === 'fulfilled')
            ?.map((item) => item?.value?.value)
            ?.filter((item) => !!item) || []

    fulfilledResults.map((item) => {
        toast.success(`"${item.user.name}" added successfully to cultivation`)
    })
    const rejected = results?.filter((item) => item.value.status === 'rejected')
    rejected?.map((item) => {
        toast.error(
            `Error adding "${item.value.value.user.name}" to cultivation`
        )
    })
    return fulfilledResults
})

export const getUsersByCultivation = createAsyncThunk<CultivationMember[], string>(
    'users/getAllUsers',
    async (cultivationId) => {
        try {
            const response = await axios.get(ENDPOINTS.getCultivationUsers(cultivationId))
            return response.data
        } catch (error) {
            console.log('Error fetching users');
            throw error
        }
    }
)

export const removeUser = createAsyncThunk<
    CultivationMember,
    { cultivationId: string; user: CultivationMember }
>('users/removeUser', async ({ cultivationId, user }) => {
    try {
        await axios.delete(ENDPOINTS.getCultivationUser(cultivationId, user.user.id))
        return user
    } catch (error) {
        console.error('Error fetching users:', error)
        throw error
    }
})

export const changeRole = createAsyncThunk<
    CultivationMember,
    {
        cultivationId: string
        role: { id: number; name: string }
        user: CultivationMember
    }
>('users/changeRole', async ({ cultivationId, role, user }) => {
    try {
        const response = await axios.put(ENDPOINTS.getCultivationUser(cultivationId, user.user.id), { role })
        return { ...user, role: response.data?.role }
    } catch (error) {
        console.error('Error fetching users:', error)
        throw error
    }
})

export const getUserRoles = createAsyncThunk('userRoles/fetchAll', async () => {
    const response = await axios.get(ENDPOINTS.CULTIVATION_ROLES)
    return response.data
})
