import React, { useState } from 'react'

export default function Calculator(props) {
    const { items, setItems, fakeData, selectedProfession, recipeData } = props
    const [searchValue, setSearchValue] = useState('')
    return (
        <div className='sub-section'>
            <h3 className='sub-header'>Recipes</h3>
            {selectedProfession ? (
                <>
                    <input value={searchValue} onChange={(e) => { setSearchValue(e.target.value) }} placeholder='Search recipe' className='recipe-search' />
                    {Object.keys(recipeData).filter(val => val.toLowerCase().includes(searchValue.toLowerCase())).map((recipe, recipeIndex) => {
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
                                <p>{recipe} {recipeData[recipe].quantities !== 1 ? `(${recipeData[recipe].quantities})` : ''}</p>
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
