'use client'
import { useContextApi } from '@/app/context/context'
import FinanceContext from '@/app/context/finance/finance-context'
import CustomButton from '@/app/utils/CustomButtom'
import CustomInput from '@/app/utils/CustomInput'
import { formatDate } from '@/app/utils/helpers'
import { ConfigProvider, Table } from 'antd'
import React, { useContext, useEffect, useState } from 'react'

const Debits = () => {
  const { debits }: any = useContext(FinanceContext)

  const { fromDate, toDate }: any = useContextApi()

  const [initialDebits, setDebits] = useState([])
  const [searchParams, setSearchParams] = useState<any>({
    insured: '',
    vehicleNo: '',
    policyNo: '',
    docNumber: '',
    endNo: '',
  })
  useEffect(() => {
    setDebits(debits)
  }, [debits])

  const handleSearch = () => {
    const filteredDebits = debits.filter((debit: any) => {
      for (const key in searchParams) {
        if (searchParams[key]) {
          const fieldValue = debit[key].toString().toLowerCase()
          const searchTerm = searchParams[key].toLowerCase()
          if (fieldValue && fieldValue.includes(searchTerm)) {
            return true // Exclude if any term doesn't match
          }
        }
      }
      return false // Include if all terms match
    })
    setDebits(filteredDebits)
  }
  //after reset initialize the debits to the initial debits

  const handleReset = () => {
    setSearchParams({
      insured: '',
      vehicleNo: '',
      policyNo: '',
      docNumber: '',
      endNo: '',
    })
    //set the debits to the fetched debits
    setDebits(debits)
  }

  const columns = [
    {
      title: 'Action',
      dataIndex: 'status',
      render: (_: any, item: any) => (
        <div className="flex gap-2">
          <a
            target="_blank"
            href={item.receiptUrl}
            className="p-[4px] border cursor-pointer bg-slate-700 text-white rounded-md"
          >
            Download ETIMS
          </a>{' '}
        </div>
      ),
    },
    {
      title: 'Doc NO',
      dataIndex: 'policyNo',
      render: (_: any, item: any) => <p>{item.docNumber}</p>,
    },
    {
      title: 'GL Date',
      dataIndex: 'endNo',
      render: (_: any, item: any) => <p>{formatDate(item.glDate)}</p>,
    },
    {
      title: 'Policy No',
      dataIndex: 'product',
      render: (_: any, item: any) => <p>{item.policyNo}</p>,
    },
    {
      title: 'End No',
      dataIndex: 'invoiceNumber',
      render: (_: any, item: any) => <p> {item.endNo}</p>,
    },
    {
      title: 'Insured',
      dataIndex: 'invoiceNumber',
      render: (_: any, item: any) => <p>{item.insured}</p>,
    },
    {
      title: 'Premium',
      dataIndex: 'status',
      render: (_: any, item: any) => (
        <p className="flex justify-end"> {item.premium.toLocaleString()}</p>
      ),
    },
    {
      title: 'Paid',
      dataIndex: 'status',
      render: (_: any, item: any) => (
        <p className="flex justify-end"> {item.paid.toLocaleString()}</p>
      ),
    },
    {
      title: 'Outstanding Balance',
      dataIndex: 'status',
      render: (_: any, item: any) => (
        <p className="flex justify-end"> {item.os.toLocaleString()}</p>
      ),
    },
  ]
  return (
    <div>
      <p className="flex justify-center font-bold">
        Running Period [ {fromDate}-{toDate} ]
      </p>
      <div className="md:flex md:flex-wrap sm:flex-nowrap sm:flex-col md:flex-row gap-[0.2rem] my-2 md:items-center">
        <CustomInput
          name="Debit No"
          className="border md:w-[15rem] p-2 sm:w-full"
          value={searchParams.docNumber}
          onChange={(e) =>
            setSearchParams({ ...searchParams, docNumber: e.target.value })
          }
        />
        <CustomInput
          name="Insured"
          onChange={(e) =>
            setSearchParams({ ...searchParams, insured: e.target.value })
          }
          className="border md:w-[15rem]  p-2 sm:w-full"
          value={searchParams.insured}
        />
        <CustomInput
          name="Vehicle Reg No"
          className="border md:w-[10rem] p-2 sm:w-full"
          value={searchParams.vehicleNo}
          onChange={(e) =>
            setSearchParams({ ...searchParams, vehicleNo: e.target.value })
          }
        />
        <CustomInput
          name="Policy No"
          className="border md:w-[15rem] p-2 sm:w-full"
          value={searchParams.policyNo}
          onChange={(e) =>
            setSearchParams({ ...searchParams, policyNo: e.target.value })
          }
        />
        <CustomInput
          name="End No"
          className="border md:w-[15rem] p-2 sm:w-full"
          value={searchParams.endNo}
          onChange={(e) =>
            setSearchParams({ ...searchParams, endNo: e.target.value })
          }
        />

        <div className="sm:flex  gap-2">
          <CustomButton
            onClick={handleSearch}
            name="Search"
            className="border h-[2.2rem] bg-slate-800 text-white sm:w-full md:w-[15rem] mt-7"
          />
          <CustomButton
            onClick={handleReset}
            name="Reset"
            className="border h-[2.2rem] bg-red-600 text-white  sm:w-full md:w-[15rem] mt-7"
          />
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: '#092332',
              headerColor: 'white',
              padding: 2,
              paddingXXS: 5,
              colorBgContainer: 'whitesmoke',
              rowHoverBg: '#cb7529',
            },
          },
        }}
      >
        <Table
          className="mt-2"
          columns={columns}
          dataSource={initialDebits}
          scroll={{ x: 1200 }}
          pagination={{ pageSize: 20 }}
        />
      </ConfigProvider>
    </div>
  )
}

export default Debits
