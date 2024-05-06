"use client";

import TableList from "@/components/elements/Table";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RecieptPage() {
  const [invoice, setInvoice] = useState([]);

  useEffect(() => {
    const loadInvoice = async () => {
      const res = await fetch("/api/invoice", { next: { revalidate: 30 } });
      const { data } = await res.json();
      setInvoice(data);
    };

    loadInvoice();
  }, []);

  const tableHeader = ["ردیف", "شماره فاکتور", "مشتری", "مبلغ", "عملیات"];
  const tableData = ["iid", "customer", "total"];
  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-col justify-between md:flex-row md:w-full md:max-w-xl md:mx-auo gap-3 p-4">
        <button className="a_button w-[100px] mb-4">
          <Link href="/dashboard/invoice/new">فاکتور جدید</Link>
        </button>
        <div>
          <TableList
            listItem={invoice}
            headerList={tableHeader}
            tableData={tableData}
            editURI={{ link: "invoice/update?iid", key: "iid" }}
          />
        </div>
      </div>
    </div>
  );
}
