import React, { useState, useEffect, useRef } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'
interface Option {
    id: string
    name: string
}
interface SelectDropdownProps {
    options: Option[]
    onChange: (selectedOption: Option | null) => void
    placeholder?: string
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
    options,
    onChange,
    placeholder = 'Select an option',
}) => {
    const [selectedOption, setSelectedOption] = useState<Option | null>(
        options.length > 0 ? options[0] : null
    )
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleWindowClick = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }

        window.addEventListener('click', handleWindowClick)

        return () => {
            window.removeEventListener('click', handleWindowClick)
        }
    }, [])

    const handleOptionClick = (option: Option) => {
        setSelectedOption(option)
        onChange(option)
        setIsOpen(false)
    }

    return (
        <div className="relative w-64" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
                <span
                    className="truncate max-w-full block"
                    style={{ maxWidth: 'calc(100% - 2.5rem)' }}
                >
                    {selectedOption ? selectedOption.name : placeholder}
                </span>
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <RiArrowDownSLine className="ml-2 mt-1 cursor-pointer text-xl text-gray-500" />
                </span>
            </button>
            {isOpen && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    <ul className="max-h-60 overflow-auto py-1">
                        {options.map((option) => (
                            <li
                                key={option.id}
                                className={`cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                                    option === selectedOption
                                        ? 'bg-blue-100'
                                        : ''
                                }`}
                                onClick={() => handleOptionClick(option)}
                            >
                                <span className="block truncate">
                                    {option.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default SelectDropdown
