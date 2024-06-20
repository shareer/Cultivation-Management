import React from 'react'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

interface ConfirmationModalProps {
    isOpen: boolean
    title: string
    message: string
    loading: boolean
    onConfirm: () => void
    onCancel: () => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    title,
    message,
    loading,
    onConfirm,
    onCancel,
}) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            {loading ? (
                <LoadingSpinner />
            ) : (
                <div className="bg-white rounded-sm shadow-lg overflow-hidden max-w-lg w-full">
                <div className="border-b justify-between items-center">
                    <div className='border-b p-4 text-gray-800'><h2 className="text-lg font-medium">{title}</h2></div>
                    <p className="mt-2 p-4 text-gray-800">{message}</p>
                    <div className="flex justify-end p-4 mb-4">
                        <button
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                            onClick={onCancel}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            className="text-white px-4 py-2 rounded"
                            onClick={onConfirm}
                            disabled={loading}
                            style={{ background: '#405c79' }}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
                </div>
            )}
        </div>
    )
}

export default ConfirmationModal
