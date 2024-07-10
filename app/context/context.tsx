'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import {
  getPremiumReports,
  getPremiumsAndCommission,
  getReceiptsData,
  getTravelCertificatesService,
  getUpcomingRenewals,
  getUserRoles,
} from '../services/apiServices'
import { format3months, formatYearly, getDates } from '../utils/helpers'

const Context = createContext({})

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState('Home')
  const [user, setUser] = useState<any>({})
  const [years, setYears] = useState<number[]>([])
  const [selectedQuote, setSelectedQuote] = useState({})
  const [isMobile, setIsMobile] = useState(false)

  const [acceptedQuotes, setAcceptedQuotes] = useState(false)

  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const [uwData, setUwData] = useState([])
  const [receipts, setReceipts] = useState([])

  const [loadingUwData, setLoadingUwData] = useState(false)
  const [certificates, setCertificates] = useState([])

  //user roles

  const [roles, setRoles] = useState([])

  useEffect(() => {
    const { startDate, endDate } = getDates()
    setFromDate(startDate)
    setToDate(endDate)
  }, [])

  useEffect(() => {
    const years: number[] = []
    const currentYear = new Date(Date.now()).getFullYear()

    function getYears() {
      for (let i = currentYear - 15; i <= currentYear; i++) {
        years.push(i)
      }
    }
    setYears(years)
    getYears()
  }, [])

  function isUserAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      const accessTokenJson = localStorage.getItem('accessToken')
      if (!accessTokenJson) return false
      const decodedToken: any = jwtDecode(accessTokenJson)
      const currentTime = Date.now() / 1000
      if (currentTime >= decodedToken?.exp) {
        return false
      }
    }
    return true
  }

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
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    async function fetchPremiums() {
      setLoadingUwData(true)
      if (Object.keys(user).length > 0) {
        const response = await getPremiumsAndCommission({
          fromDate: fromDate,
          toDate: toDate,
          intermediaryCode: user?.aentCode,
          clientCode: user?.entCode,
        })
        setLoadingUwData(false)
        setUwData(response.results)
      }
    }
    fetchPremiums()
  }, [user, fromDate, toDate])

  useEffect(() => {
    async function fetchUSerCerts() {
      if (Object.keys(user).length > 0) {
        const response = await getTravelCertificatesService({
          intermediaryCode: user?.aentCode,
          clientCode: user?.entCode,
        })

        setCertificates(response.results)
      }
    }
    fetchUSerCerts()
  }, [user])

  useEffect(() => {
    async function fetchReceipts() {
      if (Object.keys(user).length > 0) {
        const response = await getReceiptsData({
          fromDate: fromDate,
          toDate: toDate,
          intermediaryCode: user?.aentCode,
          clientCode: user?.entCode,
        })
        setReceipts(response.results)
      }
    }
    fetchReceipts()
  }, [user, fromDate, toDate])

  useEffect(() => {
    async function fetchUserRoles() {
      if (Object.keys(user).length > 0) {
        const response = await getUserRoles({
          user_code: user.userCode,
        })

        setRoles(response.results.map((role: any) => role.roleCode))
      }
    }
    fetchUserRoles()
  }, [user])

  const calculateUwData = (uwData: any[]) => {
    const totalPremium = uwData.reduce((total: number, uw) => {
      return (
        total +
        uw.newBusiness +
        uw.renewals +
        uw.refund +
        uw.additional +
        uw.facin +
        uw.commission
      )
    }, 0)
    const totalCommission = uwData.reduce((total: number, uw) => {
      return total + uw.commission
    }, 0)
    return { totalPremium, totalCommission }
  }
  const { totalPremium, totalCommission } = calculateUwData(uwData)

  const calculateTotalByCurrency = (receipts: any[]) => {
    return receipts.reduce((acc: any, curr) => {
      const { currencyCode, receiptAmount } = curr
      // Check if the currency code already exists in the accumulator object
      if (acc[currencyCode]) {
        // If exists, add the current receipt amount to the existing total
        acc[currencyCode].total += receiptAmount
        // Increment the count for the currency code
        acc[currencyCode].count++
      } else {
        // If currency code doesn't exist, create a new entry
        acc[currencyCode] = {
          total: receiptAmount,
          count: 1,
        }
      }
      return acc
    }, {})
  }
  const receiptResults = calculateTotalByCurrency(receipts)

  return (
    <Context.Provider
      value={{
        page,
        setPage,
        isUserAuthenticated,
        user,
        years,
        selectedQuote,
        setSelectedQuote,
        isMobile,
        acceptedQuotes,
        setAcceptedQuotes,
        totalPremium,
        totalCommission,
        setFromDate,
        setToDate,
        loadingUwData,
        receiptResults,
        fromDate,
        toDate,
        certificates,
        roles,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useContextApi = () => useContext(Context)
export default ContextProvider
