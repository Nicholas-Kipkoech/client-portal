'use client'

import CustomButton from '@/app/utils/CustomButtom'
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'

import { MdDone } from 'react-icons/md'
import { benefitsData } from '../benfitsData'
import axios from 'axios'
import { _API_URL } from '@/app/constants/database-connect'
import ProcessingModal from './processingModal'
import { message as MessageAPi } from 'antd'

const AcceptQuote = () => {
  const router = useRouter()
  const [product, setProduct] = useState<any>({})
  const [premiums, setPremiums] = useState<any>({})
  const [message, setMessage] = useState<string | any>('Processing')
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    const product: any = localStorage.getItem('product')
    const quoteResponse: any = localStorage.getItem('quoteResponse')
    setPremiums(JSON.parse(quoteResponse))
    setProduct(JSON.parse(product))
  }, [])

  const handleAcceptQuote = async () => {
    try {
      setOpenModal(true)
      const payload: any = localStorage.getItem('travelPayload')
      const response = await axios.post(
        `${_API_URL}/uw/create_policy`,
        JSON.parse(payload),
      )
      MessageAPi.loading('Processing.....')
      console.log(response.data)
      if (response.data.info === 'Success') {
        if (response.data.mapfreResponse.responseCode === 'ERROR') {
          router.push('/dashboard/travelInsurance/documents')
          MessageAPi.success(response.data.mapfreResponse.description)
          message(response.data.mapfreResponse.description)
          setOpenModal(false)
        } else {
          router.push('/dashboard/travelInsurance/documents')
          setOpenModal(false)
        }
      }
    } catch (error) {
      setOpenModal(false)
      MessageAPi.error('Something went wrong!!!', 1)
    }
  }

  return (
    <div className="m-5">
      <div
        onClick={() => router.back()}
        className="flex gap-2 items-center cursor-pointer  py-1 bg-yellow-950 text-white w-[6rem] justify-center rounded-md"
      >
        <IoArrowBackOutline size={20} />
        <p>Back</p>
      </div>
      <div className="flex justify-center items-center gap-2 mt-3">
        <div className="w-[50%] border bg-white h-[35rem] overflow-y-auto rounded-md shadow-2xl">
          <div className="px-2 max-h-[6rem] h-[4rem] font-bold flex justify-center text-[1.8rem]">
            <p> Product: {product.productName}</p>
          </div>
          <div>
            <p className="flex justify-center text-[2rem] font-[600] border b">
              Benefits
            </p>
            <div className="px-2 max-h-[10rem] h-[5rem]">
              {benefitsData?.map((benefit) => {
                const matchingDetail = benefit.details.find(
                  (detail: { code: string }) => detail.code === product.code,
                )
                const value = matchingDetail ? matchingDetail.value : 0
                return (
                  <div
                    key={benefit.name}
                    className="flex items-center justify-between gap-[0.3rem]"
                  >
                    <div className="flex gap-[0.3rem]">
                      <MdDone size={20} color="blue" />
                      <p className="text-ellipsis text-[10px]">
                        {benefit.name}
                      </p>
                    </div>
                    <p>${value.toLocaleString()}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="w-[40%] border bg-white h-[35rem] rounded-md shadow-2xl">
          <p className="flex justify-center text-[2rem] font-bold border b">
            Premiums
          </p>
          <div className="max-h-[20rem] flex flex-col justify-center items-end p-2 h-auto">
            {Object.keys(premiums).length > 0 && (
              <>
                <div className="text-[1.5rem] font-bold">Premiums in USD</div>
                <div className="pl-4 mr-4 flex  flex-col items-end">
                  <p>Premiums: {premiums.premiumForeign}</p>
                  {Object.entries(premiums.charges.chargeForeign).map(
                    ([key, value]: any) => (
                      <p>
                        {key}: {value}
                      </p>
                    ),
                  )}
                  <p className="text-[1.2rem] font-bold">
                    Total:{' '}
                    {premiums.premiumForeign +
                      Object.values(premiums.charges?.chargeForeign).reduce(
                        (sum: any, value: any) => Number(sum) + Number(value),
                        0,
                      )}
                  </p>
                </div>
                <>
                  <div className="text-[1.5rem] font-bold">Premiums in KSH</div>
                  <div className="pl-4 mr-4 flex  flex-col items-end ">
                    <p>Premiums: {premiums.premiumLocal}</p>
                    {Object.entries(premiums.charges.chargeLocal).map(
                      ([key, value]: any) => (
                        <p>
                          {key}: {value}
                        </p>
                      ),
                    )}
                    <p className="text-[1.2rem] font-bold">
                      Total:{' '}
                      {(
                        Object.values(premiums.charges.chargeLocal).reduce(
                          (sum: any, value: any) => sum + value,
                          0,
                        ) + premiums.premiumLocal
                      ).toLocaleString()}
                    </p>
                  </div>
                </>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <CustomButton
          name={'Accept Purchase'}
          onClick={handleAcceptQuote}
          className="h-[2.8rem] w-[30rem] rounded-[30px] bg-[#cb7529] text-white text-[1.3rem] border"
        />
      </div>
      <ProcessingModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        message={message}
      />
    </div>
  )
}

export default AcceptQuote
