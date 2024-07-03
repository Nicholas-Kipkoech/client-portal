'use client'
import { _API_URL } from '@/app/constants/database-connect'
import { useContextApi } from '@/app/context/context'
import CustomButton from '@/app/utils/CustomButtom'
import CustomInput from '@/app/utils/CustomInput'
import CustomSelect from '@/app/utils/CustomSelect'
import { Spin } from 'antd'
import axios from 'axios'
import { Kranky } from 'next/font/google'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ProcessingModal from './processingModal'

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
  })
  const [payload, setPayload] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [message, setMessage] = useState<string | any>('Processing')
  const [openModal, setOpenModal] = useState(false)
  const [addPerson, setAddPerson] = useState(false)

  useEffect(() => {
    const quotePayload: any = localStorage.getItem('travelQuote')
    setPayload(JSON.parse(quotePayload))
    const total: any = localStorage.getItem('total')
    setTotal(total)
  }, [])
  console.log(payload.token)
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
        intermediaryCode: `${user.intermediaryCode}${user.entityCode}`,
        token: payload.token,
        dob: payload.dob,
        coverCode: payload.coverCode,
        age: String(payload.age),
        duration: String(payload.duration),
        destinationCountryCode: payload.destination,
      },
    },
  }
  console.log('policyPayload', paymentPayload)
  async function handlePayments() {
    setLoading(true)
    try {
      setOpenModal(true)
      const response = await axios.post(
        `${_API_URL}/uw/create_policy`,
        paymentPayload,
      )
      if (response.data.info === 'Success') {
        if (response.data.mapfreResponse.responseCode === 'ERROR') {
          setMessage(response.data.mapfreResponse.description)
          setTimeout(() => {
            setOpenModal(false)
          }, 2000)
        } else {
          localStorage.setItem('policyResponse', JSON.stringify(response.data))
          router.push('/dashboard/travelInsurance/documents')
          router.prefetch('/dashboard/travelInsurance/documents')
          setOpenModal(false)
          setMessage('success!!!!')
        }
      }
    } catch (error) {
      console.error(error)
      setMessage(error)

      setTimeout(() => {
        setOpenModal(false)
      }, 2000)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border h-auto w-auto p-10 bg-white shadow-2xl rounded-md">
        <p className="text-[1.5rem]">Fill in client details</p>
        <div className="flex gap-2">
          <CustomInput
            name={'First Name'}
            value={customerDetails.firstName}
            onChange={(e) =>
              setCustomerDetails({
                ...customerDetails,
                firstName: e.target.value,
              })
            }
            className="w-[15rem] border rounded-md"
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
            className="w-[15rem] border rounded-md"
          />
        </div>
        <div className="flex gap-2">
          <CustomInput
            name={'Phone Number'}
            value={customerDetails.phoneNumber}
            onChange={(e) =>
              setCustomerDetails({
                ...customerDetails,
                phoneNumber: e.target.value,
              })
            }
            className="w-[15rem] border rounded-md"
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
            className="w-[15rem] border rounded-md"
          />
        </div>
        <div className="flex gap-2">
          <CustomInput
            name={'Postal Address'}
            value={customerDetails.postalAddress}
            onChange={(e) =>
              setCustomerDetails({
                ...customerDetails,
                postalAddress: e.target.value,
              })
            }
            className="w-[15rem] border rounded-md"
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
            className="w-[15rem] border rounded-md"
          />
        </div>
        <div className="flex gap-2 ">
          <CustomSelect
            className="w-[15rem]"
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
            className="w-[15rem]"
            onChange={(value: any) =>
              setCustomerDetails({ ...customerDetails, gender: value.value })
            }
            options={[
              { label: 'KSH', value: 'KSH' },
              { label: 'USD', value: 'USD' },
            ]}
          />
        </div>
        <div className="flex gap-2 ">
          <CustomSelect
            className="w-[15rem]"
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
            className="w-[15rem]"
            onChange={(value: any) =>
              setCustomerDetails({ ...customerDetails, gender: value.value })
            }
            options={[
              { label: 'Nomura', value: 'Nomura' },
              { label: 'Bapa', value: 'Bapa' },
            ]}
          />
        </div>
        <div className="flex gap-2">
          <CustomInput
            name={'Email'}
            value={customerDetails.email}
            onChange={(e) =>
              setCustomerDetails({
                ...customerDetails,
                email: e.target.value,
              })
            }
            className=" border rounded-md h-[2.4rem] w-[15rem]"
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
            className=" border rounded-md h-[2.4rem] w-[15rem]"
          />{' '}
        </div>

        <div className="mt-2">
          <CustomButton
            onClick={() => setAddPerson(!addPerson)}
            name={'+ Add Person'}
            className="border   p-2 rounded-md "
          />
        </div>
        {addPerson && (
          <div>
            <CustomInput name="Name" className="border rounded-md" value={''} />
            <CustomInput
              name="Passport No"
              className="border rounded-md"
              value={''}
            />
            <CustomInput
              name="Date Of Birth"
              className="border rounded-md"
              value={''}
            />
            <CustomButton
              name={'+ Add'}
              className="border mt-2 bg-[#cb7529] text-white   h-[2.5rem] w-[5rem] rounded-md "
            />
          </div>
        )}

        <div className="flex">
          <CustomButton
            name={'Get Certificate'}
            onClick={handlePayments}
            className="w-full border mt-2 h-[2.5rem] rounded-md bg-[#cb7529] text-white"
          />
          <CustomButton
            name={'Cancel'}
            onClick={() => router.back()}
            className="w-full border mt-2 h-[2.5rem] rounded-md bg-red-500 text-white"
          />
        </div>
        <ProcessingModal
          open={openModal}
          handleClose={() => setOpenModal(false)}
          message={message}
        />
      </div>
    </div>
  )
}

export default Payments
