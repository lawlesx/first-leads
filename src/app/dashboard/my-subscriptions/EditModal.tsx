import { SearchDropdownModal } from '@/components/Onboarding/SelectLead/LeadTypeCard'
import { LeadPlanPopover } from '@/components/Onboarding/SelectLead/common'
import useLeadType from '@/hooks/useLeadType'
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useQueryClient } from 'react-query'

interface EditModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  subscriptionId: number
  leadTypeId: number
  areaValue: string
  areaType: string
  coverageType: string
  itemId: number
}

const EditModal = ({
  isOpen,
  onOpenChange,
  subscriptionId,
  areaValue: _areaValue,
  leadTypeId,
  areaType,
  coverageType,
  itemId,
}: EditModalProps) => {
  const {
    isOpen: isModalOpen,
    onOpen: onOpenModal,
    onOpenChange: onOpenModalChange,
    onClose: onCloseModal,
  } = useDisclosure()
  const [areaValue, setAreaValue] = useState<{
    areaType: string
    areaValue: string
  }>({
    areaType,
    areaValue: _areaValue,
  })
  const [plan, setPlan] = useState<'basic' | 'premium'>(coverageType as 'basic' | 'premium')

  const { data: leadType } = useLeadType({ id: leadTypeId })

  const [areaUpdateComplete, setAreaUpdateComplete] = useState<boolean>(false)
  const [isAreaUpdating, setIsAreaUpdating] = useState<boolean>(false)

  const [changePlanComplete, setChangePlanComplete] = useState<boolean>(false)
  const [isPlanUpdating, setIsPlanUpdating] = useState<boolean>(false)

  const queryClient = useQueryClient()

  const onUpdateArea = async () => {
    try {
      setIsAreaUpdating(true)
      await axios.patch(
        '/api/subscriptions/area-value',
        {
          areaValue: areaValue?.areaValue,
        },
        {
          params: {
            subscriptionId,
            itemId,
          },
        }
      )

      await queryClient.refetchQueries('subscriptions')
      setAreaUpdateComplete(true)
      setIsAreaUpdating(false)
      toast.success('Area updated successfully')
    } catch (error) {
      console.log(error)
      setIsAreaUpdating(false)
      toast.error('Unable to update area')
    }
  }

  const onUpdatePlan = async () => {
    try {
      setIsPlanUpdating(true)
      await axios.patch(
        '/api/subscriptions/coverage-type',
        {
          coverageType: plan,
        },
        {
          params: {
            subscriptionId,
            itemId,
          },
        }
      )

      await queryClient.refetchQueries('subscriptions')
      setChangePlanComplete(true)
      setIsPlanUpdating(false)
      toast.success('Plan updated successfully')
    } catch (error) {
      console.log(error)
      setIsPlanUpdating(false)
      toast.error('Unable to update plan')
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          {(onClose) => (
            <div className='w-full'>
              <ModalHeader className='flex flex-col gap-1 font-inter text-lg font-semibold text-[#6941C6]'>
                Edit Plan
              </ModalHeader>
              <ModalBody>
                <div className='flex flex-col'>
                  <h1 className='font-sans text-lg font-bold'>Update Plan Type</h1>
                  <div className='flex flex-col items-start justify-between gap-2 pt-4 lg:flex-row lg:items-center lg:gap-0'>
                    <div className='flex gap-2'>
                      <button
                        type='button'
                        className='grid h-5 w-5 place-items-center rounded-full bg-[#7363F33B]'
                        onClick={() => setPlan('basic')}
                      >
                        {plan === 'basic' ? <div className='h-[14px] w-[14px] rounded-full bg-[#7363F3]' /> : null}
                      </button>
                      <div className='font-quicksand text-sm font-medium text-black'>
                        Basic Plan
                        <span className='inline-flex items-center gap-2 pl-1 font-bold text-black'>
                          ${leadType?.basicPrice.price} <LeadPlanPopover plan='basic' />
                        </span>
                      </div>
                    </div>
                    <div className='flex gap-2'>
                      <button
                        type='button'
                        className='grid h-5 w-5 place-items-center rounded-full bg-[#7363F33B]'
                        onClick={() => setPlan('premium')}
                      >
                        {plan === 'premium' ? <div className='h-[14px] w-[14px] rounded-full bg-[#7363F3]' /> : null}
                      </button>
                      <div className='font-quicksand text-sm font-medium text-black'>
                        Premium Plan
                        <span className='inline-flex items-center gap-2 pl-1 font-bold text-black'>
                          ${leadType?.premiumPrice.price} <LeadPlanPopover plan='premium' />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center justify-end pt-4'>
                    <Button
                      onClick={onUpdatePlan}
                      className='bg-[#6941C6] font-inter text-sm font-medium text-white'
                      isDisabled={changePlanComplete}
                      isLoading={isPlanUpdating}
                    >
                      Update
                    </Button>
                  </div>
                </div>
                <div className='flex flex-col'>
                  <h1 className='font-sans text-lg font-bold'>Update Area</h1>
                  <button
                    className='relative z-10 flex w-full items-center gap-2 border-b border-[#D8D8D8] pt-4'
                    onClick={onOpenModal}
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12' fill='none'>
                      <path
                        d='M11.8368 10.3748L9.49987 8.03836C9.39441 7.93289 9.25144 7.8743 9.10144 7.8743H8.71941C9.36628 7.04695 9.75065 6.00656 9.75065 4.87453C9.75065 2.1818 7.5684 0 4.87544 0C2.18249 0 0 2.1818 0 4.87453C0 7.56727 2.18225 9.74906 4.87544 9.74906C6.00747 9.74906 7.04832 9.36469 7.87566 8.71781V9.09984C7.87566 9.24984 7.93426 9.39281 8.03973 9.49828L10.3767 11.8348C10.597 12.0551 10.9532 12.0551 11.1712 11.8348L11.8345 11.1715C12.0548 10.9512 12.0548 10.5952 11.8368 10.3748ZM4.87544 8.24906C3.01123 8.24906 1.50046 6.74109 1.50046 4.87453C1.50046 3.01055 3.00866 1.5 4.87544 1.5C6.73965 1.5 8.25043 3.00797 8.25043 4.87453C8.25043 6.73852 6.74223 8.24906 4.87544 8.24906ZM4.87591 2.625C3.92014 2.625 3.1453 3.39961 3.1453 4.35539C3.1453 5.12789 4.27638 6.53625 4.70974 7.04742C4.73007 7.07174 4.75548 7.0913 4.7842 7.10473C4.81291 7.11815 4.84422 7.12511 4.87591 7.12511C4.90761 7.12511 4.93892 7.11815 4.96763 7.10473C4.99634 7.0913 5.02176 7.07174 5.04208 7.04742C5.47544 6.53625 6.60653 5.12813 6.60653 4.35539C6.60653 3.39961 5.83169 2.625 4.87591 2.625ZM4.87591 4.875C4.56513 4.875 4.31342 4.62305 4.31342 4.3125C4.31342 4.00172 4.56537 3.75 4.87591 3.75C5.18646 3.75 5.43841 4.00172 5.43841 4.3125C5.43841 4.62305 5.18646 4.875 4.87591 4.875Z'
                        fill='#8E8E8E'
                      />
                    </svg>
                    <input
                      type='text'
                      placeholder='Location'
                      className='h-10 w-full font-inter text-sm font-medium text-[#8E8E8E] outline-none'
                      value={areaValue?.areaValue || ''}
                      readOnly
                    />
                  </button>
                  <div className='flex items-center justify-end pt-4'>
                    <Button
                      onClick={onUpdateArea}
                      className='bg-[#6941C6] font-inter text-sm font-medium text-white'
                      isDisabled={areaUpdateComplete}
                      isLoading={isAreaUpdating}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose} className='w-full font-inter text-sm'>
                  Close
                </Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
      <SearchDropdownModal
        isOpen={isModalOpen}
        onOpenChange={onOpenModalChange}
        leadTypeId={1}
        onClose={onCloseModal}
        setAreaValue={setAreaValue}
      />
    </>
  )
}

export default EditModal
