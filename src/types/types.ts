export interface CultivationItem {
    name: string
    id: string
}
export interface UserRoles {
    id: number
    name: string
    description: string
}

export interface UserRolesState {
    roles: UserRoles[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

export interface User {
    id: number
    name: string
}
export interface CultivationMember {
    user: {
        id: number
        name?: string
    }
    role: {
        id: number
        name?: string
    }
    description?: string
}

export interface CultivationState {
    users: CultivationMember[]
    status: string
}
