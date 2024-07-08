'use client'

import CustomButton from '@/app/utils/CustomButtom'
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'

import { MdDone } from 'react-icons/md'
import { benefitsData } from '../benfitsData'

const AcceptQuote = () => {
  const router = useRouter()
  const [product, setProduct] = useState<any>({})
  const [premiums, setPremiums] = useState<any>({})

  useEffect(() => {
    const product: any = localStorage.getItem('product')
    const quoteResponse: any = localStorage.getItem('quoteResponse')
    setPremiums(JSON.parse(quoteResponse))
    setProduct(JSON.parse(product))
  }, [])

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
        <div className="w-[50%] border bg-white h-[30rem] overflow-y-auto rounded-md shadow-2xl">
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
        <div className="w-[40%] border bg-white h-[30rem] rounded-md shadow-2xl">
          <p className="flex justify-center text-[2rem] font-bold border b">
            Premiums
          </p>
          <div className="max-h-[20rem] flex flex-col justify-center items-end p-2 h-auto">
            <div className="text-[1.5rem]">Premiums in USD</div>
            <div className="pl-4 mr-2  "></div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <CustomButton
          name={'Accept Purchase'}
          onClick={() => router.push('/dashboard/travelInsurance/payments')}
          className="h-[2.8rem] w-[30rem] rounded-[30px] bg-[#cb7529] text-white text-[1.3rem] border"
        />
      </div>
    </div>
  )
}

export default AcceptQuote
