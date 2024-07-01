'use client'
import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { IoArrowBackOutline } from 'react-icons/io5'
import axios from 'axios'
import { _API_URL } from '@/app/constants/database-connect'
import { formatDate, Months } from '@/app/utils/helpers'
import CustomSelect from '@/app/utils/CustomSelect'
import CustomButton from '@/app/utils/CustomButtom'
import { formattedCountries } from '../travelUtils'
import { DatePicker } from 'antd'

const Travel = () => {
  const router = useRouter()

  const [destination, setDestination] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [dob, setDOB] = useState('')
  const [token, setToken] = useState('')

  async function getToken() {
    const response = await axios.post(`${_API_URL}/auth/generatetoken`, {
      un: 'icon',
      pw: 'B1MA',
    })
    setToken(response.data.value)
  }
  console.log('access_token', token)

  useEffect(() => {
    getToken()
  }, [])

  const handleToDate = (date: any, dateString: any) => {
    const [day, month, year] = dateString.split('-')
    let formattedMonth: any = ''
    if (month < 10) {
      formattedMonth = Months[month.toString().slice(1) - 1]
    } else {
      formattedMonth = Months[Number(month - 1)]
    }
    const formattedToDate = day + '-' + formattedMonth + '-' + year
    console.log(formattedToDate)
    setToDate(formattedToDate)
  }
  const handleBirthDate = (date: any, dateString: any) => {
    const [day, month, year] = dateString.split('-')
    let formattedMonth: any = ''
    if (month < 10) {
      formattedMonth = Months[month.toString().slice(1) - 1]
    } else {
      formattedMonth = Months[Number(month - 1)]
    }
    const formattedToDate = day + '-' + formattedMonth + '-' + year

    setDOB(formattedToDate)
  }

  const handleFromDate = (date: any, dateString: any) => {
    const [day, month, year] = dateString.split('-')
    let formattedMonth: any = ''
    if (month < 10) {
      formattedMonth = Months[month.toString().slice(1) - 1]
    } else {
      formattedMonth = Months[Number(month - 1)]
    }
    const formattedToDate = day + '-' + formattedMonth + '-' + year
    setFromDate(formattedToDate)
  }

  function getDates() {
    let differenceInDays
    let __dob
    let age
    let policyExpiryDate
    let policyFromDate
    if (fromDate !== '' || dob !== '' || toDate !== '') {
      const _toDate: any = new Date(toDate)
      const _fromDate: any = new Date(fromDate)
      const differenceInMilliseconds = _toDate - _fromDate
      const millisecondsPerDay = 1000 * 60 * 60 * 24
      differenceInDays = differenceInMilliseconds / millisecondsPerDay + 1

      const _dob: any = new Date(dob) // Replace 'dob' with the actual date of birth string
      const today: any = new Date()
      const differenceInMillisecondsYear = today - _dob

      // Convert milliseconds to years
      const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25
      age = differenceInMillisecondsYear / millisecondsPerYear

      // Adjust the age to get an integer value
      age = Math.floor(age)

      __dob = formatDate(dob)
      policyExpiryDate = formatDate(toDate)
      policyFromDate = formatDate(fromDate)
    }
    return {
      differenceInDays,
      age,
      __dob,
      policyExpiryDate,
      policyFromDate,
    }
  }

  const {
    __dob,
    age,
    differenceInDays,
    policyExpiryDate,
    policyFromDate,
  } = getDates()
  const payload = {
    destination: destination,
    duration: differenceInDays,
    policyFromDate: policyFromDate,
    policyExpiryDate: policyExpiryDate,
    age: age,
    token: token,
    dob: __dob,
  }

  const handleGetQuote = () => {
    router.push('/dashboard/travelInsurance/travel-quote')
    localStorage.setItem('travelQuote', JSON.stringify(payload))
  }

  return (
    <div className="m-5">
      <div
        onClick={() => router.back()}
        className="flex gap-2 items-center cursor-pointer  py-1 bg-yellow-950 text-white w-[6rem] mb-2 justify-center rounded-md"
      >
        <IoArrowBackOutline size={20} />
        <p>Back</p>
      </div>

      <div className="flex items-center  gap-2 justify-center">
        <div className="w-auto border  bg-white shadow-2xl rounded-md h-[35rem] flex items-center justify-center  flex-col p-5">
          <p className="text-[1.5rem] font-semibold">Fill in travel details</p>
          <CustomSelect
            name="Country of Residence"
            options={formattedCountries}
            className="w-[30rem] "
            placeholder={'Select country...'}
            onChange={(value: any) => setDestination(value.value)}
          />
          <CustomSelect
            name="Destination"
            options={formattedCountries}
            className="w-[30rem] "
            placeholder={'Select Destination...'}
            onChange={(value: any) => setDestination(value.value)}
          />
          <div className="flex flex-col mt-2">
            <label>Travel Date</label>
            <DatePicker
              format={'DD-MM-YYYY'}
              placeholder={'DD-MM-YYYY'}
              className={'w-[30rem] h-[40px] border p-2 rounded-md'}
              onChange={handleFromDate}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label>Return Date</label>
            <DatePicker
              format={'DD-MM-YYYY'}
              placeholder={'DD-MM-YYYY'}
              className={'w-[30rem] h-[40px] border p-2 rounded-md'}
              onChange={handleToDate}
            />
          </div>
          <div className="flex flex-col mt-2">
            <label>Date Of Birth</label>
            <DatePicker
              format={'DD-MM-YYYY'}
              placeholder={'DD-MM-YYYY'}
              className={'w-[30rem] h-[40px] border p-2 rounded-md'}
              onChange={handleBirthDate}
            />
          </div>
          <CustomButton
            name={'Get Quote'}
            onClick={handleGetQuote}
            className={
              'bg-[#cb7229] text-white w-[30rem] my-5 h-[2.5rem] rounded-[30px] text-[1.2rem]'
            }
          />
        </div>
      </div>
    </div>
  )
}

export default Travel
