"use client";
import Link from "next/link";
import React from "react";
import { useContextApi } from "../context/context";

interface CustomCardProps {
  name: string;
  count: number;
  to: string | undefined;
}

const Dashboard = () => {
  const { quotes, claims, policies }: any = useContextApi();
  const CustomCard = ({ name, count, to }: Partial<CustomCardProps>) => {
    return (
      <Link
        href={`dashboard/${to}`}
        className="h-[10rem] w-[20rem] border flex flex-col items-center justify-center shadow-xl"
      >
        <p className="flex justify-center text-[2rem] font-bold">{name}</p>
        <div className="flex justify-center">
          <p className="font-bold text-[1.8rem]">{count?.toLocaleString()}</p>
        </div>
      </Link>
    );
  };

  return (
    <div className="pt-2 flex flex-wrap gap-2">
      <CustomCard name="Quotes" count={quotes.length} to="quotes" />
      <CustomCard name="Policies" count={policies.length} to="policies" />
      <CustomCard name="Claims" count={claims.length} to="claims" />
      <CustomCard name="Receipts" count={0} to="" />
    </div>
  );
};

export default Dashboard;
