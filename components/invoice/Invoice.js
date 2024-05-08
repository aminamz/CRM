"use client";

import { useEffect, useState } from "react";
import InvoiceRow from "./InvoiceRow";

const invoiceSample = {
  iid: "",
  cid: "",
  product: {
    productId: "",
    count: 0,
    price: 0,
  },
  total: 0,
};

function InvoiceFields() {
  const [invoice, setInvoice] = useState(invoiceSample);
  const [inputList, setInputList] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    setInputList(
      inputList.concat(
        <InvoiceRow
          key={inputList.length}
          row={inputList.length}
          productItems={productItems}
        />
      )
    );
  }, []);

  const productItems = (product, row) => {
    console.log(product);
  };

  const onAddBtnClick = (event) => {
    setInputList(
      inputList.concat(
        <InvoiceRow
          key={inputList.length}
          row={inputList.length}
          productItems={productItems}
        />
      )
    );
  };

  return (
    <div className="flex flex-col h-full relative mb-16">
      <div className="self-end">
        <label htmlFor="invoice-id" className="text-xs pl-2">
          شماره فاکتور
        </label>
        <input
          type="text"
          id="invoice-id"
          className="a_textbox w-16 h-8"
          value={invoice.iid}
          onChange={(e) => setInvoice({ ...invoice, iid: e.target.value })}
        />
      </div>
      <div className="flex flex-col border-solid border border-secondary rounded mt-1">
        <section className="flex flex-col py-2 gap-2">
          <h2 className="self-center text-sm">مشخصات مشتری</h2>
          <div className="flex flex-row items-center justify-between">
            <div className="flex gap-2 w-full items-center">
              <h3 className="text-xs">آقا / خانم :</h3>
              <select className="text-xs w-28 text-right">
                <option value="">انتخاب کنید</option>
                <option value="">امین آموزنده</option>
              </select>
            </div>
            <div className="flex gap-2 w-full items-center">
              <h3 className="text-xs">کد :</h3>
              <h3></h3>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex gap-2 w-full items-center">
              <h3 className="text-xs">آدرس :</h3>
              <h3></h3>
            </div>
            <div className="flex gap-2 w-full items-center">
              <h3 className="text-xs">همراه :</h3>
              <h3></h3>
            </div>
          </div>
        </section>
      </div>
      <div className="flex flex-col border-solid border border-secondary rounded mt-1 overflow-y-scroll">
        <section className="flex flex-col py-2 max-h-[22rem] md:max-h-72 gap-2">
          <h2 className="self-center text-sm">اقلام فاکتور</h2>
          <div className="flex flex-row w-full px-1 justify-between text-center gap-1">
            <h3 className="text-xs w-6">ردیف</h3>
            <h3 className="text-xs min-w-20">کالا</h3>
            <h3 className="text-xs min-w-10">تعداد</h3>
            <h3 className="text-xs w-full min-w-16">مبلغ</h3>
            <h3 className="text-xs w-full min-w-16">جمع کل</h3>
          </div>
          <div>{inputList}</div>
          <button onClick={onAddBtnClick} className="a_button w-24 self-center">
            +
          </button>
        </section>
      </div>
      <div className="flex items-center rounded border border-secondary p-2 bg-zinc-200 h-9 w-full absolute bottom-0 z-10">
        <h3 className="text-sm">جمع کل :</h3>
      </div>
    </div>
  );
}

export default InvoiceFields;
