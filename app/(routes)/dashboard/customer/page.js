"use client";
import TableList from "@/components/elements/Table";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CustomerPage() {
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    const loadCustomer = async () => {
      const res = await fetch("/api/customer", { next: { revalidate: 30 } });
      const data = await res.json();
      setCustomer(data);
    };

    loadCustomer();
  }, []);

  const tableHeader = ["ردیف", "نام", "نام خانوادگی", "شماره", "عملیات"];
  const tableData = ["firstName", "lastName", "phone"];
  return (
    <div className="flex flex-col justify-between md:flex-row md:w-full md:max-w-xl md:mx-auo gap-3 p-4">
      <button className="a_button w-[100px] mb-4">
        <Link href="/dashboard/customer/new">مشتری جدید</Link>
      </button>

      <div>
        <TableList
          listItem={customer}
          headerList={tableHeader}
          tableData={tableData}
          editURI={{ link: "customer/update?cid", key: "cid" }}
        />
      </div>
    </div>
  );
}
