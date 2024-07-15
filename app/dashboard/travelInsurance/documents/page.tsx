'use client'
import React from 'react'

import { GrPrevious } from 'react-icons/gr'
import { ConfigProvider, Table } from 'antd'
import { useRouter } from 'next/navigation'
import { useContextApi } from '@/app/context/context'

const Documents = () => {
  const router = useRouter()

  const { certificates }: any = useContextApi()

  const columns = [
    {
      title: 'Travel Cert No',
      dataIndex: 'travelCertNo',
    },
    {
      title: 'Downloads',
      dataIndex: 'insured',
      render: (_: any, item: any) => (
        <a href={item.travelCertUrl} target="_blank">
          Download Cert
        </a>
      ),
    },
    {
      title: 'Policy No',
      dataIndex: 'policyNo',
    },
    {
      title: 'Endorsement No',
      dataIndex: 'endNo',
    },

    {
      title: 'Intermediary',
      dataIndex: 'intermediary',
    },
    {
      title: 'Insured',
      dataIndex: 'insured',
    },
  ]

  return (
    <div className="bg-[white] py-4 px-4 h-auto md:flex md:flex-col">
      <div
        onClick={() => router.back()}
        className="flex justify-between  cursor-pointer"
      >
        <div className="flex items-center">
          <GrPrevious size={15} />
          <p>Back</p>
        </div>
        <p className="md:text-[1.8rem] sm:text-[1.2rem] font-bold">
          Travel Certificates
        </p>
        <p></p>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: '#092332',
              headerColor: 'white',
              colorBgContainer: 'whitesmoke',
              rowHoverBg: '#cb7529',
              padding: 10,
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={certificates}
          className=" hover:bg-none"
          scroll={{ x: 1200 }}
        />
      </ConfigProvider>
    </div>
  )
}

export default Documents
