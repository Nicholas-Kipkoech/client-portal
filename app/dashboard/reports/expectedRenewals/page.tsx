'use client'
import { DatePicker } from 'antd'
import React, { useContext, useState } from 'react'
import { GrPrevious } from 'react-icons/gr'
import { useRouter } from 'next/navigation'
import { Months } from '@/app/utils/helpers'
import ReportsContext from '@/app/context/reports/reports-context'
import { useContextApi } from '@/app/context/context'
import CsvDownloader from 'react-csv-downloader'
import CustomSelect from '@/app/utils/CustomSelect'

import CustomButton from '@/app/utils/CustomButtom'

export interface ICurrencies {
  [k: string]: string
}

const ExpectedRenewals = () => {
  const currencies: ICurrencies = {
    KSH: 'Kenya Shilling',
    USD: 'US Dollar',
    EURO: 'Euros',
    GBP: 'British Pound',
    YEN: 'Japanese Yen',
  }
  const currencyOptions = Object.keys(currencies).map((currency) => {
    return {
      value: currency,
      label: currencies[currency],
    }
  })
  const {
    expectedRenewals,
    loadingExpectedRenewals,
    fetchExpectedRenewals,
  }: any = useContext(ReportsContext)

  const { user }: any = useContextApi()
  console.log(user)
  const [fromDate, setFmDate] = useState('')
  const [toDate, setTdDate] = useState('')
  const [currency, setCurrency] = useState('KSH')

  const handleToDate = (date: any, dateString: any) => {
    const [day, month, year] = dateString.split('-')
    let formattedMonth: any = ''
    if (month < 10) {
      formattedMonth = Months[month.toString().slice(1) - 1]
    } else {
      formattedMonth = Months[Number(month - 1)]
    }
    const formattedToDate = day + '-' + formattedMonth + '-' + year
    setTdDate(formattedToDate)
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
    setFmDate(formattedToDate)
  }
  const checkDate = fromDate.split('-').join('') === 'undefinedundefined'
  const handleRunReports = async () => {
    if (checkDate === true) {
      alert('Please select from date and to date')
    } else {
      await fetchExpectedRenewals(fromDate, toDate)
    }
  }

  const columns = [
    {
      displayName: 'Policy No',
      id: 'policyNo',
    },
    {
      displayName: 'Insured',
      id: 'insured',
    },
    {
      displayName: 'Intermediary',
      id: 'intermediary',
    },
    {
      displayName: 'Product',
      id: 'product',
    },
    {
      displayName: 'Expiry Date',
      id: 'expiryDate',
    },
    {
      displayName: 'Sum Insured',
      id: 'sumInsured',
    },
    {
      displayName: 'Current Premium',
      id: 'currentPremium',
    },
    {
      displayName: 'Renewal Premium',
      id: 'renewalPremium',
    },
    {
      displayName: 'Loss Ratio',
      id: 'lossRatio',
    },

    {
      displayName: 'Branch',
      id: 'branch',
    },
    {
      displayName: 'Phone No',
      id: 'phoneNo',
    },
    {
      displayName: 'Email',
      id: 'email',
    },
  ]
  const router = useRouter()
  let url = `http://192.168.1.112:8001/icon/reports?p_module_name=UW_UNRENEWED_POLICIES&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=UW.ADF&p_org_code=50&p_menu_code=UW000056&p_grp_code=UW.ADF&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=UNRENEWED%20POLICIES%20REPORT&P_ORG_CODE=50&P_BRANCH=&P_BRANCH_GROUP=&P_CLASS=&P_SUBCLASS=&P_CATEGORY=${user.aentCode}&P_AGENT=${user.entCode}&P_CLIENT=&P_CATEGORY_FILTER=&P_FM_DT=${fromDate}&P_TO_DT=${toDate}`
  return (
    <div>
      <div className="flex justify-between items-center">
        <div
          className="flex items-center  bg-slate-900 mt-2 px-2 text-white"
          onClick={() => router.back()}
        >
          <GrPrevious size={15} />
          <p>Back</p>
        </div>
        <p className="md:text-[1rem] sm:text-[0.6rem] font-bold">
          Expected Renewals [{fromDate} to {toDate}]
        </p>
        <p></p>
      </div>

      <div className="flex flex-col mt-4 items-center justify-center ">
        <div className="w-auto flex flex-col gap-2 border p-2">
          <div className="flex sm:flex-col md:flex-row items-center justify-center gap-2">
            <CustomSelect
              name={'Currency'}
              placeholder="select currency"
              options={currencyOptions}
              defaultValue={currencyOptions[0]}
              onChange={(value: any) => setCurrency(value.value)}
              className="w-[180px]"
            />
            <div className="flex flex-col md:mt-2 sm:mt-1">
              <label>From date</label>
              <DatePicker
                format={'DD-MM-YYYY'}
                placeholder={fromDate}
                className={'w-[250px] h-[40px] border p-2 rounded-md'}
                onChange={handleFromDate}
              />
            </div>
            <div className="flex flex-col md:mt-2 sm:mt-1">
              <label>To date</label>
              <DatePicker
                format={'DD-MM-YYYY'}
                placeholder={toDate}
                className={'w-[250px] h-[40px] border p-2 rounded-md'}
                onChange={handleToDate}
              />
            </div>
            <CustomButton
              name={loadingExpectedRenewals ? 'Running...' : 'Run'}
              onClick={handleRunReports}
              className="border h-[40px] w-[15rem] bg-slate-800 text-white rounded-md md:mt-8 sm:mt-4"
            />
          </div>
          <p className="md:text-[1.5rem] sm:text-[0.8rem] font-bold flex justify-center">
            [ {fromDate ? fromDate : fromDate} to {toDate ? toDate : toDate}]
          </p>
          <div className="flex items-center justify-center">
            <CsvDownloader
              filename={`Expected renewals [${fromDate}] - [${toDate}]`}
              extension=".csv"
              disabled={loadingExpectedRenewals}
              columns={columns}
              datas={expectedRenewals}
              className="bg-[#cb7529] h-[40px] rounded-md text-white border w-auto p-2 flex justify-center items-center"
            >
              Download CSV {expectedRenewals.length} records
            </CsvDownloader>
            <div className=" flex justify-center">
              <div className="border h-[40px] w-[15rem] flex items-center justify-center bg-[#cb7529] text-white rounded-md">
                <a
                  href={url}
                  download
                  target="__blank"
                  className="flex justify-center items-center"
                >
                  Download as PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExpectedRenewals
