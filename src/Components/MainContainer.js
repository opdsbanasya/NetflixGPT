import React from 'react';
import TrailerContainer from './TrailerContainer';
import MovieCategories from './MovieCategories';
import { useSelector } from 'react-redux';
import GPTSearch from './GPTSearch';

const MainContainer = () => {
    const { showGPTButton } = useSelector(store => store.gptsearch);
    return (
        <div>
            {showGPTButton ? (
                <section>
                    <GPTSearch />
                </section>
            ) : <section>
                <TrailerContainer />
                <MovieCategories />
            </section>
            }
        </div>
    );
}

export default MainContainer;
