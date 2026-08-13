"use client";
import React from 'react';
import HeroSection from './HeroSection';
import MovieCategories from './MovieCategories';

const MainContainer = () => {
    return (
        <div className="bg-[#050505] min-h-screen">
            <HeroSection />
            <MovieCategories />
        </div>
    );
}

export default MainContainer;
