import React from 'react'
interface AvatarIconProps {
    name: string
    color: string
}

const AvatarIcon: React.FC<AvatarIconProps> = ({ name, color }) => {
    return (
        <div
            className="rounded-full h-8 w-8 flex items-center justify-center"
            style={{ backgroundColor: color }}
        >
            <span className="text-gray-800">{name[0]}</span>
        </div>
    )
}

export default AvatarIcon
