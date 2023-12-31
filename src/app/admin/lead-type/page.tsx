'use client'

import { Button, useDisclosure } from '@nextui-org/react'
import { useState } from 'react'
import AddNewLeadsModal from './AddNewLeadsModal'
import LeadTypesTable from './LeadTypesTable'

const Page = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = 10

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  return (
    <div className='w-full px-10 pb-14 pt-10'>
      <div className='flex w-full items-center justify-between'>
        <h1 className='font-sans text-[40px] font-bold text-black'>Lead Type</h1>
        <Button
          type='button'
          onClick={onOpen}
          className='h-12 w-max rounded-[10px] border border-[#0000001C] bg-[#7363F3] px-14 font-rubik text-[13px] font-normal text-white'
        >
          Add New
        </Button>
      </div>
      <LeadTypesTable />
      {/* <div className='pt-10'>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div> */}
      <AddNewLeadsModal isOpen={isOpen} onClose={onOpenChange} />
    </div>
  )
}

export default Page
