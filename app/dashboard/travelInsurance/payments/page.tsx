'use client'
import { _API_URL } from '@/app/constants/database-connect'
import { useContextApi } from '@/app/context/context'
import CustomButton from '@/app/utils/CustomButtom'
import CustomInput from '@/app/utils/CustomInput'
import CustomSelect from '@/app/utils/CustomSelect'
import { DatePicker, Spin, Table } from 'antd'
import axios from 'axios'
import { Kranky } from 'next/font/google'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ProcessingModal from '../acceptQuote/processingModal'
import { Months } from '@/app/utils/helpers'

const Payments = () => {
  const router = useRouter()
  const { user }: any = useContextApi()

  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    secondName: '',
    phoneNumber: '',
    KraPinNo: '',
    postalAddress: '',
    physicalAddress: '',
    gender: '',
    mpesaNo: '',
    email: '',
    passportNo: '',
    dob: '',
    currencyRate: '',
    currency: '',
  })
  const [payload, setPayload] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  const [addPerson, setAddPerson] = useState(false)
  const [dob, setDOB] = useState('')
  const [travellersFirstName, setTravellersFirstName] = useState('')
  const [travellersLastName, setTravellersLastName] = useState('')
  const [travellerPassport, setTravellersPassport] = useState('')
  const [travellerPhoneNumber, setTravellerPhoneNumber] = useState('')
  const [travellers, setTravellers] = useState<any[]>([])
  const [userId, setUserId] = useState(0) // Manage userId with state

  useEffect(() => {
    const quotePayload: any = localStorage.getItem('travelQuote')
    setPayload(JSON.parse(quotePayload))
    const total: any = localStorage.getItem('total')
    setTotal(total)
  }, [])

  function handleAddBeneficiary() {
    const newUserId = userId + 1
    setUserId(newUserId) // Update userId state
    const benObj = {
      userId: userId,
      firstName: travellersFirstName,
      lastName: travellersLastName,
      phoneNumber: travellerPhoneNumber,
      passportNo: travellerPassport,
      dob: dob,
    }
    setTravellers((prevTravellers) => [...prevTravellers, benObj])
  }
  const beneficiariesDOB = travellers.map((benefiary) => benefiary.dob)
  console.log(beneficiariesDOB)
  const calculatePremiumPayload = {
    policyFromDate: payload.policyFromDate,
    policyExpiryDate: payload.policyExpiryDate,
    token: payload.token,
    coverCode: payload.coverCode,
    dob: customerDetails.dob + ',' + beneficiariesDOB.join(','),
  }
  console.log(calculatePremiumPayload)
  async function handleViewPricing(code: string, productName: string) {
    localStorage.setItem('product', JSON.stringify({ code, productName }))
    const updatedPayload = { ...payload, coverCode: code }
    localStorage.setItem('travelQuote', JSON.stringify(updatedPayload))
  }

  function getClientAge() {
    let age
    const _dob: any = new Date(dob) // Replace 'dob' with the actual date of birth string
    const today: any = new Date()
    const differenceInMillisecondsYear = today - _dob

    // Convert milliseconds to years
    const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25
    age = differenceInMillisecondsYear / millisecondsPerYear

    // Adjust the age to get an integer value
    age = Math.floor(age)
    return { age }
  }
  const { age } = getClientAge()

  const paymentPayload = {
    token: payload.token,
    paymentRequest: {
      phoneNumber: customerDetails.phoneNumber.replace(
        customerDetails.mpesaNo[0],
        '254',
      ),
      accountReference: payload.coverCode,
      amount: Number(total),
    },
    policyPayload: {
      requestSource: 'ClientPortal',
      clientPayload: {
        clientFirstName: customerDetails.firstName,
        clientSecondName: customerDetails.secondName,
        clientCellphone: customerDetails.phoneNumber,
        clientTaxNo: customerDetails.KraPinNo,
        clientGender: customerDetails.gender,
        clientEmail: customerDetails.email,
        clientPostalAddress: customerDetails.postalAddress,
        clientPhysicalAddress: customerDetails.physicalAddress,
        clientPassportNo: customerDetails.passportNo,
        clientFacebookUserID: '',
        clientTwitterHandle: '',
        token: payload.token,
      },
      policyDetails: {
        policyType: 'Quote',
        policyProductCode: payload.coverCode,
        policyCurrency: customerDetails.currency,
        policyFromDate: payload.policyFromDate,
        policyExpiryDate: payload.policyExpiryDate,
        clientCode: '',
        intermediaryCode: `${user.aentCode}${user.entCode}`,
        token: payload.token,
        dob: customerDetails.dob,
        coverCode: payload.coverCode,
        age: String(age),
        duration: String(payload.duration),
        destinationCountryCode: payload.destination,
        otherTravellers: travellers,
      },
    },
  }

  async function handlePayments() {
    const response = await axios.post(
      `${_API_URL}/uw/calculate_cover_premium`,
      calculatePremiumPayload,
    )
    if (response.data) {
      localStorage.setItem('quoteResponse', JSON.stringify(response.data))
      localStorage.setItem('travelPayload', JSON.stringify(paymentPayload))
      router.push('/dashboard/travelInsurance/acceptQuote')
    }
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
  const handleCustomerDOB = (date: any, dateString: any) => {
    const [day, month, year] = dateString.split('-')
    let formattedMonth: any = ''
    if (month < 10) {
      formattedMonth = Months[month.toString().slice(1) - 1]
    } else {
      formattedMonth = Months[Number(month - 1)]
    }
    const formattedToDate = day + '-' + formattedMonth + '-' + year

    setCustomerDetails({ ...customerDetails, dob: formattedToDate })
  }

  function handleRemoveTraveller(item: any) {
    const filteredTraveller = travellers.filter(
      (traveller) => traveller.userId !== item.userId,
    )
    setTravellers(filteredTraveller)
  }

  function isPrimaryFieldsEmpty() {
    // check fields if they are empty
    const items = [
      customerDetails.KraPinNo,
      customerDetails.dob,
      customerDetails.firstName,
      customerDetails.gender,
      customerDetails.currency,
      customerDetails.email,
      customerDetails.phoneNumber,
    ]

    for (const field of items) {
      if (!field || field.trim() === '') {
        return true
      }
    }
    return false
  }
  function isTravellersFieldEmpty() {
    // check fields if they are empty
    const items = [travellerPassport, travellersFirstName, dob]

    for (const field of items) {
      if (!field || field.trim() === '') {
        return true
      }
    }
    return false
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'passportNo',
      key: 'passportNo',
    },
    {
      title: 'DOB',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'Action',
      dataIndex: 'dob',
      key: 'dob',
      render: (_: any, item: any) => (
        <button
          className="text-red-500"
          onClick={() => handleRemoveTraveller(item)}
        >
          X
        </button>
      ),
    },
  ]

  return (
    <div className="flex items-center justify-center h-auto">
      <div className="border h-auto w-auto p-10 flex flex-col items-center m-10 bg-white shadow-2xl rounded-md">
        <p className="text-[1.5rem] font-bold">Fill in client details</p>
        <div className="grid grid-cols-2 gap-2">
          <CustomInput
            name={'First Name'}
            required
            value={customerDetails.firstName}
            onChange={(e) =>
              setCustomerDetails({
                ...customerDetails,
                firstName: e.target.value,
              })
            }
            className="w-[20rem] border rounded-md"
          />
          <CustomInput
            name={'Last Name'}
            required
            value={customerDetails.secondName}
            onChange={(e) =>
              setCustomerDetails({
                ...customerDetails,
                secondName: e.target.value,
              })
            }
            className="w-[20rem]  border rounded-md"
          />

          <CustomInput
            required
            name={'Phone Number'}
            value={customerDetails.phoneNumber}
            onChange={(e) =>
              setCustomerDetails({
                ...customerDetails,
                phoneNumber: e.target.value,
              })
            }
            className="w-[20rem]  border rounded-md"
          />
          <CustomInput
            required
            name={'KRA PIN No'}
            value={customerDetails.KraPinNo}
            onChange={(e) =>
              setCustomerDetails({
                ...customerDetails,
                KraPinNo: e.target.value,
              })
            }
            className="w-[20rem]  border rounded-md"
          />

          <CustomInput
            name={'Postal Address'}
            value={customerDetails.postalAddress}
            onChange={(e) =>
              setCustomerDetails({
                ...customerDetails,
                postalAddress: e.target.value,
              })
            }
            className="w-[20rem]  border rounded-md"
          />
          <CustomInput
            name={'Physical Address'}
            value={customerDetails.physicalAddress}
            onChange={(e) =>
              setCustomerDetails({
                ...customerDetails,
                physicalAddress: e.target.value,
              })
            }
            className="w-[20rem]  border rounded-md"
          />

          <CustomSelect
            required
            className="w-[20rem]"
            name="Gender"
            onChange={(value: any) =>
              setCustomerDetails({ ...customerDetails, gender: value.value })
            }
            options={[
              { label: 'Male', value: 'Male' },
              { label: 'Female', value: 'Female' },
              { label: 'Other', value: 'Other' },
            ]}
          />
          <CustomSelect
            required
            name="Paying Currency"
            className="w-[20rem] "
            onChange={(value: any) =>
              setCustomerDetails({ ...customerDetails, currency: value.value })
            }
            options={[
              { label: 'KSH', value: 'KSH' },
              { label: 'USD', value: 'USD' },
            ]}
          />
          <CustomSelect
            className="w-[20rem] "
            name="Channel Type"
            onChange={(value: any) =>
              setCustomerDetails({ ...customerDetails, gender: value.value })
            }
            options={[
              { label: 'Broker', value: 'Broker' },
              { label: 'Direct', value: 'Direct' },
            ]}
          />
          <CustomSelect
            name="Broker"
            className="w-[20rem] "
            onChange={(value: any) =>
              setCustomerDetails({ ...customerDetails, gender: value.value })
            }
            options={[
              { label: 'Nomura', value: 'Nomura' },
              { label: 'Bapa', value: 'Bapa' },
            ]}
          />
          <CustomInput
            required
            name={'Email'}
            value={customerDetails.email}
            onChange={(e) =>
              setCustomerDetails({
                ...customerDetails,
                email: e.target.value,
              })
            }
            className=" border rounded-md h-[2.4rem] w-[20rem]"
          />
          <CustomInput
            required
            name={'Passport No'}
            value={customerDetails.passportNo}
            onChange={(e) =>
              setCustomerDetails({
                ...customerDetails,
                passportNo: e.target.value,
              })
            }
            className=" border rounded-md h-[2.4rem] w-[20rem] "
          />
          <div className="flex flex-col mt-2">
            <div className="flex gap-1 items-center">
              <label>Date of Birth</label>
              <p className="text-red-500">*</p>
            </div>
            <DatePicker
              format={'DD-MM-YYYY'}
              placeholder={'DD-MM-YYYY'}
              className={'w-[20rem] h-[40px] border p-2 rounded-md'}
              onChange={handleCustomerDOB}
            />
          </div>
          <div className="flex justify-center items-center gap-2">
            <label>Are you travelling with someone?</label>

            <label>Yes</label>
            <input
              type="checkbox"
              checked={addPerson === true}
              onChange={() => setAddPerson(true)}
            />
            <label>No</label>
            <input
              type="checkbox"
              checked={addPerson === false}
              onChange={() => setAddPerson(false)}
            />
          </div>
        </div>

        {addPerson && (
          <div className="mt-2 border p-2 rounded-md">
            <p className="text-[1.2rem] font-bold flex items-center justify-center">
              Traveller's Details
            </p>
            <div className="grid grid-cols-2 gap-2">
              <CustomInput
                required
                name="First Name"
                className="border rounded-md w-[20rem] "
                value={travellersFirstName}
                onChange={(e) => setTravellersFirstName(e.target.value)}
              />
              <CustomInput
                required
                name="Last Name"
                className="border rounded-md w-[20rem] "
                value={travellersLastName}
                onChange={(e) => setTravellersLastName(e.target.value)}
              />
              <CustomInput
                required
                name="Passport No"
                className="border rounded-md w-[20rem] "
                value={travellerPassport}
                onChange={(e) => setTravellersPassport(e.target.value)}
              />
              <CustomInput
                name="Phone Number"
                className="border rounded-md w-[20rem] "
                value={travellerPhoneNumber}
                onChange={(e) => setTravellerPhoneNumber(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-2">
              <div className="flex gap-1 items-center">
                <label>Date of Birth</label>
                <p className="text-red-500">*</p>
              </div>
              <DatePicker
                format={'DD-MM-YYYY'}
                placeholder={'DD-MM-YYYY'}
                className={' h-[40px] w-[20rem] border p-2 rounded-md'}
                onChange={handleBirthDate}
              />
            </div>

            <div className="mt-2">
              <Table dataSource={travellers} columns={columns} />
            </div>

            <CustomButton
              name={'+ Add'}
              disabled={isTravellersFieldEmpty()}
              onClick={handleAddBeneficiary}
              className="border mt-2 bg-[#cb7529] text-white   h-[2.5rem] w-[5rem] rounded-md "
            />
          </div>
        )}
        <div className="flex gap-2">
          <CustomButton
            name={'Get Quote'}
            disabled={isPrimaryFieldsEmpty()}
            onClick={handlePayments}
            className="w-[20rem] border mt-2 h-[2.5rem] rounded-md bg-[#cb7529] text-white"
          />
          <CustomButton
            name={'Cancel'}
            onClick={() => router.back()}
            className="w-[20rem] border mt-2 h-[2.5rem] rounded-md bg-red-500 text-white"
          />
        </div>
      </div>
    </div>
  )
}

export default Payments
