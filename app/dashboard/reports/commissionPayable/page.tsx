'use client'
import { ConfigProvider, Table } from 'antd'
import React, { useContext } from 'react'
import { GrPrevious } from 'react-icons/gr'
import { useRouter } from 'next/navigation'
import ReportsContext from '@/app/context/reports/reports-context'
import { useContextApi } from '@/app/context/context'

const CommissionPayble = () => {
  function calculatePercentage(num1: number, num2: number): any {
    const absNum1 = Math.abs(num1)
    const absNum2 = Math.abs(num2)
    return Math.floor(100 / (absNum1 / absNum2))
  }
  const { fromDate, toDate }: any = useContextApi()

  const {
    filteredCommissionPayable,
    loadingCommissions,
    commPayableResults,
  }: any = useContext(ReportsContext)

  const columns = [
    {
      title: 'Policy No',
      dataIndex: 'policyNo',
    },
    {
      title: 'End No',
      dataIndex: 'endNo',
    },
    {
      title: 'GL Date',
      dataIndex: 'glDate',
    },
    {
      title: 'Insured',
      dataIndex: 'invoiceNumber',
      render: (_: any, item: any) => (
        <p className="text-[13px] font-bold text-ellipsis">{item.insured}</p>
      ),
    },
    {
      title: 'Total Premium',
      dataIndex: 'lossDate',
      render: (_: any, item: any) => (
        <p>
          {item.currencyCode} {item.totalPremium.toLocaleString()}
        </p>
      ),
    },
    {
      title: 'Paid Premium',
      dataIndex: 'intimationDate',
      render: (_: any, item: any) => (
        <p>
          {item.currencyCode} {item.paidPremium.toLocaleString()}
        </p>
      ),
    },
    {
      title: 'Outstanding',
      dataIndex: 'currency',
      render: (_: any, item: any) => (
        <p>
          {item.currencyCode} {item.osPremium.toLocaleString()}
        </p>
      ),
    },
    {
      title: 'Basic Premium',
      dataIndex: 'total',
      render: (_: any, item: any) => (
        <p>
          {item.currencyCode} {item.basicPremium.toLocaleString()}
        </p>
      ),
    },
    {
      title: 'Comm Rate',
      dataIndex: 'paid',
      render: (_: any, item: any) => (
        <p>{calculatePercentage(item.basicPremium, item.commission)}%</p>
      ),
    },
    {
      title: 'Commission',
      dataIndex: 'paid',
      render: (_: any, item: any) => (
        <p>
          {item.currencyCode} {item.commission.toLocaleString()}
        </p>
      ),
    },
    {
      title: 'WHT on Comm',
      dataIndex: 'paid',
      render: (_: any, item: any) => (
        <p>
          {item.currencyCode} {item.WHTonComm.toLocaleString()}
        </p>
      ),
    },
    {
      title: 'Paid Commission',
      dataIndex: 'paid',
      render: (_: any, item: any) => (
        <p>
          {item.currencyCode} {item.paidComm.toLocaleString()}
        </p>
      ),
    },
    {
      title: 'Net Comm Payable',
      dataIndex: 'paid',
      render: (_: any, item: any) => (
        <p>
          {item.currencyCode}{' '}
          {Math.floor(item.commission - item.WHTonComm).toLocaleString()}
        </p>
      ),
    },
  ]
  const router = useRouter()
  return (
    <div>
      <p className="flex justify-center font-bold">
        Running Period [ {fromDate}-{toDate} ]
      </p>
      <div className="flex justify-between items-center">
        <div
          className="flex items-center  bg-slate-900 mt-2 px-2 text-white"
          onClick={() => router.back()}
        >
          <GrPrevious size={15} />
          <p>Back</p>
        </div>
        <p className="md:text-[1.8rem] sm:text-[1.2rem] font-bold">
          Commission Payable
        </p>
        <div className="flex flex-col">
          {Object.entries(commPayableResults).map(
            ([currencyCode, { total }]: any, key) => (
              <p className="text-[1.3rem] font-bold">
                Total {currencyCode} {Math.floor(total).toLocaleString()}
              </p>
            ),
          )}
        </div>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: '#092332',
              headerColor: 'white',
              padding: 10,
              rowHoverBg: '#cb7529',
            },
          },
        }}
      >
        <Table
          columns={columns}
          loading={loadingCommissions}
          dataSource={filteredCommissionPayable}
          scroll={{ x: 1800 }}
          pagination={{ pageSize: 20 }}
        />
      </ConfigProvider>
    </div>
  )
}

export default CommissionPayble
