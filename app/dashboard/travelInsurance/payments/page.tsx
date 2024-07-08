'use client'
import { _API_URL } from '@/app/constants/database-connect'
import { useContextApi } from '@/app/context/context'
import CustomButton from '@/app/utils/CustomButtom'
import CustomInput from '@/app/utils/CustomInput'
import CustomSelect from '@/app/utils/CustomSelect'
import { DatePicker, Spin } from 'antd'
import axios from 'axios'
import { Kranky } from 'next/font/google'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ProcessingModal from './processingModal'
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
  })
  const [payload, setPayload] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [message, setMessage] = useState<string | any>('Processing')
  const [openModal, setOpenModal] = useState(false)
  const [addPerson, setAddPerson] = useState(false)
  const [dob, setDOB] = useState('')
  const [beneficiaryName, setBeneficiaryName] = useState('')
  const [beneficiaryPassport, setBeneficiaryPassport] = useState('')
  const [beneficiaries, setBeneficiaries] = useState<any[]>([])

  useEffect(() => {
    const quotePayload: any = localStorage.getItem('travelQuote')
    setPayload(JSON.parse(quotePayload))
    const total: any = localStorage.getItem('total')
    setTotal(total)
  }, [])

  function handleAddBeneficiary() {
    const benObj = {
      beneficiaryName,
      beneficiaryPassport,
      dob,
    }
    setBeneficiaries([...beneficiaries, benObj])
  }

  const beneficiariesDOB = beneficiaries.map((benefiary) => benefiary.dob)

  console.log(payload)

  const calculatePremiumPayload = {
    policyFromDate: payload.policyFromDate,
    policyExpiryDate: payload.policyExpiryDate,
    token: payload.token,
    coverCode: payload.coverCode,
    dob: dob + ',' + beneficiariesDOB.join(','),
  }
  console.log(calculatePremiumPayload)

  async function handleViewPricing(code: string, productName: string) {
    localStorage.setItem('product', JSON.stringify({ code, productName }))
    const updatedPayload = { ...payload, coverCode: code }
    localStorage.setItem('travelQuote', JSON.stringify(updatedPayload))
  }

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
        policyCurrency: 'USD',
        policyFromDate: payload.policyFromDate,
        policyExpiryDate: payload.policyExpiryDate,
        clientCode: '',
        intermediaryCode: `${user.intermediaryCode}${user.entCode}`,
        token: payload.token,
        dob: dob + ',' + beneficiariesDOB.join(','),
        coverCode: payload.coverCode,
        age: String(payload.age),
        duration: String(payload.duration),
        destinationCountryCode: payload.destination,
      },
    },
  }
  // console.log('policyPayload', paymentPayload)
  async function handlePayments() {
    const response = await axios.post(
      `${_API_URL}/uw/calculate_cover_premium`,
      calculatePremiumPayload,
    )
    if (response.data) {
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

  return (
    <div className="flex items-center justify-center h-auto">
      <div className="border h-auto w-auto p-10 flex flex-col items-center m-10 bg-white shadow-2xl rounded-md">
        <p className="text-[1.5rem] font-bold">Fill in client details</p>
        <div className="grid grid-cols-2 gap-2">
          <CustomInput
            name={'First Name'}
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
            name="Paying Currency"
            className="w-[20rem] "
            onChange={(value: any) =>
              setCustomerDetails({ ...customerDetails, gender: value.value })
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
            <label>Date Of Birth</label>
            <DatePicker
              format={'DD-MM-YYYY'}
              placeholder={'DD-MM-YYYY'}
              className={'w-[20rem] h-[40px] border p-2 rounded-md'}
              onChange={handleBirthDate}
            />
          </div>
          <div className="flex justify-center items-center gap-2">
            <label>Add beneficiary?</label>
            <input type="checkbox" onChange={() => setAddPerson(!addPerson)} />
          </div>
        </div>

        {addPerson && (
          <div className="mt-2 border p-2 rounded-md">
            <p className="text-[1.2rem] font-bold flex items-center justify-center">
              Beneficiary's Details
            </p>
            <div className="flex gap-2">
              <CustomInput
                name="Name"
                className="border rounded-md w-[20rem] "
                value={beneficiaryName}
                onChange={(e) => setBeneficiaryName(e.target.value)}
              />
              <CustomInput
                name="Passport No"
                className="border rounded-md w-[20rem] "
                value={beneficiaryPassport}
                onChange={(e) => setBeneficiaryPassport(e.target.value)}
              />
            </div>
            <div className="flex flex-col mt-2">
              <label>Date Of Birth</label>
              <DatePicker
                format={'DD-MM-YYYY'}
                placeholder={'DD-MM-YYYY'}
                className={' h-[40px] w-[20rem] border p-2 rounded-md'}
                onChange={handleBirthDate}
              />
            </div>
            <CustomButton
              name={'+ Add'}
              onClick={handleAddBeneficiary}
              className="border mt-2 bg-[#cb7529] text-white   h-[2.5rem] w-[5rem] rounded-md "
            />
          </div>
        )}
        <div className="flex gap-2">
          <CustomButton
            name={'Get Quote'}
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
      <ProcessingModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        message={message}
      />
    </div>
  )
}

export default Payments
