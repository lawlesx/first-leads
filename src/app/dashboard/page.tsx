'use client'
import NeedMoreLeads from '@/components/Dashboard/NeedMoreLeads'
import RecentlyAdded from '@/components/Dashboard/RecentlyAdded'
import useUserAnalytics from '@/hooks/useUserAnalytics'
import useUserNextReports from '@/hooks/useUserNextReports'
import { Skeleton } from '@nextui-org/react'

const Page = () => {
  const { data: analytics, isLoading } = useUserAnalytics()
  const { data: nextReports } = useUserNextReports()

  return (
    <div className='flex h-full w-full flex-col px-6 py-8 lg:px-10'>
      <h1 className='pb-2 font-sans text-3xl font-bold text-black lg:text-[40px]'>Dashboard</h1>
      <h2 className='pb-6 pt-4 font-sans text-lg font-semibold text-black lg:pt-6 lg:text-2xl'>Analytics</h2>
      <div className='flex flex-wrap items-center justify-between gap-2 lg:justify-start lg:gap-28'>
        <div
          className='flex w-max flex-col rounded-md bg-white p-4 font-quicksand lg:min-w-[16rem] lg:px-8 lg:py-7'
          style={{
            boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.10)',
          }}
        >
          <h3 className='text-sm font-bold tracking-[0.16px] text-[#343434] lg:pb-2 lg:text-base'>Lifetime Total</h3>

          {isLoading ? (
            <Skeleton className='h-8 w-24' />
          ) : (
            <h1 className='text-[28px] font-bold tracking-[0.28px] text-[#6A7ADA]'>{analytics?.totalCount || 0}</h1>
          )}
          <h2 className='text-sm font-medium tracking-[0.14px] text-[#949494] lg:pt-1'>Leads</h2>
        </div>
        <div
          className='flex w-max flex-col rounded-md bg-white p-4 font-quicksand lg:min-w-[16rem] lg:px-8 lg:py-7'
          style={{
            boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.10)',
          }}
        >
          <h3 className='text-sm font-bold tracking-[0.16px] text-[#343434] lg:pb-2 lg:text-base'>Last 30 Days</h3>

          {isLoading ? (
            <Skeleton className='h-8 w-24' />
          ) : (
            <h1 className='text-[28px] font-bold tracking-[0.28px] text-[#6A7ADA]'>
              {analytics?.last30DaysCount || 0}
            </h1>
          )}
          <h2 className='text-sm font-medium tracking-[0.14px] text-[#949494] lg:pt-1'>Leads</h2>
        </div>
      </div>
      <h2 className='py-6 font-sans text-lg font-semibold text-black lg:pt-8 lg:text-2xl'>Upcoming Reports</h2>
      <div
        className='flex flex-col gap-4 rounded-md p-4'
        style={{
          boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.10)',
        }}
      >
        {nextReports?.map((report, i) => (
          <div className='flex flex-col gap-2 lg:flex-row' key={i}>
            <h1 className='font-outfit text-lg font-medium capitalize'>{report.leadType} -</h1>
            <p className='font-rubik text-lg font-normal text-[#3f3f3f]'>
              {report.nextReportDate ? new Date(report.nextReportDate).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        ))}
      </div>
      <RecentlyAdded />
      <div className='mt-auto pb-8'>
        <NeedMoreLeads buttonStyles='px-8' />
        <div className='flex items-center justify-end'>
          <p className='font-rubik text-sm font-normal text-black'>
            © 2023 All Rights Reserved by First Leads Generation Inc.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Page
