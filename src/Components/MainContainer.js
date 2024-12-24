import React from 'react';
import TrailerContainer from './TrailerContainer';
import MovieCategories from './MovieCategories';
import { useSelector } from 'react-redux';
import GPTSearch from './GPTSearch';

const MainContainer = () => {
    
    return (
        <div>
            <TrailerContainer />
            <MovieCategories />
        </div>
    );
}

export default MainContainer;
