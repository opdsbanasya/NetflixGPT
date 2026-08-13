"use client";

import React from 'react'
import { NETFLIX_LOGO } from '../utils/constant'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { toggleGptSearch } from '../store/gptSlice'
import { IoIosArrowUp } from 'react-icons/io'

const Footer = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const {showGPTButton} = useSelector(store => store.gptsearch);

    const handleGptSearch = () => {
        dispatch(toggleGptSearch());
        window.scrollTo({ top: 0});
        if (!showGPTButton) {
            router.push("gpt-search");
        } else {
            router.back();
        }
    }
    
    const handleBottomToTop = () => {
        window.scrollTo({ top: 0, behavior:"smooth"});
    }

    return (
        <section className='bg-[#050505] py-10 border-t border-white/5'>
            <div className='w-11/12 lg:w-10/12 mx-auto px-10 md:px-16 py-7 md:py-14 bg-[#111111] border border-white/5 text-white flex flex-col md:flex-row md:items-center justify-center gap-5 md:gap-10 rounded-2xl'>
                <div className='w-full md:w-1/3 flex justify-center md:justify-start'>
                    <img className={`w-32 md:w-48`} src={NETFLIX_LOGO} alt="Netflix Logo" />
                </div>
                <div className='w-full md:w-1/3 text-white/70 md:text-lg space-y-2 md:space-y-4 lg:font-semibold flex flex-col items-center md:items-start'>
                    <h5 onClick={() => handleGptSearch()} className='cursor-pointer hover:text-netflix-primary transition-colors'>GPT Search</h5>
                    <h5 className='cursor-pointer hover:text-netflix-primary transition-colors'>Contact Us</h5>
                    <h5 className='cursor-pointer hover:text-netflix-primary transition-colors'>About us</h5>
                </div>
                <div className='w-full md:w-1/3 flex md:flex-col items-center md:items-start text-white/70 text-base md:text-lg gap-5 md:gap-4 lg:font-semibold'>
                    <h5 className='flex items-center gap-3 cursor-pointer hover:text-netflix-primary transition-colors'><FaFacebook className='text-2xl' /> <span className='hidden md:block'>Facebook</span></h5>
                    <h5 className='flex items-center gap-3 cursor-pointer hover:text-netflix-primary transition-colors'><FaInstagram className='text-2xl' /> <span className='hidden md:block'>Instagram</span></h5>
                    <h5 className='flex items-center gap-3 cursor-pointer hover:text-netflix-primary transition-colors'><FaLinkedin className='text-2xl' /> <span className='hidden md:block'>LinkedIn</span></h5>
                </div>
                <div className='fixed bottom-5 right-4 z-50'>
                    <button onClick={handleBottomToTop} className='p-3 bg-netflix-primary hover:bg-netflix-secondary rounded-full text-white shadow-lg shadow-netflix-primary/20 transition-all text-xl'><IoIosArrowUp /></button>
                </div>
            </div> 
        </section>
    )
}

export default Footer