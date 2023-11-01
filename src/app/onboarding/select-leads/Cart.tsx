'use client'
import SelectedLeadRow from '@/components/Onboarding/SelectedLeadRow'
import { Button } from '@nextui-org/react'
import Link from 'next/link'

const Cart = () => {
  return (
    <div className='fixed flex h-full w-1/4 flex-col items-center font-sans'>
      <div className='no-scroll-bar h-4/5 w-full overflow-y-auto px-8 pt-10'>
        <h1 className='text-[38px] font-bold text-black'>Your Cart</h1>
        {Array.from({ length: 5 }).map((_, i) => (
          <SelectedLeadRow
            key={i}
            leadType='Lead Type'
            plans={[
              { title: 'Location (Basic)', price: 29 },
              { title: 'Location (Premium)', price: 49 },
            ]}
          />
        ))}
      </div>
      <div className='h-1/5 w-full text-white'>
        <div className='flex h-3/5 w-full items-center justify-between bg-[#160042] px-8 py-4'>
          <div className='flex w-1/2 flex-col'>
            <h1 className='text-[30px] font-bold'>Sub Total</h1>
            <p className='text-sm font-medium'>(Exclusive Tax)</p>
          </div>
          <div className='flex w-1/2 flex-col items-end'>
            <h1 className='text-[26px] font-bold'>$159 /mo</h1>
            <p className='text-sm font-medium'>(Billed Annually)</p>
          </div>
        </div>
        <Button className='h-2/5 w-full rounded-none bg-[#6941C6] p-0 text-2xl font-bold text-white' type='button'>
          <Link
            href='/onboarding/checkout'
            className='flex h-full w-full items-center justify-center gap-3'
            onClick={(e) => e.stopPropagation()}
          >
            Checkout
            <svg
              className='mt-1'
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='15'
              viewBox='0 0 16 15'
              fill='none'
            >
              <path
                d='M6.80281 1.00469L7.59558 0.242157C7.93126 -0.080719 8.47405 -0.080719 8.80616 0.242157L15.7482 6.91608C16.0839 7.23895 16.0839 7.76105 15.7482 8.08049L8.80616 14.7578C8.47048 15.0807 7.92769 15.0807 7.59558 14.7578L6.80281 13.9953C6.46356 13.669 6.47071 13.1366 6.8171 12.8172L11.1202 8.87394H0.857047C0.3821 8.87394 0 8.50641 0 8.04958V6.95042C0 6.49359 0.3821 6.12606 0.857047 6.12606H11.1202L6.8171 2.18285C6.46714 1.86341 6.45999 1.33101 6.80281 1.00469Z'
                fill='white'
              />
            </svg>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Cart