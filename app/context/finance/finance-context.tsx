'use client'
import {
  getClaimCreditNotes,
  getClaimDebits,
  getReceipts,
} from '@/app/services/apiServices'
import { jwtDecode } from 'jwt-decode'
import React, { createContext, useEffect, useState } from 'react'

const FinanceContext = createContext({})

export const FinanceContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [claimCreditNotes, setClaimCreditNotes] = useState([])
  const [debits, setDebits] = useState([])
  const [receiptsData, setReceiptsData] = useState([])

  const [user, setUser] = useState<any>({})

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
    async function fetchClaimCreditNotes() {
      if (Object.keys(user).length > 0) {
        const response = await getClaimCreditNotes({
          intermediaryCode: user?.aentCode,
          clientCode: user?.entCode,
        })
        setClaimCreditNotes(response.results)
      }
    }
    fetchClaimCreditNotes()
  }, [user])

  useEffect(() => {
    async function fetchClaimDebits() {
      if (Object.keys(user).length > 0) {
        const response = await getClaimDebits({
          intermediaryCode: user?.aentCode,
          clientCode: user?.entCode,
        })
        setDebits(response.results)
      }
    }
    fetchClaimDebits()
  }, [user])

  useEffect(() => {
    async function fetchReceipts() {
      if (Object.keys(user).length > 0) {
        const response = await getReceipts({
          intermediaryCode: user?.aentCode,
          clientCode: user?.entCode,
        })
        setReceiptsData(response.results)
      }
    }
    fetchReceipts()
  }, [user])

  return (
    <FinanceContext.Provider
      value={{ claimCreditNotes, debits, receiptsData, user }}
    >
      {children}
    </FinanceContext.Provider>
  )
}

export default FinanceContext
