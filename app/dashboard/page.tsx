'use client'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { useContextApi } from '../context/context'
import CustomInput from '../utils/CustomInput'
import CustomButton from '../utils/CustomButtom'
import { Months } from '../utils/helpers'
import { DatePicker } from 'antd'
import PolicyContext from '../context/policies/policies-context'
import ClaimsContext from '../context/claims/claims-context'
import FinanceContext from '../context/finance/finance-context'
import ReportsContext from '../context/reports/reports-context'

interface CustomCardProps {
  name: string
  count: number
  to: string | undefined
  currency: boolean
}

const Dashboard = () => {
  const {
    quotes,
    totalPremium,
    totalCommission,
    fromDate: startDate,
    toDate: endDate,
    setFromDate,
    setToDate,
    loadingUwData,
    receiptResults,
  }: any = useContextApi()

  const { filteredPolicies }: any = useContext(PolicyContext)
  const { openClaims }: any = useContext(ClaimsContext)
  const { debits, claimCreditNotes }: any = useContext(FinanceContext)
  const { commPayableResults }: any = useContext(ReportsContext)
  const { roles }: any = useContextApi()

  const [fmDate, setFmDate] = useState('')
  const [toDate, setTdDate] = useState('')

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

  const CustomCard = ({
    name,
    count,
    to,
    currency,
  }: Partial<CustomCardProps>) => {
    return (
      <Link
        href={`dashboard/${to}`}
        className="h-[10rem] w-[20rem] text-[#000000] bg-[#FFFFFF] border flex flex-col items-center justify-center shadow-2xl rounded-[20px] hover:scale-105 hover:border-[#cb7529] hover:border-2  transition-transform duration-300 ease-in-out"
      >
        <p className="flex justify-center text-[1.2rem] text-slate-600 ">
          {name}
        </p>
        <div className="flex justify-center">
          <p className="font-bold text-[1.5rem]  ">
            {' '}
            {count?.toLocaleString()}
          </p>
        </div>
      </Link>
    )
  }
  return (
    <div className="py-2 ">
      {roles.length === 0 ? (
        <div className="flex justify-center h-[80vh] items-center flex-col">
          <p className="text-[2rem] text-red-600 font-bold">
            You have not be assigned to broker or agent!! Contact administrator.
          </p>
        </div>
      ) : (
        <>
          <div className="flex justify-center md:text-[1.5rem] font-bold">
            Running period: [{startDate} to {endDate}]
          </div>
          <div className="flex items-center justify-center gap-2 sm:flex-col md:flex-row">
            <div className="flex flex-col mt-2">
              <label>From date</label>
              <DatePicker
                format={'DD-MM-YYYY'}
                placeholder={'DD-MM-YYYY'}
                className={'w-[250px] h-[40px] border p-2 rounded-md'}
                onChange={handleFromDate}
              />
            </div>
            <div className="flex flex-col mt-2">
              <label>To date</label>
              <DatePicker
                format={'DD-MM-YYYY'}
                placeholder={'DD-MM-YYYY'}
                className={'w-[250px] h-[40px] border p-2 rounded-md'}
                onChange={handleToDate}
              />
            </div>
            <CustomButton
              name={loadingUwData ? 'Running...' : 'Run'}
              onClick={handleRunReports}
              className="border h-[40px] w-[15rem] bg-slate-800 text-white rounded-md md:mt-8 sm:mt-2"
            />
          </div>
          <div className="pt-2 flex flex-wrap gap-2 justify-center ">
            <CustomCard
              name="Running Policies"
              count={filteredPolicies.length}
              to="policies/runningPolicies"
            />
            <CustomCard
              name="Open Claims"
              count={openClaims.length}
              to="claims/openClaims"
            />
            <CustomCard
              name="Debits"
              count={debits.length}
              to="finance/debits"
            />
            <CustomCard
              name="Claim Credit Notes"
              count={claimCreditNotes.length}
              to="finance/claimCreditNotes"
            />
            <CustomCard
              name="Premium Booked"
              count={totalPremium}
              to="reports/premiums"
              currency={true}
            />
            <CustomCard
              name="Commission Earned"
              count={totalCommission}
              to=""
              currency={true}
            />

            <Link
              href={'dashboard/reports/commissionPayable'}
              className={`h-[10rem] bg-white w-[20rem] flex flex-col justify-center border cursor-pointer shadow-2xl rounded-[20px] hover:scale-105 hover:border-[#cb7529] hover:border-2 transition-transform duration-300 ease-in-out `}
            >
              <div className="flex gap-1 flex-col text-[14px] ">
                <p className="flex items-center justify-center text-[1.2rem] text-slate-600">
                  Commision Payable
                </p>
                {/* <div className="justify-between flex font-bold px-2">
      <p>Amount</p>
      <p>Count</p>
    </div> */}
                {Object.entries(commPayableResults).map(
                  ([currencyCode, { total, count }]: any, key) => (
                    <div className="justify-between flex px-2" key={key}>
                      <p className="text-[1.5rem] font-bold flex justify-start items-start">
                        {currencyCode} {total.toLocaleString()}
                      </p>
                      <p className="text-[20px] font-bold flex justify-start items-start">
                        {count.toLocaleString()}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </Link>

            <div
              className={`h-[10rem] bg-white w-[20rem] flex flex-col justify-center border cursor-pointer shadow-2xl rounded-[20px] hover:scale-105 hover:border-[#cb7529] hover:border-2  transition-transform duration-300 ease-in-out  `}
            >
              <div className="flex gap-1 flex-col text-[14px] ">
                <p className="flex items-center justify-center text-[1.2rem] text-slate-600">
                  Receipts
                </p>
                {/* <div className="justify-between flex font-bold px-2">
      <p>Amount</p>
      <p>Count</p>
    </div> */}
                {Object.entries(receiptResults).map(
                  ([currencyCode, { total, count }]: any, key) => (
                    <div className="justify-between flex px-2" key={key}>
                      <p className="text-[1.5rem] font-bold flex justify-start items-start">
                        {currencyCode} {total.toLocaleString()}
                      </p>
                      <p className="text-[20px] font-bold flex justify-start items-start">
                        {count.toLocaleString()}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
