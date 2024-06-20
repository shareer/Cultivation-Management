import React from 'react';
import UserRole from '../../UserRole/UserRole';
import { CultivationMember } from '../../../types/types';
import AvatarIcon from '../AvatarIcon/AvatarIcon';
import { FaSpinner } from 'react-icons/fa';

interface TableProps {
    data: CultivationMember[];
    itemIconColor?: { [userId: number]: string };
    openDropdownIndex?: number | null;
    loadingIcon: number | null;
    handleDropdownToggle: (index: number) => void;
    changeRoleForUser?: (role: { id: number; name: string }, user: CultivationMember) => void;
    remove: (item: CultivationMember) => void;
}

const Table: React.FC<TableProps> = ({
    data,
    itemIconColor,
    openDropdownIndex,
    loadingIcon,
    handleDropdownToggle,
    changeRoleForUser,
    remove,
}) => (
    <div className="overflow-x-auto sm:overflow-x-visible">
        <table className="table-auto w-full min-w-[500px]">
            <thead>
                <tr className="table-head-row">
                    <th className="px-4 py-2 text-left font-semibold">Name</th>
                    <th className="px-4 py-2 text-left font-semibold">Role</th>
                    <th className="px-4 py-2"></th>
                </tr>
            </thead>
            <tbody className="relative max-h-96 overflow-y-auto">
                {data.map((item, index) => (
                    <tr key={item.user.id} className="border-b">
                        <td className="px-4 py-2 text-left">
                            <div className="flex items-center">
                                <AvatarIcon
                                    name={String(item?.user?.name)}
                                    color={String(itemIconColor?.[item.user.id])}
                                />
                                <span className="text-gray-800 ml-4">
                                    {item.user.name || 'No name'}
                                </span>
                            </div>
                        </td>
                        <td className="px-4 py-2 flex text-left relative">
                            <span>{item.role.name}</span>
                            {loadingIcon === item.user.id ? (
                                <FaSpinner className="ml-2 animate-spin text-blue-500 text-lg" />
                            ) : (
                                <UserRole
                                    isVisible={openDropdownIndex === index}
                                    onToggle={() => handleDropdownToggle(index)}
                                    onChangeUserRole={(role) => changeRoleForUser?.(role, item)}
                                />
                            )}
                        </td>
                        <td className="px-4 py-2 text-left">
                            {item.role.name !== 'Head grower' && (
                                <button
                                    className="px-2 py-1 text-blue-500 hover:text-blue-700"
                                    onClick={() => remove(item)}
                                >
                                    Remove
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default Table;
