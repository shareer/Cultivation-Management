import React, { useState } from 'react'
import CultivationMembers from '../CultivationMembers/CultivationMembers'
import SelectDropdown from '../shared/SelectDropdown/SelectDropdown'
import { CultivationItem } from '../../types/types'

const Home: React.FC = () => {
    const cultivationListData: CultivationItem[] = [
        {
            id: '3fb82b92-4fdb-451d-b77e-817ae15826b7',
            name: 'Cultivation for assignment',
        },
        {
            id: '87c350db-326c-46c9-83ca-7e96192261d9',
            name: 'Green House Cultivation',
        },
    ]

    const [selectedCultivation, setSelectedCultivation] =
        useState<CultivationItem>(cultivationListData[0])

    const handleOptionChange = (selectedOption: CultivationItem | null) => {
        if (selectedOption) {
            setSelectedCultivation(selectedOption)
        }
    }

    return (
        <div className="container mx-auto p-8">
            <SelectDropdown
                options={cultivationListData}
                onChange={handleOptionChange}
                placeholder="Select a Cultivation"
            />
            <CultivationMembers cultivation={selectedCultivation} />
        </div>
    )
}

export default Home
