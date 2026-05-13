import React, { useState, useEffect } from 'react'
import EngineeringData from '../../src/assets/engineering.json'

function getSortedRecipes(recipeData, searchValue, items) {
    return Object.keys(recipeData)
        .filter(val => val.toLowerCase().includes(searchValue.toLowerCase()))
        .sort((a, b) => {
            const aSet = items[a] > 0 ? 1 : 0
            const bSet = items[b] > 0 ? 1 : 0
            return bSet - aSet
        })
}

export default function Calculator(props) {
    const { items, setItems, fakeData, selectedProfession } = props
    const [searchValue, setSearchValue] = useState('')
    const [sortedRecipes, setSortedRecipes] = useState(() => getSortedRecipes(EngineeringData, '', items))

    useEffect(() => {
        setSearchValue('')
        setSortedRecipes(getSortedRecipes(EngineeringData, '', items))
    }, [EngineeringData])

    function handleSearchChange(e) {
        const val = e.target.value
        setSearchValue(val)
        setSortedRecipes(getSortedRecipes(EngineeringData, val, items))
    }

    return (
        <div className='sub-section'>
            <h3 className='sub-header'>Recipes</h3>
            {selectedProfession ? (
                <>
                    <input value={searchValue} onChange={handleSearchChange} placeholder='Search recipe' className='recipe-search' />
                    {sortedRecipes.map((recipe, recipeIndex) => {
                        return (
                            <div className='recipe-line' key={recipeIndex}>
                                <input placeholder='0' type='number' value={items[recipe] || ''} onChange={(e) => {
                                    setItems(curr => {
                                        return {
                                            ...curr,
                                            [recipe]: e.target.value
                                        }
                                    })
                                }} />
                                <i className="fa-solid fa-xmark"></i>
                                <p>{recipe} {EngineeringData[recipe].quantities !== 1 ? `(${EngineeringData[recipe].quantities})` : ''}</p>
                            </div>
                        )
                    })}
                </>
            ) : (
                <>
                    <p>Please select a profession...</p>
                </>
            )}

        </div>
    )
}
