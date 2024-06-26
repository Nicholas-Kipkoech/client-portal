'use client'
import { getClaims } from '@/app/services/apiServices'
import { ThemeContext } from '@emotion/react'
import { jwtDecode } from 'jwt-decode'
import React, { createContext, useEffect, useState } from 'react'

const ClaimsContext = createContext({})

export const ClaimsContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [claims, setClaims] = useState([])
  const [loadingClaims, setLoadingClaims] = useState(false)
  const [user, setUser] = useState<any>({})

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const accessTokenJson: any = localStorage.getItem('accessToken')
      if (accessTokenJson) {
        const decodedToken: any = jwtDecode(accessTokenJson)
        setUser(decodedToken.payload)
      }
    }
  }, [])

  useEffect(() => {
    async function fetchClaims() {
      setLoadingClaims(true)
      if (Object.keys(user).length > 0) {
        const response = await getClaims({
          intermediaryCode: user?.intermediaryCode,
          clientCode: user?.entityCode,
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
