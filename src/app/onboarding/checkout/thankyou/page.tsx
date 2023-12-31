'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTimeout } from 'usehooks-ts'

const Thankyou = () => {
  const router = useRouter()

  useTimeout(() => {
    router.push('/dashboard')
  }, 5000)

  return (
    <div className='w-full bg-[#160042]'>
      <div className='flex items-center justify-center py-4 pl-20 pr-10'>
        <Image src='/images/LogoWhite.png' width={250} height={100} alt='Logo' />
      </div>
      <div className='flex h-full w-full flex-col items-center justify-center rounded-tl-[15px] bg-white py-40'>
        <svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100' fill='none'>
          <path
            d='M50 0C22.3875 0 0 22.3875 0 50C0 77.6125 22.3875 100 50 100C77.6125 100 100 77.6125 100 50C100 22.3875 77.6125 0 50 0ZM73.1625 36.1688L49.2125 72.775C49.2062 72.7812 49.1938 72.7875 49.1938 72.7938C49.0688 72.9813 49 73.1937 48.8438 73.3688C48.625 73.6063 48.3438 73.7313 48.0938 73.9125C48.0312 73.9563 47.9688 74.0062 47.9 74.05C47.5125 74.2937 47.1125 74.4563 46.675 74.5625C46.5313 74.6 46.4 74.6375 46.25 74.6625C45.9019 74.7104 45.5492 74.7146 45.2 74.675C44.9534 74.6594 44.7087 74.6218 44.4688 74.5625C44.2212 74.4879 43.9807 74.3917 43.75 74.275C43.55 74.1813 43.3375 74.1562 43.15 74.0375C43.0125 73.95 42.9375 73.8125 42.8188 73.7063C42.7688 73.6625 42.7063 73.65 42.6562 73.6063L28.7125 60.7125C27.886 59.9189 27.4038 58.8327 27.3696 57.6874C27.3354 56.542 27.7519 55.429 28.5296 54.5875C29.3073 53.7459 30.384 53.2431 31.5285 53.187C32.673 53.1309 33.7938 53.5261 34.65 54.2875L44.7438 63.625L65.8375 31.3812C66.4724 30.4099 67.4671 29.7305 68.6029 29.4926C69.7386 29.2546 70.9224 29.4776 71.8938 30.1125C72.8651 30.7474 73.5445 31.7421 73.7824 32.8779C74.0203 34.0136 73.7974 35.1974 73.1625 36.1688Z'
            fill='#11D900'
          />
        </svg>
        <h1 className='py-6 font-quicksand text-5xl font-bold text-black'>Your Subscription is Activated</h1>
        <p className='w-3/5 text-center font-outfit text-[21px] text-[#5F5F5F] 2xl:w-1/2'>
          Your Subscription is Activated! Welcome aboard. Redirecting to your personalized dashboard for a seamless
          experience in 5 seconds
        </p>
        <motion.div
          key='loading'
          className='py-20'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className='loading-spinner'>
            <motion.div
              className='loading-spinner-circle'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 0.6,
                ease: 'easeInOut',
              }}
            ></motion.div>
            <motion.div
              className='loading-spinner-circle'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 0.6,
                ease: 'easeInOut',
                delay: 0.2,
              }}
            ></motion.div>
            <motion.div
              className='loading-spinner-circle'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 0.6,
                ease: 'easeInOut',
                delay: 0.4,
              }}
            ></motion.div>
          </div>
        </motion.div>
        {/* <p className='mt-8 rounded-full bg-[#F8F7FE] px-24 py-3 text-center font-sans text-xl font-medium text-black'>
          Please check your Inbox for a Verification Mail
        </p> */}
      </div>
    </div>
  )
}

export default Thankyou
