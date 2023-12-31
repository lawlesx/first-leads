'use client'
import { CrossIcon } from '@/components/Dashboard/icons'
import SelectedLeadRow from '@/components/Onboarding/SelectedLeadRow'
import useCart from '@/hooks/useCart'
import useCartId from '@/hooks/useCartId'
import { Button, Checkbox, Skeleton } from '@nextui-org/react'
import axios from 'axios'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useCartDisclosure } from './CartSidebarContext'

const Cart = () => {
  const { data: cart, isLoading } = useCart()

  const total = cart?.items.reduce((acc, item) => acc + Number(item.price), 0)
  const [termsAgreed, setTermsAgreed] = useState(true)
  const [marketingAgreed, setMarketingAgreed] = useState(false)
  const { setCartId } = useCartId()

  const { onClose } = useCartDisclosure()

  return (
    <div className='absolute top-0 flex h-full w-full flex-col items-center justify-between font-sans lg:fixed lg:w-1/4 lg:bg-[#7363F30D]'>
      <div className='h-auto w-full overflow-y-auto px-8 pt-10'>
        <div className='flex items-center justify-between'>
          <h1 className='text-[38px] font-bold text-black'>Your Cart</h1>
          <button className='block rounded-full bg-white p-3 lg:hidden' onClick={onClose}>
            <CrossIcon className='h-4 w-4' />
          </button>
        </div>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className='mt-8 h-20 w-full rounded-lg' />)
        ) : cart?.items.length ? (
          cart.items.map((item, i) => (
            <SelectedLeadRow
              key={i}
              leadType={item.name}
              plans={[{ title: `${item.areaValue} (${item.coverageType})`, price: Number(item.price) }]}
              itemId={item.id}
            />
          ))
        ) : (
          <div className='mt-10 flex w-full items-center justify-center border-y border-[#ddd] py-6 font-outfit text-lg text-[#777]'>
            Empty Cart
          </div>
        )}
      </div>
      <div className='w-full text-white'>
        <div className='flex flex-col gap-2 px-6 py-4'>
          <Checkbox
            defaultSelected
            size='sm'
            className='font-outfit text-sm font-medium'
            color='secondary'
            isSelected={termsAgreed}
            onValueChange={setTermsAgreed}
          >
            <Link href='/terms' target='_blank' rel='noopener noreferrer' className='hover:text-blue-500'>
              Terms & Conditions
            </Link>
          </Checkbox>
          <Checkbox
            size='sm'
            className='font-outfit text-sm font-medium'
            color='secondary'
            isSelected={marketingAgreed}
            onValueChange={setMarketingAgreed}
          >
            Opt in to receive marketing emails and new updates.{' '}
          </Checkbox>
        </div>
        <div className='flex w-full items-center justify-between bg-[#160042] px-8 py-4'>
          <div className='flex w-1/2 flex-col'>
            <h1 className='text-[30px] font-bold'>Sub Total</h1>
            <p className='text-sm font-medium'>(Exclusive Tax)</p>
          </div>
          <div className='flex w-1/2 flex-col items-end'>
            <h1 className='text-[26px] font-bold'>${total || 0} /mo</h1>
            <p className='text-sm font-medium'>(Billed Monthly)</p>
          </div>
        </div>
        <Button
          className='flex h-16 w-full items-center justify-center gap-3 rounded-none bg-[#6941C6] p-0 text-2xl font-bold text-white'
          type='button'
          disabled={!total}
          onClick={async () => {
            if (!termsAgreed) return toast.error('Please agree to the terms and conditions')

            try {
              const results = await toast.promise(
                Promise.all([
                  axios.put('/api/user/accept-terms'),
                  axios.patch('/api/user/update', {
                    marketingNotifications: marketingAgreed,
                  }),
                  axios.get('/api/cart/checkout', {
                    params: {
                      cartId: cart?.id,
                    },
                  }),
                ]),
                {
                  loading: 'Checking out...',
                  success: 'Checkout successful: Redirecting to payment page',
                  error: 'Error while checking out',
                }
              )

              const url = results[2].data.url

              setCartId(null)

              if (url) {
                window.location.href = url
              }
            } catch (error) {
              console.error('Error while checking out', error)
            }
          }}
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
        </Button>
      </div>
    </div>
  )
}

export default Cart
