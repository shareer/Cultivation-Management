export const API_BASE_URL =
    'https://14dtv3lu9k.execute-api.eu-central-1.amazonaws.com'

export const ENDPOINTS = {
    USERS: `${API_BASE_URL}/users`,
    CULTIVATIONS: `${API_BASE_URL}/cultivations`,
    CULTIVATION_ROLES: `${API_BASE_URL}/cultivation-roles`,
    getCultivationUsers: (cultivationId: string) =>
        `${API_BASE_URL}/cultivations/${cultivationId}/users`,
    getCultivationUser: (cultivationId: string, userId: number) =>
        `${API_BASE_URL}/cultivations/${cultivationId}/users/${userId}`,
}
