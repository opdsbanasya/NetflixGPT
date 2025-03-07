import React from 'react';
import production_company_logo from "../assets/production_company_logo.png"

const MovieProductionsCompanies = ({ production_companies, production_countries }) => {
    return (
        <div className='w-full md:w-11/12 min-h-[40vh] mx-auto px-5 md:px-10 pt-0 md:py-5'>
            <h3 className='w-11/12 mx-auto text-2xl py-5 mb-5'>Productions Companies</h3>
            <div className='w-full min-h-[20vh] flex flex-col md:flex-row md:items-center justify-center gap-5 md:gap-10 px-5 md:px-0 md:flex-wrap'>
                {production_companies.map(company => <div
                    key={company?.id}
                    className='flex flex-row md:flex-col items-center justify-between md:justify-start gap-2'
                >
                    <div className='w-5/12 bg-[#C1D8C3] p-1 hidden md:block'>
                        {<img src={company?.logo_path ? `https://image.tmdb.org/t/p/w220_and_h330_face` + company?.logo_path : production_company_logo}
                            className={`w-full ${company?.logo_path && "mix-blend-color-burn"}  hover:scale-95 cursor-pointer`}
                            alt='{company?.name}' />}
                    </div>
                    <h5 className='production-name'>{company?.name}</h5>
                    <h6 className='font-sm'>{company?.origin_country}</h6>
                </div>
                )}
            </div>
            <h3 className='w-11/12 mx-auto text-2xl py-0 md:py-5 my-5 mt-10'>Productions Countries</h3>
            <div className='w-full space-y-5'>
                {production_countries.map(country => <div
                    className='w-11/12 md:w-6/12 lg:4/12 mx-auto flex items-center justify-start gap-5'
                >
                    <h5 className='production-name bg-slate-800 px-2 py-1'>{country?.iso_3166_1}</h5>:
                    <h6 className='font-sm'>{country?.name}</h6>
                </div>
                )}
            </div>
        </div>
    )
}

export default MovieProductionsCompanies
