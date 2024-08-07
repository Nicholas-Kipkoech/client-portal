'use client'
import { getPolicies, getProducts } from '@/app/services/apiServices'
import { getDates } from '@/app/utils/helpers'
import { jwtDecode } from 'jwt-decode'
import React, { createContext, useEffect, useState } from 'react'

const PolicyContext = createContext({})

export const PolicyContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [policies, setPolicies] = useState([])
  const [products, setProducts] = useState([])
  const [loadingPolicies, setLoadingPolices] = useState(false)
  const [policyDocuments, setPolicyDocuments] = useState(null)
  const [user, setUser] = useState<any>({})

  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  useEffect(() => {
    const { startDate, endDate } = getDates()
    setFromDate(startDate)
    setToDate(endDate)
  }, [])

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
    async function fetchProducts() {
      const response = await getProducts()
      setProducts(response.results)
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    async function fetchPolicies() {
      setLoadingPolices(true)
      if (Object.keys(user).length > 0) {
        const response = await getPolicies({
          intermediaryCode: user?.aentCode,
          clientCode: user?.entCode,
          fromDate: fromDate,
          toDate: toDate,
        })
        setLoadingPolices(false)
        setPolicies(response.results)
      }
    }
    fetchPolicies()
  }, [user, fromDate, toDate])

  const currentYear = new Date(Date.now()).getFullYear()
  const nextYear = currentYear + 1

  const filteredPolicies = policies.filter((policy: any) => {
    const policyYear = new Date(policy.periodTo).getFullYear()
    return policyYear === currentYear || policyYear === nextYear
  })

  return (
    <PolicyContext.Provider
      value={{
        loadingPolicies,
        policies,
        filteredPolicies,
        products,
        policyDocuments,
        setPolicyDocuments,
        setFromDate,
        setToDate,
      }}
    >
      {children}
    </PolicyContext.Provider>
  )
}

export default PolicyContext
