'use client'
import {
  getCommissionPayable,
  getExpectedRenewals,
  getGLStatements,
  getPolicies,
  getPremiumReports,
  getUpcomingRenewals,
} from '@/app/services/apiServices'
import { format3months, formatYearly } from '@/app/utils/helpers'
import { jwtDecode } from 'jwt-decode'
import React, { createContext, useEffect, useState } from 'react'

const ReportsContext = createContext({})

export const ReportsContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [commissionPayable, setCommissionPayable] = useState([])
  const [loadingCommissions, setLoadingCommissions] = useState(false)
  const [premiumReports, setPremiumReports] = useState([])
  const [loadingPremiumReports, setLoadingPremiumReports] = useState(false)
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [upcomingRenewals, setUpcomingRenewals] = useState([])
  const [expectedRenewals, setExpectedRenewals] = useState([])
  const [fromMonthDate, setFromMonthDate] = useState('1-Apr-2024')
  const [toMonthDate, setToMonthDate] = useState('30-Apr-2024')

  const [glStatements, setGLstatements] = useState([])
  const [loadingGl, setLoadingGl] = useState(false)
  const [user, setUser] = useState<any>({})
  const [loadingUpcomingRenewals, setLoadingUpcomingRenewals] = useState(false)
  const [loadingExpectedRenewals, setLoadingExpectedRenewals] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accessTokenJson: any = localStorage.getItem('accessToken')
      if (accessTokenJson) {
        const decodedToken: any = jwtDecode(accessTokenJson)
        setUser(decodedToken)
      }
    }
  }, [])

  useEffect(() => {
    async function fetchCommissionPayable() {
      setLoadingCommissions(true)
      if (Object.keys(user).length > 0) {
        const response = await getCommissionPayable({
          fromDate: fromMonthDate,
          toDate: toMonthDate,
          intermediaryCode: user?.aentCode,
          clientCode: user?.entCode,
        })
        setLoadingCommissions(false)
        setCommissionPayable(response.results)
      }
    }
    fetchCommissionPayable()
  }, [user, toMonthDate, fromMonthDate])

  useEffect(() => {
    async function fetchGlstatements() {
      setLoadingGl(true)
      if (Object.keys(user).length > 0) {
        const response = await getGLStatements({
          fromDate: fromMonthDate,
          toDate: toMonthDate,
          intermediaryCode: user?.aentCode,
          clientCode: user?.entCode,
        })

        setLoadingGl(false)
        setGLstatements(response.results)
      }
    }
    fetchGlstatements()
  }, [user, fromMonthDate, toMonthDate])

  useEffect(() => {
    async function fetchPremiumReports() {
      setLoadingPremiumReports(true)
      if (Object.keys(user).length > 0) {
        const response = await getPremiumReports({
          fromDate: fromDate,
          toDate: toDate,
          intermediaryCode: user?.aentCode,
          clientCode: user?.entCode,
        })
        setLoadingPremiumReports(false)
        setPremiumReports(response.results)
      }
    }
    fetchPremiumReports()
  }, [user, fromDate, toDate])

  async function fetchUpcomingRenewals(fromDate: string, toDate: string) {
    setLoadingUpcomingRenewals(true)
    if (Object.keys(user).length > 0) {
      const response = await getUpcomingRenewals({
        fromDate: fromDate,
        toDate: toDate,
        intermediaryCode: user?.aentCode,
        clientCode: user?.entCode,
      })

      setUpcomingRenewals(response.results)
      setLoadingUpcomingRenewals(false)
    }
  }

  async function fetchExpectedRenewals(fromDate: string, toDate: string) {
    setLoadingExpectedRenewals(true)
    if (Object.keys(user).length > 0) {
      const response = await getExpectedRenewals({
        fromDate: fromDate,
        toDate: toDate,
        intermediaryCode: user?.aentCode,
        clientCode: user?.entCode,
      })

      setExpectedRenewals(response.results)
      setLoadingExpectedRenewals(false)
    }
  }

  useEffect(() => {
    const { startDate, endDate } = formatYearly('2024')
    setFromDate(startDate)
    setToDate(endDate)
  }, [])

  const filteredCommissionPayable = commissionPayable.filter(
    (commissionPayable: any) => {
      return (
        commissionPayable.osPremium === -50 ||
        commissionPayable.osPremium === 50 ||
        commissionPayable.osPremium === 0
      )
    },
  )
  function calculateCommPayable(commissionPayable: any[]) {
    return commissionPayable.reduce((acc: any, comm) => {
      const { currencyCode, commission, WHTonComm } = comm
      if (acc[currencyCode]) {
        acc[currencyCode].total += Number(commission - WHTonComm)
        acc[currencyCode].count++
      } else {
        acc[currencyCode] = {
          total: Number(commission - WHTonComm),
          count: 1,
        }
      }
      return acc
    }, {})
  }

  const commPayableResults = calculateCommPayable(filteredCommissionPayable)

  return (
    <ReportsContext.Provider
      value={{
        filteredCommissionPayable,
        loadingCommissions,
        loadingGl,
        premiumReports,
        loadingPremiumReports,
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        glStatements,
        upcomingRenewals,
        commPayableResults,
        fetchUpcomingRenewals,
        loadingUpcomingRenewals,
        expectedRenewals,
        loadingExpectedRenewals,
        fetchExpectedRenewals,
      }}
    >
      {children}
    </ReportsContext.Provider>
  )
}

export default ReportsContext
