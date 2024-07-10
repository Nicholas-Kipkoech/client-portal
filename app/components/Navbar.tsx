'use client'

import React from 'react'
import { useContextApi } from '../context/context'
import { usePathname, useRouter } from 'next/navigation'

import CustomButton from '../utils/CustomButtom'
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { IoChevronDownCircleOutline, IoMenu } from 'react-icons/io5'
import { LiaFileInvoiceSolid } from 'react-icons/lia'
import { VscOrganization } from 'react-icons/vsc'
import { GrOverview } from 'react-icons/gr'
import Link from 'next/link'

const Navbar = () => {
  const { user }: any = useContextApi()

  const router = useRouter()

  const pathname = usePathname()

  function formatName(name: string) {
    if (name !== undefined) {
      let finalName = ''
      const splittedName = name?.split(' ')
      for (let i = 0; i < splittedName?.length; i++) {
        finalName += splittedName[i][0]
      }
      return finalName
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('accessToken')
    router.push('/')
  }

  const menuItems = [
    {
      title: 'Insights',
      list: [
        {
          title: 'Overview',
          path: '/dashboard',
          icon: <GrOverview />,
        },
      ],
    },
    {
      title: 'Quotes',
      list: [
        {
          title: 'Request Quote',
          path: '/dashboard/quotes/add-quote',
          icon: <VscOrganization />,
        },
        {
          title: 'View Quotes',
          path: '/dashboard/quotes',
          icon: <LiaFileInvoiceSolid />,
        },
      ],
    },
    {
      title: 'Policies',
      list: [
        {
          title: 'View Running policies',
          path: '/dashboard/policies/runningPolicies',
          icon: <LiaFileInvoiceSolid />,
        },
        {
          title: 'View All policies',
          path: '/dashboard/policies/allPolicies',
          icon: <LiaFileInvoiceSolid />,
        },
      ],
    },
    {
      title: 'Claims',
      list: [
        {
          title: 'File claim',
          path: '/dashboard/claims/file-claim',
          icon: <LiaFileInvoiceSolid />,
        },
        {
          title: 'Open claims',
          path: '/dashboard/claims/openClaims',
          icon: <LiaFileInvoiceSolid />,
        },
        {
          title: 'View All claims',
          path: '/dashboard/claims/allClaims',
          icon: <LiaFileInvoiceSolid />,
        },
      ],
    },
    {
      title: 'Reports',
      list: [
        {
          title: 'View Premiums',
          path: '/dashboard/reports/premiums',
          icon: <LiaFileInvoiceSolid />,
        },
        {
          title: 'View Statements',
          path: '/dashboard/reports/statements',
          icon: <LiaFileInvoiceSolid />,
        },
        {
          title: 'Upcoming Renewals',
          path: '/dashboard/reports/upcomingRenewals',
          icon: <LiaFileInvoiceSolid />,
        },
        {
          title: 'Commsion Payable',
          path: '/dashboard/reports/commissionPayable',
          icon: <LiaFileInvoiceSolid />,
        },
      ],
    },
    {
      title: 'Finance',
      list: [
        {
          title: 'Receipts Download',
          path: '/dashboard/finance/receipts',
          icon: <LiaFileInvoiceSolid />,
        },
        {
          title: 'Claim Credit Notes',
          path: '/dashboard/finance/claimCreditNotes',
          icon: <LiaFileInvoiceSolid />,
        },
        {
          title: 'Debits',
          path: '/dashboard/finance/debits',
          icon: <LiaFileInvoiceSolid />,
        },
      ],
    },
  ]

  return (
    <div className="sticky top-0 bg-[#092332] flex justify-between items-center z-10  h-auto ">
      <div className="md:hidden sm:block">
        <Menu>
          <MenuButton as={Button} rightIcon={<IoMenu />} />
          <MenuList
            className="overflow-y-auto scroll max-h-[300px]"
            backgroundColor={'#092332'}
          >
            {menuItems.map((item, key) => (
              <>
                <MenuItem key={key} className="">
                  {item.title}
                </MenuItem>
                <div className="ml-10 flex flex-col">
                  {item.list.map((cat: any, key) => (
                    <Link
                      key={key}
                      href={cat.path ? cat.path : ''}
                      className={`p-[5px] flex items-center  pl-6 gap-[5px] text-[13px] text-white hover:bg-[#2e2f3b] hover:text-white m-[2px] rounded-[10px] ${
                        pathname === cat.path && 'bg-[#995224]'
                      }`}
                    >
                      {cat.title}
                    </Link>
                  ))}
                </div>
              </>
            ))}
          </MenuList>
        </Menu>
      </div>
      <div className="sm:hidden md:block "></div>
      <span className="flex  sm:text-[12px] text-white md:hidden sm:block font-bold cursor-pointer">
        {user.entName}
      </span>
      <div className="flex gap-4 items-center m-3">
        <div className="border h-auto p-2 rounded-md  sm:hidden md:block bg-white w-auto flex items-center justify-center flex-col">
          <div className="flex items-center gap-2">
            <div className="p-3  border rounded-[50%] text-bold bg-slate-900 text-white items-center flex justify-center">
              {formatName(user?.userDesc)}
            </div>
            <div className="flex gap-2 items-center">
              <div>
                <p className="font-bold text-[0.8rem] ">{user.userDesc}</p>
                {user.entName === '' && (
                  <>
                    <p className="font-bold text-[0.8rem] ">
                      Category [{user.aentCode === '70' ? 'Broker' : 'Client'}]
                    </p>
                    <p className="font-bold text-[0.8rem] ">
                      Code [{user.aentCode}]
                    </p>
                  </>
                )}
              </div>

              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<IoChevronDownCircleOutline />}
                ></MenuButton>
                <MenuList>
                  <div className="p-2">
                    <p className="font-bold text-[0.8rem] ">
                      {' '}
                      Email accounts [{user.userEmail ? user.userEmail : 'N/A'}]
                    </p>
                    <p className="font-bold text-[0.8rem] ">
                      Phone No [{user.userPhone ? user.userPhone : 'N/A'}]
                    </p>
                    {user.entName === '' && (
                      <p className="font-bold text-[0.8rem] ">
                        Type [{user.orgType}]
                      </p>
                    )}
                  </div>
                </MenuList>
              </Menu>
            </div>
          </div>
        </div>
        <CustomButton
          name="Logout"
          onClick={handleLogout}
          className="h-[2rem] w-[5rem]  bg-[#cb7529] rounded-md text-white"
        />
      </div>
    </div>
  )
}

export default Navbar
