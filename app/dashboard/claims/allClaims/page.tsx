'use client'
import { ConfigProvider, Table } from 'antd'
import React, { useContext, useState } from 'react'
import CsvDownloader from 'react-csv-downloader'

import { GrPrevious } from 'react-icons/gr'
import { useRouter } from 'next/navigation'
import { formatDate } from '@/app/utils/helpers'
import CustomInput from '@/app/utils/CustomInput'
import CustomButton from '@/app/utils/CustomButtom'
import ClaimsContext from '@/app/context/claims/claims-context'
import { useContextApi } from '@/app/context/context'

const AllClaim = () => {
  const { claims, loadingClaims }: any = useContext(ClaimsContext)
  const { fromDate, toDate }: any = useContextApi()

  const [initialClaims, setInitialClaims] = useState([])

  const [searchParams, setSearchParams] = useState<any>({
    insured: '',
    carRegNo: '',
    policyNumber: '',
  })

  const handleSearch = () => {
    const filteredClaims = claims.filter((claim: any) => {
      for (const key in searchParams) {
        if (searchParams[key]) {
          // Check if the search param is not empty
          const fieldValue = claim[key]?.toLowerCase() // Get the field value of the policy (if exists)
          const searchTerm = searchParams[key].toLowerCase() // Get the search term
          if (fieldValue && fieldValue.includes(searchTerm)) {
            return true // Include policy if field value matches the search term
          }
        }
      }
      return false
    })
    setInitialClaims(filteredClaims)
  }

  const handleReset = () => {
    setSearchParams({
      insured: '',
      carRegNo: '',
      policyNumber: '',
      lossDate: '',
    })
    setInitialClaims(claims)
  }

  const columns = [
    {
      title: 'Claim No',
      dataIndex: 'claimNumber',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (_: any, item: any) => (
        <div
          className={`${
            item.status === 'Open'
              ? 'bg-blue-400 text-black'
              : 'bg-red-400 text-white'
          } w-[6rem] h-[2rem] rounded-md flex items-center justify-center`}
        >
          {item.status}
        </div>
      ),
    },
    {
      title: 'Policy No',
      dataIndex: 'policyNumber',
    },
    {
      title: 'Insured',
      dataIndex: 'insured',
      render: (_: any, item: any) => (
        <div>
          <p className="text-[13px] font-bold">{item.insured}</p>
          <p className="text-[10px] font-bold text-slate-500">
            {item.intermediary}
          </p>
        </div>
      ),
    },
    {
      title: 'Loss Date',
      dataIndex: 'lossDate',
      render: (_: any, item: any) => <p>{formatDate(item.lossDate)}</p>,
    },
    {
      title: 'Intimation Date',
      dataIndex: 'intimationDate',
      render: (_: any, item: any) => <p>{formatDate(item.intimationDate)}</p>,
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
    },
    {
      title: 'Outstanding',
      dataIndex: 'total',
      render: (_: any, item: any) => <p>{item.total.toLocaleString()}</p>,
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      render: (_: any, item: any) => <p>{item.paid.toLocaleString()}</p>,
    },
  ]

  const formattedColumns = columns.map((column) => {
    return {
      id: column.dataIndex,
      displayName: column.title,
    }
  })
  const router = useRouter()
  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }
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
          All Claims
        </p>
        <p></p>
      </div>
      <div className="flex flex-wrap gap-[0.2rem] sm:flex-col md:flex-row my-2 md:items-center">
        <CustomInput
          name="Policy No"
          onChange={(e) =>
            setSearchParams({ ...searchParams, policyNumber: e.target.value })
          }
          className="border md:w-[15rem] sm:w-full p-2"
          value={searchParams.policyNumber}
        />
        <CustomInput
          name="Insured Name"
          onChange={(e) =>
            setSearchParams({ ...searchParams, insured: e.target.value })
          }
          className="border md:w-[15rem] sm:w-full  p-2"
          value={searchParams.insured}
        />
        <CustomInput
          name="Vehicle Reg No"
          className="border md:w-[10rem] sm:w-full  p-2"
          value={searchParams.carRegNo}
          onChange={(e) =>
            setSearchParams({ ...searchParams, carRegNo: e.target.value })
          }
        />
        <div className="flex">
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
        <CsvDownloader
          filename={`All Claims [${fromDate}] - [${toDate}]`}
          extension=".csv"
          columns={formattedColumns}
          datas={initialClaims.length > 0 ? initialClaims : claims}
          className="bg-[#cb7529] h-[38px] rounded-md text-white border w-auto p-2 flex justify-center items-center mt-5"
        >
          Download CSV
        </CsvDownloader>
      </div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: '#092332',
              headerColor: 'white',
              padding: 2,
              rowHoverBg: '#cb7529',
            },
          },
        }}
      >
        <Table
          columns={columns}
          loading={loadingClaims}
          dataSource={initialClaims.length > 0 ? initialClaims : claims}
          scroll={{ x: 1500 }}
          pagination={{ pageSize: 20 }}
        />
      </ConfigProvider>
    </div>
  )
}

export default AllClaim
