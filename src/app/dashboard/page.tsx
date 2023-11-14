import NeedMoreLeads from '@/components/Dashboard/NeedMoreLeads'
import RecentlyAdded from '@/components/Dashboard/RecentlyAdded'

const Page = () => {
  return (
    <div className='w-full px-10 py-6'>
      <h1 className='font-sans text-[40px] font-bold text-black'>Dashboard</h1>
      <h2 className='pb-6 pt-4 font-sans text-2xl font-semibold text-black'>Analytics</h2>
      <div className='flex items-center gap-28'>
        <div
          className='flex w-[16rem] flex-col rounded-md bg-white px-8 py-7 font-quicksand'
          style={{
            boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.10)',
          }}
        >
          <div className='flex items-center gap-4 pb-2'>
            <h3 className='text-base font-bold tracking-[0.16px] text-[#343434]'>Lifetime Total</h3>
          </div>
          <h1 className='text-[28px] font-bold tracking-[0.28px] text-[#6A7ADA]'>856</h1>
          <h2 className='pt-1 text-sm font-medium tracking-[0.14px] text-[#949494]'>Leads</h2>
        </div>
        <div
          className='flex w-[16rem] flex-col rounded-md bg-white px-8 py-7 font-quicksand'
          style={{
            boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.10)',
          }}
        >
          <div className='flex items-center gap-4 pb-2'>
            <h3 className='text-base font-bold tracking-[0.16px] text-[#343434]'>Last 30 Days</h3>
          </div>
          <h1 className='text-[28px] font-bold tracking-[0.28px] text-[#6A7ADA]'>3,342</h1>
          <h2 className='pt-1 text-sm font-medium tracking-[0.14px] text-[#949494]'>Leads</h2>
        </div>
      </div>
      <RecentlyAdded />
      <NeedMoreLeads buttonStyles='px-8' />
      <div className='flex items-center justify-end'>
        <p className='font-rubik text-sm font-normal text-black'>© 2023 All Right Reserved by First Leads</p>
      </div>
    </div>
  )
}

export default Page
