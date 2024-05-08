"use client";

import { useEffect, useState } from "react";

const invoiceRowSample = {
  rowid: "",
  productid: "",
  count: 1,
  price: "",
};

function InvoiceRow({ row, productItems }) {
  row = row + 1 || 1;

  const [product, setProduct] = useState([]);
  const [invoiceRow, setInvoiceRow] = useState(invoiceRowSample);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    fetch("/api/product")
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  useEffect(() => {
    productItems(invoiceRow, row);
  }, [invoiceRow]);

  const productSelector = (e) => {
    if (!e.target.value) return;

    const selectedProduct = product.filter(
      (item) =>
        item.pid === e.target.value &&
        item.name === e.target.options[e.target.selectedIndex].text
    );
    setInvoiceRow((invoiceRow) => ({
      ...invoiceRow,
      rowid: row,
      productid: selectedProduct[0]._id,
      price: selectedProduct[0].price,
    }));
    setCurrent(e.target.value);
  };

  return (
    <div className="flex w-full px-1 justify-between items-center gap-1 text-inherit">
      <input
        type="tel"
        className="a_textbox w-6 h-8 text-xs text-inherit"
        value={row}
        disabled
      />
      <select
        className="min-w-20 h-8 text-xs rounded self-auto"
        onChange={(e) => productSelector(e)}
        value={current}
      >
        <option className="text-center" value="">
          کالا
        </option>
        {product?.map((item) => (
          <option key={item._id} value={item.pid}>
            {item.name}
          </option>
        ))}
      </select>
      <input
        type="tel"
        className="a_textbox w-10 h-8 text-xm"
        value={invoiceRow.count}
        onChange={(e) =>
          setInvoiceRow((invoiceRow) => ({
            ...invoiceRow,
            count: e.target.value,
          }))
        }
      />
      <input
        type="tel"
        className="a_textbox w-full min-w-16 h-8 text-xm"
        value={invoiceRow.price}
        onChange={(e) =>
          setInvoiceRow((invoiceRow) => ({
            ...invoiceRow,
            price: e.target.value,
          }))
        }
      />
      <input
        type="tel"
        className="a_textbox w-full min-w-16 h-8 text-xm"
        value={invoiceRow.count * invoiceRow.price}
        readOnly
      />
    </div>
  );
}

export default InvoiceRow;
