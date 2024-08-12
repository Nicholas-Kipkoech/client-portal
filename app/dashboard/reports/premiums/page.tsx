'use client'
import CsvDownloader from 'react-csv-downloader'
import React, { useContext, useState } from 'react'
import { formatDate, Months } from '@/app/utils/helpers'
import { DatePicker, Spin } from 'antd'
import CustomButton from '@/app/utils/CustomButtom'
import { LoadingOutlined } from '@ant-design/icons'
import ReportsContext from '@/app/context/reports/reports-context'
import { GrPrevious } from 'react-icons/gr'
import { useRouter } from 'next/navigation'
import { useContextApi } from '@/app/context/context'
import CustomSelect from '@/app/utils/CustomSelect'

export const currencies: any = {
  KSH: 'Kenya Shilling',
  USD: 'US Dollar',
  EURO: 'Euros',
  GBP: 'British Pound',
  YEN: 'Japanese Yen',
}
export const currencyOptions = Object.keys(currencies).map((currency) => {
  return {
    value: currency,
    label: currencies[currency],
  }
})

const Premiums = () => {
  const {
    premiumReports,
    setFromDate,
    setToDate,
    loadingPremiumReports,
    fromDate,
    toDate: _toDate,
  }: any = useContext(ReportsContext)
  const { user }: any = useContextApi()

  const columns = [
    {
      id: 'policyNo',
      displayName: 'Policy Number',
    },
    {
      id: 'endNo',
      displayName: 'Endorsement Number',
    },
    {
      id: 'sumInsured',
      displayName: 'Sum Insured',
    },
    {
      id: 'premClass',
      displayName: 'Class',
    },
    {
      id: 'premSubClass',
      displayName: 'Sub Class',
    },
    {
      id: 'insuredName',
      displayName: 'Insured Name',
    },
    {
      id: 'issueDate',
      displayName: 'Issue Date',
    },
    {
      id: 'start',
      displayName: 'Start Date',
    },
    {
      id: 'expiry',
      displayName: 'Expiry',
    },
    {
      id: 'premium',
      displayName: 'Premium',
    },
    {
      id: 'earthQuake',
      displayName: 'EarthQuake',
    },
    {
      id: 'pvt',
      displayName: 'PVT',
    },
    {
      id: 'stamp',
      displayName: 'Stamp',
    },
    {
      id: 'PHCfund',
      displayName: 'PHC Fund',
    },
    {
      id: 'traningLevy',
      displayName: 'Training Levy',
    },
    {
      id: 'PTACharge',
      displayName: 'PTA Charge',
    },
    {
      id: 'AACharge',
      displayName: 'AA Charge',
    },
    {
      id: 'witHoldingTax',
      displayName: 'WitHolding Tax',
    },
    {
      id: 'brokerCommNet',
      displayName: 'Broker Commission Net',
    },
    {
      id: 'netPremium',
      displayName: 'Net premium',
    },
  ]

  const mappedPremiums = premiumReports.map((premium: any) => {
    return {
      policyNo: premium.policyNo,
      endNo: premium.endNo,
      sumInsured: premium.sumInsured,
      premClass: premium.premClass,
      premSubClass: premium.premSubClass,
      insuredName: premium.insuredName,
      issueDate: formatDate(premium.issueDate),
      start: formatDate(premium.start),
      expiry: formatDate(premium.expiry),
      premium: premium.premium,
      earthQuake: premium.earthQuake,
      pvt: premium.pvt,
      stamp: premium.stamp,
      PHCfund: premium.PHCfund,
      traningLevy: premium.traningLevy,
      PTACharge: premium.PTACharge,
      AACharge: premium.AACharge,
      witHoldingTax: premium.witHoldingTax,
      brokerCommNet: premium.brokerCommNet,
      netPremium:
        premium.premium +
        premium.pvt +
        premium.stamp +
        premium.earthQuake +
        premium.PHCfund +
        premium.traningLevy +
        premium.PTACharge +
        premium.AACharge +
        premium.brokerCommNet -
        premium.witHoldingTax,
    }
  })
  const [fmDate, setFmDate] = useState('')
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
  const checkDate = fmDate.split('-').join('') === 'undefinedundefined'
  const handleRunReports = () => {
    if (checkDate === true) {
      alert('Please select from date and to date')
    } else {
      setFromDate(fmDate)
      setToDate(toDate)
    }
  }

  const router = useRouter()

  const premiumRegisterUrl = `http://192.168.1.112:8001/icon/reports?p_module_name=UW_PREMIUM_REGISTER&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=UW.ADF&p_org_code=50&p_menu_code=UW000065&p_grp_code=UW.ADF&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=PREMIUM%20REGISTER&P_ORG_CODE=50&P_CURRENCY=${currency}&P_BRANCH_GROUP=&P_BRANCH=&P_ENDORSEMENT=&P_CLASS=&P_SUBCLASS_CODE=&P_CATEGORY=${user.aentCode}&P_INTERMEDIARY=${user.entCode}&P_CLIENT=&P_MIN_VALUE=&P_COMESA=Y&P_BUS_TYPE=&P_IND_GRP=&P_FM_DT=${fromDate}&P_TO_DT=${_toDate}&P_ACTIVE_DATE=`

  return (
    <div>
      <div className="flex justify-between">
        <div
          className="flex items-center  bg-slate-900 mt-2 px-2 text-white"
          onClick={() => router.back()}
        >
          <GrPrevious size={15} />
          <p>Back</p>
        </div>
        <p className="text-[1.7rem] font-bold">Premium Register</p>
        <p></p>
      </div>
      <div className="flex flex-col mt-4 items-center justify-center ">
        <p className="flex justify-center font-bold">
          Running Period [ {fromDate} to {_toDate} ]
        </p>
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
                placeholder={_toDate}
                className={'w-[250px] h-[40px] border p-2 rounded-md'}
                onChange={handleToDate}
              />
            </div>
            <CustomButton
              name={loadingPremiumReports ? 'Running...' : 'Run'}
              onClick={handleRunReports}
              className="border h-[40px] w-[15rem] bg-slate-800 text-white rounded-md md:mt-8 sm:mt-4"
            />
          </div>
          <p className="md:text-[1.5rem] sm:text-[0.8rem] font-bold flex justify-center">
            [ {fmDate ? fmDate : fromDate} to {toDate ? toDate : _toDate}]
          </p>
          <div className="flex items-center justify-center">
            <CsvDownloader
              disabled={loadingPremiumReports}
              filename={`Premium Register [${fmDate}] - [${toDate}]`}
              extension=".csv"
              columns={columns}
              datas={mappedPremiums}
              className="bg-[#cb7529] h-[40px] rounded-md text-white border w-auto p-2 flex justify-center items-center"
            >
              {loadingPremiumReports ? (
                <Spin
                  spinning={loadingPremiumReports}
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 25,
                        color: 'white',
                      }}
                    />
                  }
                />
              ) : (
                `Download CSV ${mappedPremiums.length} records`
              )}
            </CsvDownloader>
            <div className=" flex justify-center">
              <div className="border h-[40px] w-[15rem] flex items-center justify-center bg-[#cb7529] text-white rounded-md">
                <a
                  href={premiumRegisterUrl}
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

export default Premiums
