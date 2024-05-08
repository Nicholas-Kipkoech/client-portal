"use client";
import { ConfigProvider, Spin, Table } from "antd";
import React, { useContext } from "react";
import { GrPrevious } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { formatDate } from "@/app/utils/helpers";
import { LoadingOutlined } from "@ant-design/icons";
import CsvDownloader from "react-csv-downloader";
import ReportsContext from "@/app/context/reports/reports-context";

const Statements = () => {
  const { glStatements, loadingGl }: any = useContext(ReportsContext);

  const columns = [
    {
      title: "Issue Date",
      dataIndex: "issueDate",
      render: (_: any, item: any) => <p>{formatDate(item.issueDate)}</p>,
    },
    {
      title: "Doc No",
      dataIndex: "docNo",
    },
    {
      title: "End No",
      dataIndex: "endNo",
    },
    {
      title: "Debit No",
      dataIndex: "debitNo",
      render: (_: any, item: any) => (
        <p className="text-[13px]">{item.debitNo}</p>
      ),
    },
    {
      title: "Vehicles",
      dataIndex: "vehicles",
      render: (_: any, item: any) => <p> {item.vehicles}</p>,
    },
    {
      title: "Insured",
      dataIndex: "insured",
      render: (_: any, item: any) => <p>{item.insured}</p>,
    },
    {
      title: "DR/DC",
      dataIndex: "drCr",
      render: (_: any, item: any) => (
        <p>{item.drCr === "D" ? "Debit" : "Credit"}</p>
      ),
    },
    {
      title: "Currency",
      dataIndex: "currency",
      render: (_: any, item: any) => <p>{item.currency}</p>,
    },
    {
      title: "Premium",
      dataIndex: "premium",
      render: (_: any, item: any) => (
        <p> KSH {item.premium.toLocaleString()}</p>
      ),
    },

    {
      title: "PVT premium",
      dataIndex: "PVTprem",
      render: (_: any, item: any) => (
        <p> KSH {item.PVTprem.toLocaleString()}</p>
      ),
    },
    {
      title: "Stamp Duty",
      dataIndex: "stampDuty",
      render: (_: any, item: any) => (
        <p>KSH {item.stampDuty.toLocaleString()}</p>
      ),
    },
    {
      title: "Training Levy",
      dataIndex: "trainingLevy",
      render: (_: any, item: any) => (
        <p>KSH {item.trainingLevy.toLocaleString()}</p>
      ),
    },
    {
      title: "PHC Fund",
      dataIndex: "PHCfund",
      render: (_: any, item: any) => <p>KSH {item.PHCfund.toLocaleString()}</p>,
    },
    {
      title: "Comm",
      dataIndex: "comm",
      render: (_: any, item: any) => <p> KSH {item.comm.toLocaleString()}</p>,
    },
    {
      title: "W Tax",
      dataIndex: "Wtax",
      render: (_: any, item: any) => <p> KSH {item.Wtax.toLocaleString()}</p>,
    },
    {
      title: "Policy Net",
      dataIndex: "policyNet",
      render: (_: any, item: any) => (
        <p>
          {" "}
          KSH{" "}
          {(
            item.premium +
            item.PVTprem +
            item.stampDuty +
            item.Wtax +
            item.trainingLevy +
            item.PHCfund -
            item.comm
          ).toLocaleString()}
        </p>
      ),
    },
    {
      title: "Credit Net",
      dataIndex: "creditNet",
    },
    {
      title: "Outstanding",
      dataIndex: "outstanding",
    },
  ];

  const mappedColumns = columns.map((column) => {
    return {
      id: column.dataIndex,
      displayName: column.title,
    };
  });

  const mappedStatements = glStatements.map((statement: any) => {
    return {
      issueDate: formatDate(statement.issueDate),
      docNo: statement.docNo,
      endNo: statement.endNo,
      debitNo: statement.debitNo,
      vehicles: statement.vehicles,
      insured: statement.insured,
      drCr: statement.drCr === "D" ? "Debit" : "Credit",
      currency: statement.currency,
      premium: statement.premium.toLocaleString(),
      PVTprem: statement.PVTprem.toLocaleString(),
      stampDuty: statement.stampDuty.toLocaleString(),
      trainingLevy: statement.trainingLevy.toLocaleString(),
      PHCfund: statement.PHCfund.toLocaleString(),
      comm: statement.comm.toLocaleString(),
      Wtax: statement.Wtax.toLocaleString(),
      policyNet: Math.floor(
        statement.premium +
          statement.PVTprem +
          statement.stampDuty +
          statement.trainingLevy +
          statement.PHCfund +
          statement.Wtax -
          statement.comm
      ),
      creditNet: statement.creditNet,
      outstanding: 0,
    };
  });

  const router = useRouter();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center" onClick={() => router.back()}>
          <GrPrevious size={15} />
          <p>Back</p>
        </div>
        <p className="md:text-[1.8rem] sm:text-[1.2rem] font-bold">
          GL Statements
        </p>
        <p></p>
      </div>

      <CsvDownloader
        disabled={loadingGl}
        filename={`GL Statements ${new Date(Date.now())}`}
        extension=".csv"
        columns={mappedColumns}
        datas={mappedStatements}
        className="bg-[#cb7529] h-[3rem] rounded-sm text-white border w-[18rem] m-2 p-2 flex justify-center items-center"
      >
        {loadingGl ? (
          <Spin
            spinning={loadingGl}
            indicator={
              <LoadingOutlined
                style={{
                  fontSize: 25,
                  color: "white",
                }}
              />
            }
          />
        ) : (
          `Export to Excel ${mappedStatements.length} records`
        )}
      </CsvDownloader>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#092332",
              headerColor: "white",
              padding: 2,
              rowHoverBg: "#cb7529",
            },
          },
        }}
      >
        <Table
          columns={columns}
          loading={loadingGl}
          dataSource={glStatements}
          scroll={{ x: 1800 }}
          pagination={{ pageSize: 20 }}
        />
      </ConfigProvider>
    </div>
  );
};

export default Statements;
