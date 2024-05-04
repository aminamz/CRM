"use client";

import Link from "next/link";
import { useState } from "react";
import { BiPackage } from "react-icons/bi";
import { TiArrowLeftThick } from "react-icons/ti";

const productSample = {
  name: "",
  id: "",
  price: "",
};
const initialLoading = {
  loading: false,
  msg: "",
  fullfilled: false,
};

function NewProductPage() {
  const [product, setProduct] = useState(productSample);
  const [isLoading, setIsLoading] = useState(initialLoading);

  const addHandler = async () => {
    setIsLoading({ loading: true, msg: "", fullfilled: false });

    const req = await fetch("/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pid: product.id,
        name: product.name,
        price: product.price,
      }),
    });

    const res = await req.json();

    if (res.status === "Success") {
      setIsLoading({
        loading: false,
        msg: "با موفقیت ثبت گردید",
        fullfilled: true,
      });
      setProduct(productSample);
    } else {
      setIsLoading({
        loading: false,
        msg: "خطا در ثبت اطلاعات",
        fullfilled: true,
      });
    }
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-[auto] p-2">
      <div className="flex flex-row justify-between border-b py-2">
        <h2 className="font-semibold text-2xl">کالا جدید</h2>
        <Link
          href="/dashboard/product"
          className="p-2 bg-primary inline w-[40px] text-slate-100"
        >
          <TiArrowLeftThick fontSize={20} />
        </Link>
      </div>
      <div className="flex flex-col">
        <input
          type="text"
          className="a_textbox"
          value={product.id}
          onChange={(e) =>
            setProduct((product) => ({ ...product, id: e.target.value }))
          }
          placeholder="کد کالا"
        />
        <input
          type="text"
          className="a_textbox text-right"
          value={product.name}
          onChange={(e) =>
            setProduct((product) => ({ ...product, name: e.target.value }))
          }
          placeholder="نام کالا"
        />
        <input
          type="tel"
          className="a_textbox"
          value={product.price}
          onChange={(e) =>
            setProduct((product) => ({ ...product, price: e.target.value }))
          }
          placeholder="قیمت کالا"
        />
        <button className="a_button mt-4" onClick={addHandler}>
          ایجاد
        </button>
      </div>
      <div className="mt-16 self-center">
        <BiPackage
          width={80}
          height={80}
          fontSize="16rem"
          className="text-slate-200"
        />
      </div>
    </div>
  );
}

export default NewProductPage;
