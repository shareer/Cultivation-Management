import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { addUsers, getAllUsers } from '../../services/UserService'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import AvatarIcon from '../shared/AvatarIcon/AvatarIcon'
import { randomColor } from '../../utils/utils'
import './UserList.scss'
import { FaSpinner } from 'react-icons/fa'
import { CultivationItem, CultivationMember, User } from '../../types/types'

interface UserListProps {
    selectedUsers: CultivationMember[]
    onClose: () => void
    cultivation: CultivationItem
}

const UserList: React.FC<UserListProps> = ({
    selectedUsers,
    onClose,
    cultivation,
}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [allUsers, setAllUsers] = useState<User[]>([])
    const [selectedUsersSet, setSelectedUsersSet] = useState<Set<number>>(
        new Set(selectedUsers.map((user) => user.user.id))
    )
    const [userColors, setUserColors] = useState<{ [userId: number]: string }>(
        {}
    )
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch()

    const users: User[] = useAppSelector((state) => state.allUsers.allUsers)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    useEffect(() => {
        setAllUsers(users.filter((user) => !selectedUsersSet.has(user.id)))
    }, [users])

    useEffect(() => {
        const colors = allUsers.reduce(
            (acc, user) => {
                acc[user.id] = randomColor()
                return acc
            },
            {} as { [userId: number]: string }
        )
        setUserColors(colors)
    }, [allUsers])

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }

    const handleCheckboxChange = (userId: number) => {
        setSelectedUsersSet((prevSelectedUsers) => {
            const newSelectedUsers = new Set(prevSelectedUsers)
            if (newSelectedUsers.has(userId)) {
                newSelectedUsers.delete(userId)
            } else {
                newSelectedUsers.add(userId)
            }
            return newSelectedUsers
        })
    }

    const handleAddUser = async () => {
        setIsLoading(true)
        const selectedUserList = allUsers.filter((user) =>
            selectedUsersSet.has(user.id)
        )
        const updatedUserList: CultivationMember[] = selectedUserList.map(
            (user: User) => {
                return {
                    role: {
                        id: 3,
                    },
                    user,
                }
            }
        )
        try {
            await dispatch(
                addUsers({
                    cultivationId: cultivation.id,
                    users: updatedUserList,
                })
            )
            onClose()
        } catch (error) {
            console.error('Failed to add users:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const isAtLeastOneCheckboxChecked = () => {
        return Array.from(selectedUsersSet).some((userId) =>
            allUsers.some((user) => user.id === userId)
        )
    }

    const filteredUsers = allUsers.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="p-4 relative">
            {isLoading && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
                    <FaSpinner className="animate-spin text-blue-500 text-4xl" />
                </div>
            )}
            <div className="relative">
                <input
                    type="text"
                    className="border rounded p-2 mb-4 w-full pr-8"
                    placeholder="Search team member"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <FaSearch className="absolute top-3 right-3 text-gray-500" />
            </div>
            {filteredUsers.length === 0 ? (
                <span className="text-center block text-red-500 mt-4 mb-4">
                    No user found
                </span>
            ) : (
                <ul className="max-h-60 overflow-y-auto p-0">
                    {allUsers
                        .filter((user) =>
                            user.name
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                        )
                        .map((user) => (
                            <li
                                key={user.id}
                                className="flex items-center mb-2 border-b pb-2"
                            >
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-blue-500 mr-2"
                                        checked={selectedUsersSet.has(user.id)}
                                        onChange={() =>
                                            handleCheckboxChange(user.id)
                                        }
                                    />
                                    <AvatarIcon
                                        name={user.name}
                                        color={userColors[user.id]}
                                    />
                                    <span className="text-gray-800 ml-4">
                                        {user.name}
                                    </span>
                                </label>
                            </li>
                        ))}
                </ul>
            )}
            <div className="flex justify-end">
                <button
                    className={`mt-4 p-2 rounded ${
                        isAtLeastOneCheckboxChecked() && !isLoading
                            ? 'bg-blue-500 text-white add-btn'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!isAtLeastOneCheckboxChecked() || isLoading}
                    onClick={handleAddUser}
                >
                    Add to cultivation
                </button>
            </div>
        </div>
    )
}

export default UserList
