import React from 'react'
import { ClaimsContextProvider } from '../context/claims/claims-context'
import { ContextProvider } from './providers'
import { ReportsContextProvider } from '../context/reports/reports-context'
import { FinanceContextProvider } from '../context/finance/finance-context'
import { PolicyContextProvider } from '../context/policies/policies-context'

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ContextProvider>
      <ClaimsContextProvider>
        <ReportsContextProvider>
          <PolicyContextProvider>
            <FinanceContextProvider>{children}</FinanceContextProvider>
          </PolicyContextProvider>
        </ReportsContextProvider>
      </ClaimsContextProvider>
    </ContextProvider>
  )
}

export default AppContextProvider
