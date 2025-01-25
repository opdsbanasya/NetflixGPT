import React from 'react'
import { NETFLIX_LOGO } from '../utils/constant'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toggleGptSearch } from '../store/gptSlice'
import { IoIosArrowUp } from 'react-icons/io'

const Footer = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {showGPTButton} = useSelector(store => store.gptsearch);

    const handleGptSearch = () => {
        dispatch(toggleGptSearch());
        window.scrollTo({ top: 0});
        navigate(!showGPTButton ? "gpt-search" : -1);
    }
    
    const handleBottomToTop = () => {
        window.scrollTo({ top: 0, behavior:"smooth"});
    }

    return (
        <section className='bg-black py-10'>
            <div className='w-11/12 lg:w-10/12 mx-auto px-10 md:px-16 py-7 md:py-14 bg-purple-300 text-white flex flex-col md:flex-row md:items-center justify-center gap-5 md:gap-10 rounded-md'>
                <div className='w-full md:w-1/3'>
                    <img className={`w-6/12`} src={NETFLIX_LOGO} alt="Netflix Logo" />
                </div>
                <div className='w-full md:w-1/3 text-black md:text-xl space-y-2 md:space-y-4 lg:font-semibold'>
                    <h5 onClick={() => handleGptSearch()} className='cursor-pointer underline hover:no-underline hover:text-blue-500'>GPT Search</h5>
                    <h5 className='cursor-pointer underline hover:no-underline hover:text-blue-500'>Contact Us</h5>
                    <h5 className='cursor-pointer underline hover:no-underline hover:text-blue-500'>About us</h5>
                </div>
                <div className='w-full md:w-1/3 flex md:flex-col items-center md:items-start text-black text-xl gap-5 md:gap-4 lg:font-semibold'>
                    <h5 className='flex items-center gap-3 cursor-pointer underline hover:no-underline hover:text-blue-500'><FaFacebook className='text-2xl hover:text-blue-500' /> <span className='hidden md:block'>Facebook</span></h5>
                    <h5 className='flex items-center gap-3 cursor-pointer underline hover:no-underline hover:text-[#D94D64]'><FaInstagram className='text-2xl hover:text-blue-500' /> <span className='hidden md:block'>Instagram</span></h5>
                    <h5 className='flex items-center gap-3 cursor-pointer underline hover:no-underline hover:text-blue-500'><FaLinkedin className='text-2xl hover:text-blue-500' /> <span className='hidden md:block'>LinkedIn</span></h5>
                </div>
                <div onClick={handleBottomToTop} className='fixed bottom-5 right-4'>
                    <button className='p-3 bg-[#FFFBCA] rounded-full text-black text-xl'><IoIosArrowUp /></button>
                </div>
            </div> 
        </section>
    )
}

export default Footer