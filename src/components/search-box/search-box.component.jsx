import React from 'react';

import './search-box.styles.css'

export const SearchBox = ({placeholder, handleChange}) => (
    <input 
        className='search__input'
        type='search' 
        placeholder={placeholder}
        onChange={handleChange}
    />
)