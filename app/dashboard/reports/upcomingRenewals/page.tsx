'use client'
import { DatePicker } from 'antd'
import React, { useContext, useState } from 'react'
import { GrPrevious } from 'react-icons/gr'
import { useRouter } from 'next/navigation'
import { format3months, Months } from '@/app/utils/helpers'
import ReportsContext from '@/app/context/reports/reports-context'
import { useContextApi } from '@/app/context/context'
import CsvDownloader from 'react-csv-downloader'
import CustomSelect from '@/app/utils/CustomSelect'
import { currencyOptions } from '../premiums/page'
import CustomButton from '@/app/utils/CustomButtom'

const UpcomingRenewals = () => {
  const { upcomingRenewals }: any = useContext(ReportsContext)
  const { next3Month, systemDate } = format3months()
  const { fromDate, toDate, setFromDate, setToDate }: any = useContextApi()
  const [fmDate, setFmDate] = useState('')
  const [_toDate, setTdDate] = useState('')
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
  const checkDate = fmDate.split('-').join('') === 'undefinedundefined'
  const handleRunReports = () => {
    if (checkDate === true) {
      alert('Please select from date and to date')
    } else {
      setFromDate(fmDate)
      setToDate(_toDate)
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
      id: 'currency',
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
    {
      displayName: 'Reason',
      id: 'reason',
    },
  ]
  const router = useRouter()
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
          Upcoming Renewals [{fromDate} to {toDate}]
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
              name={'Run'}
              onClick={handleRunReports}
              className="border h-[40px] w-[15rem] bg-slate-800 text-white rounded-md md:mt-8 sm:mt-4"
            />
          </div>
          <p className="md:text-[1.5rem] sm:text-[0.8rem] font-bold flex justify-center">
            [ {fromDate ? fromDate : fmDate} to {toDate ? toDate : _toDate}]
          </p>
          <div className="flex items-center justify-center">
            <CsvDownloader
              filename={`Upcoming renewals [${fromDate}] - [${toDate}]`}
              extension=".csv"
              columns={columns}
              datas={upcomingRenewals}
              className="bg-[#cb7529] h-[40px] rounded-md text-white border w-auto p-2 flex justify-center items-center"
            >
              Download CSV {upcomingRenewals.length} records
            </CsvDownloader>
            <div className=" flex justify-center">
              <div className="border h-[40px] w-[15rem] flex items-center justify-center bg-[#cb7529] text-white rounded-md">
                <a
                  href={''}
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

export default UpcomingRenewals
