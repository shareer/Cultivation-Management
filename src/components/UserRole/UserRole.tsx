import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUserRoles } from "../../services/UserService";
import { RiArrowDownSLine } from "react-icons/ri";
import './UserRole.scss'

interface UserRoleProps {
  isVisible: boolean;
  onToggle: () => void;
  onChangeUserRole: (role: { id: number; name: string }) => void;
}

const UserRole: React.FC<UserRoleProps> = ({
  isVisible,
  onToggle,
  onChangeUserRole,
}) => {
  const dispatch = useAppDispatch();
  const userRoles = useAppSelector((state) => state.userRoles.roles);
  const status = useAppSelector((state) => state.userRoles.status);

  const handleToggle = () => {
    if (status === "idle" || status === "failed") {
      dispatch(getUserRoles());
    }
    onToggle();
  };

  const handleRoleChange = (role: { id: number; name: string }) => {
    onChangeUserRole(role);
    onToggle();
  };

  return (
    <div className="relative">
      <button onClick={handleToggle}>
        <RiArrowDownSLine className="ml-2 mt-1 cursor-pointer text-xl text-gray-500" />
      </button>
      {isVisible && (
        <div className="absolute user-role-container w-96 rounded shadow-lg z-50 border border-gray-200 left-3 top-5">
          {status === "loading" ? (
            <div className="p-4">Loading...</div>
          ) : (
            <ul className="bg-white">
              {userRoles?.map((role) => (
                <li
                  key={role.id}
                  className="flex items-center py-2 px-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleRoleChange(role)}
                >
                  <div className="flex-1">
                    <h3 className="font-medium sm:text-sm">{role.name}</h3>
                    <p className="hidden sm:block text-gray-500 text-sm mt-2">
                      {role.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default UserRole;
