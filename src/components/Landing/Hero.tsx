'use client'
import Link from 'next/link'
import GetStarted from './GetStarted'

const Hero = () => {
  return (
    <div className='flex items-center justify-between pb-40 pt-16 font-archivo'>
      <div className='flex w-1/2 flex-col gap-4 pl-40'>
        <h1 className='text-6xl font-semibold tracking-[-2px] text-white'>Unlock Your Business Superpower!</h1>
        <p className='text-lg font-normal text-[#E5EDE5]'>
          Are you ready to supercharge your sales and grow your business? At FirstLeads, we specialize in delivering
          high-quality leads to service businesses across various industries.
        </p>
        <div className='flex items-center justify-start gap-4 pt-4'>
          <GetStarted backgroundColor='bg-purple-2' />
          <Link
            href='#'
            className='rounded-lg border border-[#859794] px-3 py-3 text-center text-base font-semibold text-white transition-all duration-200 ease-in-out hover:border-white hover:bg-white hover:text-purple-2'
          >
            Book A Free Call
          </Link>
        </div>
      </div>

      <div className='h-[30rem] w-[40rem] bg-slate-500'></div>
    </div>
  )
}

export default Hero
