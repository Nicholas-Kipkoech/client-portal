'use client'
import { useContextApi } from '@/app/context/context'
import FinanceContext from '@/app/context/finance/finance-context'
import CustomButton from '@/app/utils/CustomButtom'
import CustomInput from '@/app/utils/CustomInput'
import { formatDate } from '@/app/utils/helpers'
import { ConfigProvider, Table } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { GrPrevious } from 'react-icons/gr'

const Receipts = () => {
  const router = useRouter()
  const { receiptsData, user }: any = useContext(FinanceContext)
  const { fromDate, toDate }: any = useContextApi()

  const [initialReceipt, setInitialReceipt] = useState([])
  const [searchParams, setSearchParams] = useState<any>({
    from: '',
    receiptNo: '',
    amount: '',
  })

  const handleSearch = () => {
    const filteredClaims = receiptsData.filter((receipt: any) => {
      for (const key in searchParams) {
        if (searchParams[key]) {
          // Check if the search param is not empty
          const fieldValue = receipt[key]?.toLowerCase() // Get the field value of the policy (if exists)
          const searchTerm = searchParams[key].toLowerCase() // Get the search term
          if (fieldValue && fieldValue.includes(searchTerm)) {
            return true // Include policy if field value matches the search term
          }
        }
      }
      return false
    })
    setInitialReceipt(filteredClaims)
  }

  const handleReset = () => {
    setSearchParams({
      from: '',
      amount: '',
      receiptNo: '',
    })
    setInitialReceipt(receiptsData)
  }

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
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
            Download Receipt
          </a>{' '}
        </div>
      ),
    },
    {
      title: 'Receipt NO',
      dataIndex: 'policyNo',
      render: (_: any, item: any) => <p>{item.receiptNo}</p>,
    },
    {
      title: 'Client',
      dataIndex: 'endNo',
      render: (_: any, item: any) => <p>{item.from}</p>,
    },
    {
      title: 'Intermediary',
      dataIndex: 'endNo',
      render: (_: any, item: any) => <p>{user.entName}</p>,
    },
    {
      title: 'Amount',
      dataIndex: 'invoiceNumber',
      render: (_: any, item: any) => <p> KSH {item.amount.toLocaleString()}</p>,
    },
    {
      title: 'GL Date',
      dataIndex: 'invoiceNumber',
      render: (_: any, item: any) => <p>{formatDate(item.GLDate)}</p>,
    },
    {
      title: 'Receipt Mode',
      dataIndex: 'status',
      render: (_: any, item: any) => <p>{item.receiptMode}</p>,
    },
    {
      title: 'Narration',
      dataIndex: 'product',
      render: (_: any, item: any) => (
        <p className="truncate">{item.narration}</p>
      ),
    },
  ]
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
        <p className="md:text-[1.8rem] sm:text-[1.2rem] font-bold">Receipts</p>
        <p></p>
      </div>
      <div className="flex md:flex-wrap sm:flex-col md:flex-row gap-[0.2rem] my-2 md:items-center">
        <CustomInput
          onKeyUp={onKeyUp}
          name="Insured Name"
          onChange={(e) =>
            setSearchParams({ ...searchParams, from: e.target.value })
          }
          className="border md:w-[15rem] sm:w-full p-2"
          value={searchParams.from}
        />
        <CustomInput
          onKeyUp={onKeyUp}
          name="Receipt No"
          className="border md:w-[10rem] sm:w-full p-2"
          value={searchParams.receiptNo}
          onChange={(e) =>
            setSearchParams({ ...searchParams, receiptNo: e.target.value })
          }
        />
        <CustomInput
          onKeyUp={onKeyUp}
          name="Amount"
          className="border md:w-[10rem] sm:w-full p-2"
          value={searchParams.amount}
          onChange={(e) =>
            setSearchParams({ ...searchParams, amount: e.target.value })
          }
        />
        <div className="sm:flex">
          <CustomButton
            onClick={handleSearch}
            name="Search"
            className="border h-[2.2rem] bg-slate-800 text-white md:w-[5rem] sm:w-full mt-7"
          />
          <CustomButton
            onClick={handleReset}
            name="Reset"
            className="border h-[2.2rem] bg-red-600 text-white md:w-[5rem] sm:w-full mt-7"
          />
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: '#092332',
              headerColor: 'white',
              padding: 4,
              colorBgContainer: 'whitesmoke',
              rowHoverBg: '#cb7529',
              lineHeight: 2,
            },
          },
        }}
      >
        <Table
          className="mt-2"
          columns={columns}
          dataSource={initialReceipt.length > 0 ? initialReceipt : receiptsData}
          scroll={{ x: 2000 }}
          pagination={{ pageSize: 20 }}
        />
      </ConfigProvider>
    </div>
  )
}

export default Receipts
