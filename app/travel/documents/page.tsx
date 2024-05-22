"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { GrPrevious } from "react-icons/gr";

const Documents = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-evenly gap-2 items-center">
        <div
          className="flex gap-2 items-center cursor-pointer  py-1 bg-yellow-950 text-white w-[6rem] justify-center rounded-md"
          onClick={() => router.back()}
        >
          <GrPrevious size={15} />
          <p>Back</p>
        </div>
        <p className="text-[2rem] font-semibold">My Documents</p>
        <p></p>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex  gap-2">
          <div>
            <iframe
              width="100%"
              height="400px"
              src="https://www.clickdimensions.com/links/TestPDFfile.pdf"
              allowFullScreen
            />
            <p className="flex items-center justify-center">Receipt</p>
          </div>
          <div>
            <iframe
              width="100%"
              height="400px"
              src={
                "http://192.168.0.210:8101/icon/reports?p_module_name=UW_TAX_INVOICE_ER&destype=cache&desformat=PDF&rep_param1=0&rep_param2=Normal&rep_param3=KSH&rep_param4=Y&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=804620&rep_doc_org=50&rep_doc_no=804620&p_role_code=UW.ADF&p_org_code=50&p_menu_code=100011&p_grp_code=UW.ADF&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=TAX%20INVOICE&"
              }
              allowFullScreen
            />
            <p className="flex items-center justify-center">ETIMS Invoice</p>
          </div>
          <div>
            <iframe
              width="100%"
              height="400px"
              src="https://www.clickdimensions.com/links/TestPDFfile.pdf"
              allowFullScreen
            />
            <p className="flex items-center justify-center">
              Travel Certificate
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Documents;
