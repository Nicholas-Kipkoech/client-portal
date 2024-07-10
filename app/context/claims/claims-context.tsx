'use client'
import { getClaims } from '@/app/services/apiServices'
import { getDates } from '@/app/utils/helpers'
import { ThemeContext } from '@emotion/react'
import { jwtDecode } from 'jwt-decode'
import React, { createContext, useEffect, useState } from 'react'
import { useContextApi } from '../context'

const ClaimsContext = createContext({})

export const ClaimsContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [claims, setClaims] = useState([])
  const [loadingClaims, setLoadingClaims] = useState(false)
  const [user, setUser] = useState<any>({})

  const { fromDate, toDate }: any = useContextApi()

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
    async function fetchClaims() {
      setLoadingClaims(true)
      if (Object.keys(user).length > 0) {
        const response = await getClaims({
          intermediaryCode: user?.aentCode,
          clientCode: user?.entCode,
          fromDate,
          toDate,
        })
        setLoadingClaims(false)
        setClaims(response.results)
      }
    }
    fetchClaims()
  }, [user])
  const openClaims = claims.filter((claim: any) => {
    return claim.status === 'Open'
  })
  return (
    <ClaimsContext.Provider value={{ claims, loadingClaims, openClaims }}>
      {children}
    </ClaimsContext.Provider>
  )
}

export default ClaimsContext
