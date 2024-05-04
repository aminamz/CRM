"use client";

import TableList from "@/components/elements/Table";
import Link from "next/link";
import { useEffect, useState } from "react";

function ProductPage() {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const loadProduct = async () => {
      const res = await fetch("/api/product", { next: { revalidate: 30 } });
      const data = await res.json();
      setProduct(data);
    };

    loadProduct();
  }, []);

  const tableHeader = ["ردیف", "کد کالا", "نام کالا", "قیمت", "عملیات"];
  const tableData= ["pid","name","price"]
  return (
    <div className="flex flex-col justify-between md:flex-row md:w-full md:max-w-xl md:mx-auo gap-3 p-4">
      <button className="a_button w-[100px] mb-4">
        <Link href="/dashboard/product/new">کالا جدید</Link>
      </button>
      <div>
        <TableList
          listItem={product}
          headerList={tableHeader}
          tableData={tableData}
          editURI={{ link: "product/update?pid", key: "pid" }}
        />
      </div>
    </div>
  );
}

export default ProductPage;
