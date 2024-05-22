"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GrPrevious } from "react-icons/gr";

const Documents = () => {
  const [receiptNo, setReceiptNo] = useState(0);
  const [receiptIndex, setReceiptIndex] = useState("");
  const [policyIndex, setPolicyIndex] = useState("");
  const [policyNo, setPolicyNo] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const payload: any = localStorage.getItem("policyResponse");
    setReceiptNo(payload.receipt.receiptNumber);
    setReceiptIndex(payload.receipt.receiptIndex);
    setPolicyIndex(payload.policyIndex);
    setPolicyNo(payload.policyNo);
  }, []);

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
              src={`http://192.168.0.210:9002/reports/rwservlet?userid=ICON/B1MA@test19c&module=F:/icon/forms_version/ar/reports/mayfair_ke/AR_E_RECEIPT&rep_doc_no=${receiptNo}&p_os_code=01&p_role_code=AR.MGR&rep_param8=&p_grp_code=AR.MGR&rep_param1=&p_module_name=AR_E_RECEIPT&p_org_code=50&p_menu_code=AR000001&rep_param6=&rep_param5=&p_report_title=E RECEIPT&rep_param3=&p_user_name=ICON, Admin &rep_doc_index=${receiptIndex}&p_user_code=1000000&rep_param7=&destype=cache&rep_doc_org=50&rep_param2=&desformat=PDF&rep_param9=&rep_param4=&`}
              allowFullScreen
            />
            <p className="flex items-center justify-center">Receipt</p>
          </div>
          <div>
            <iframe
              width="100%"
              height="400px"
              src={`http://192.168.0.210:8101/icon/reports?p_module_name=UW_TAX_INVOICE_ER&destype=cache&desformat=PDF&rep_param1=0&rep_param2=Normal&rep_param3=KSH&rep_param4=Y&rep_param5=&rep_param6=&rep_param7=&rep_param8=&rep_param9=&rep_doc_index=${policyIndex}&rep_doc_org=50&rep_doc_no=${policyNo}&p_role_code=UW.ADF&p_org_code=50&p_menu_code=100011&p_grp_code=UW.ADF&p_os_code=01&p_user_code=1000000&p_user_name=ICON,%20Admin%20&p_report_title=TAX%20INVOICE&`}
              allowFullScreen
            />
            <p className="flex items-center justify-center">ETIMS Invoice</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Documents;
