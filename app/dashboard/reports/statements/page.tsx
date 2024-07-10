'use client'
import CsvDownloader from 'react-csv-downloader'
import React, { useContext, useState } from 'react'
import { formatDate, Months } from '@/app/utils/helpers'
import { DatePicker, Spin } from 'antd'
import CustomButton from '@/app/utils/CustomButtom'
import { LoadingOutlined } from '@ant-design/icons'
import ReportsContext from '@/app/context/reports/reports-context'
import { useContextApi } from '@/app/context/context'
import CustomSelect from '@/app/utils/CustomSelect'

const Statements = () => {
  const { user }: any = useContextApi()

  const [fromDate, setFromDate] = useState('1-Jan-2024')
  const [toDate, setToDate] = useState('31-Dec-2024')
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
    setToDate(formattedToDate)
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
  const checkDate = fromDate.split('-').join('') === 'undefinedundefined'
  const handleRunReports = () => {
    if (checkDate === true) {
      alert('Please select from date and to date')
    } else {
      setFromDate(fromDate)
      setToDate(toDate)
    }
  }

  const currencies: any = {
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

  let statementsPdfUrl = `http://192.168.1.112:8001/icon/reports?p_module_name=GL_STATEMENT&destype=cache&desformat=PDF&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=GL.MGR&p_org_code=50&p_menu_code=GL000013&p_grp_code=GL.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=CUSTOMER%20STATEMENT&P_ORG_CODE=50&P_CURRENCY=${currency}&P_BRANCH=&P_CATEGORY=${user.aentCode}&P_INTERMEDIARY=${user.entCode}&P_FM_DT=${fromDate}&P_TO_DT=${toDate}&P_PRODUCT_SORT=Y&P_SHOW_AGEING=Y`
  let statementExcelUrl = `http://192.168.1.112:8001/icon/reports?p_module_name=GL_STATEMENT&destype=cache&desformat=SPREADSHEET&rep_param1=&rep_param2=&rep_param3=&rep_param4=&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=&rep_doc_org=50&rep_doc_no=&p_role_code=GL.MGR&p_org_code=50&p_menu_code=GL000013&p_grp_code=GL.MGR&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=CUSTOMER%20STATEMENT&P_ORG_CODE=50&P_CURRENCY=${currency}&P_BRANCH=&P_CATEGORY=${user.aentCode}&P_INTERMEDIARY=${user.entCode}&P_FM_DT=${fromDate}&P_TO_DT=${toDate}&P_PRODUCT_SORT=Y&P_SHOW_AGEING=Y`
  return (
    <div className="flex flex-col items-center justify-center md:mt-[6rem] sm:mt-[2rem]">
      <p className="flex justify-center font-bold">
        Running Period [ {fromDate}-{toDate} ]
      </p>
      <div className="flex flex-col gap-2 border w-auto p-2">
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
          [ {fromDate} to {toDate}]
        </p>
        <div className="flex justify-center gap-2">
          <div className=" flex justify-center">
            <div className="border h-[40px] flex items-center justify-center w-[15rem] bg-slate-800 text-white rounded-md md:mt-8 sm:mt-4">
              <a
                href={statementExcelUrl}
                target="__blank"
                className="flex justify-center items-center"
              >
                Download Excel
              </a>
            </div>
          </div>
          <div className=" flex justify-center">
            <div className="border h-[40px] w-[15rem] items-center justify-center bg-slate-800 text-white rounded-md md:mt-8 sm:mt-4">
              <a
                href={statementsPdfUrl}
                download
                target="__blank"
                className="flex justify-center items-center"
              >
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statements
