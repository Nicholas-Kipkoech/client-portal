"use client";
import React from "react";
import { useContextApi } from "../context/context";
import { IQuotes } from "../types";

const Dashboard = () => {
  const { quotes }: any = useContextApi();
  return (
    <div className="bg-[white] py-4 px-4 h-[100vh]">
      <p className="text-[1.8rem] font-bold">Requested Quotes</p>

      <div>
        <table>
          {quotes.map((quote: IQuotes) => (
            <>
              <tr>
                <th>Model</th>
                <th>Registration Number</th>
                <th>Use</th>
                <th>Year of Manufacture</th>
                <th>Premium (KES)</th>
                <th>Stamp Duty (KES)</th>
                <th>Training Levy (KES)</th>
                <th>PHC Fund (KES)</th>
              </tr>
              <tr
                className="cursor-pointer"
                onClick={() => alert(`Quote ${JSON.stringify(quote)}`)}
              >
                <td>{quote.model}</td>
                <td>{quote.reqNumber}</td>
                <td>{quote.use}</td>
                <td>{quote.yearOfManufacture}</td>
                <td>{quote.premium.toLocaleString()}</td>
                <td>{quote.stamp_duty.toLocaleString()}</td>
                <td>{quote.trainning_levy.toLocaleString()}</td>
                <td>{quote.PHCfund.toLocaleString()}</td>
              </tr>
            </>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
