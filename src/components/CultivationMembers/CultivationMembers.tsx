import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {
    getUsersByCultivation,
    removeUser,
    changeRole,
} from '../../services/UserService'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { randomColor } from '../../utils/utils'
import { GrAdd } from 'react-icons/gr'
import { ToastContainer, toast } from 'react-toastify'
import Table from '../shared/Table/Table'
import Modal from '../shared/Modal/Modal'
import UserList from '../UserList/UserList'
import LoadingSpinner from '../shared/LoadingSpinner/LoadingSpinner'
import ConfirmationModal from '../shared/ConfirmationModal/ConfirmationModal'
import 'react-toastify/dist/ReactToastify.css'
import './CultivationMembers.scss'
import { CultivationMember, CultivationItem } from '../../types/types'

interface CultivationMembersProps {
    cultivation: CultivationItem
}

const CultivationMembers: React.FC<CultivationMembersProps> = ({
    cultivation,
}) => {
    const dispatch = useAppDispatch()
    const users: CultivationMember[] = useAppSelector(
        (state) => state.users.users
    )
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
        null
    )
    const [loading, setLoading] = useState(true)
    const [confirmModalOpen, setConfirmModalOpen] = useState(false)
    const [userToRemove, setUserToRemove] = useState<CultivationMember | null>(
        null
    )
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [roleLoading, setRoleLoading] = useState<number | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                await dispatch(getUsersByCultivation(cultivation.id))
                setLoading(false)
            } catch (error) {
                toast.error(`Failed to fetch users"`)
                setLoading(false)
            }
        }
        fetchData()
    }, [dispatch, cultivation])

    const userIconColor = useMemo(() => {
        return users.reduce(
            (acc, item) => {
                acc[item?.user?.id] = randomColor()
                return acc
            },
            {} as { [userId: number]: string }
        )
    }, [users])

    const openModal = useCallback(() => setIsModalOpen(true), [])
    const closeModal = useCallback(() => setIsModalOpen(false), [])

    const handleDropdownToggle = useCallback((index: number) => {
        setOpenDropdownIndex((prevIndex) =>
            prevIndex === index ? null : index
        )
    }, [])

    const handleRemoveUser = useCallback((item: CultivationMember) => {
        setUserToRemove(item)
        setConfirmModalOpen(true)
    }, [])

    const confirmRemoveUser = useCallback(async () => {
        if (userToRemove) {
            setConfirmLoading(true)
            try {
                const resultAction = await dispatch(
                    removeUser({
                        cultivationId: cultivation.id,
                        user: userToRemove,
                    })
                )
                if (removeUser.fulfilled.match(resultAction)) {
                    toast.success(
                        `User "${userToRemove?.user?.name}" removed successfully`
                    )
                } else {
                    toast.error(
                        `Failed to remove user "${userToRemove?.user?.name}"`
                    )
                }
            } catch (error) {
                toast.error('Failed to remove user')
            } finally {
                setConfirmLoading(false)
                setConfirmModalOpen(false)
                setUserToRemove(null)
            }
        }
    }, [dispatch, cultivation, userToRemove])

    const changeRoleForUserHandler = useCallback(
        async (role: { id: number; name: string }, user: CultivationMember) => {
            setRoleLoading(user?.user?.id)
            try {
                const resultAction = await dispatch(
                    changeRole({ cultivationId: cultivation.id, role, user })
                )
                if (changeRole.fulfilled.match(resultAction)) {
                    toast.success(
                        `Role for "${user?.user?.name}" has been successfully updated to "${role.name}"`
                    )
                } else {
                    toast.error(
                        `Failed to update role for "${user?.user?.name}"`
                    )
                }
            } catch (error) {
                toast.error('Failed to update role')
            } finally{
                setRoleLoading(null)
            }
        },
        [dispatch, cultivation]
    )

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <div className="container mx-auto cultivation-members-container">
            <ToastContainer />
            <h1 className="text-xl mb-4 pl-4 pt-4 font-medium border-b pb-4">
                {cultivation.name}
            </h1>
            <div className="pl-4 pr-4">
                {users.length === 0 ? (
                    <p className="text-center text-gray-500 mt-20 mb-10">
                        No members found. Please add new members to the
                        cultivation team.
                    </p>
                ) : (
                    <Table
                        data={users}
                        itemIconColor={userIconColor}
                        openDropdownIndex={openDropdownIndex}
                        handleDropdownToggle={handleDropdownToggle}
                        changeRoleForUser={changeRoleForUserHandler}
                        remove={handleRemoveUser}
                        loadingIcon={roleLoading}
                    />
                )}
            </div>
            <button
                className="add-user-btn hover:text-white"
                onClick={openModal}
            >
                <GrAdd />
                Add team member
            </button>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Add Team Member"
            >
                <UserList
                    selectedUsers={users}
                    onClose={closeModal}
                    cultivation={cultivation}
                />
            </Modal>
            <ConfirmationModal
                isOpen={confirmModalOpen}
                title="Confirm User Removal"
                message={`Are you sure you want to remove "${userToRemove?.user?.name}"  from "${cultivation.name}" ?`}
                loading={confirmLoading}
                onConfirm={confirmRemoveUser}
                onCancel={() => setConfirmModalOpen(false)}
            />
        </div>
    )
}

export default CultivationMembers
