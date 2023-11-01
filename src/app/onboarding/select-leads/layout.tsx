'use client'
import { CartContextProvider } from '@/components/Onboarding/SelectLead/CartContext'
import Cart from './Cart'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CartContextProvider>
      <div className='grid min-h-screen w-full grid-cols-4 bg-white'>
        <div className='col-span-3 flex h-full flex-col items-center'>{children}</div>
        <div className='relative z-10 col-span-1 w-full bg-[#7363F30D]'>
          <Cart />
        </div>
      </div>
    </CartContextProvider>
  )
}

export default Layout