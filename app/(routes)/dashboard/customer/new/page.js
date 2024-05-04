"use client";

import Link from "next/link";
import { useState } from "react";
import { TiArrowLeftThick, TiUserAdd } from "react-icons/ti";

const customerSample = {
  cid: "",
  firstName: "",
  lastName: "",
  phone: "",
  address: {
    country: "",
    city: "",
    number: "",
  },
};
const initialLoading = {
  loading: false,
  msg: "",
  fullfilled: false,
};

function NewCustomerPage() {
  const [customer, setCustomer] = useState(customerSample);
  const [isLoading, setIsLoading] = useState(initialLoading);

  const addHandler = async () => {
    setIsLoading({ loading: true, msg: "", fullfilled: false });

    const req = await fetch("/api/customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cid: customer.cid,
        firstName: customer.firstName,
        lastName: customer.lastName,
        phone: customer.phone,
        address: {
          country: customer.address.country,
          city: customer.address.city,
          number: customer.address.number,
        },
      }),
    });

    const res = await req.json();

    if (res.status === "Success") {
      setIsLoading({
        loading: false,
        msg: "با موفقیت ثبت گردید",
        fullfilled: true,
      });
      setCustomer(customerSample);
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
        <h2 className="font-semibold text-2xl">مشتری جدید</h2>
        <Link
          href="/dashboard/customer"
          className="p-2 bg-primary inline w-[40px] text-slate-100"
        >
          <TiArrowLeftThick fontSize={20} />
        </Link>
      </div>
      <div className="flex flex-col">
        <input
          type="text"
          className="a_textbox"
          value={customer.cid}
          onChange={(e) =>
            setCustomer((customer) => ({
              ...customer,
              cid: e.target.value,
            }))
          }
          placeholder="کد"
        />
        <input
          type="text"
          className="a_textbox"
          value={customer.firstName}
          onChange={(e) =>
            setCustomer((customer) => ({
              ...customer,
              firstName: e.target.value,
            }))
          }
          placeholder="نام"
        />
        <input
          type="text"
          className="a_textbox text-right"
          value={customer.lastName}
          onChange={(e) =>
            setCustomer((customer) => ({
              ...customer,
              lastName: e.target.value,
            }))
          }
          placeholder="نام خانوادگی"
        />
        <input
          type="tel"
          className="a_textbox"
          value={customer.phone}
          onChange={(e) =>
            setCustomer((customer) => ({ ...customer, phone: e.target.value }))
          }
          placeholder="تلفن"
        />
        <div className="flex flex-row justify-between">
          <input
            type="text"
            className="a_textbox"
            value={customer.address.country}
            onChange={(e) =>
              setCustomer((customer) => ({
                ...customer,
                address: { ...customer.address, country: e.target.value },
              }))
            }
            placeholder="کشور"
          />
          <input
            type="text"
            className="a_textbox"
            value={customer.address.city}
            onChange={(e) =>
              setCustomer((customer) => ({
                ...customer,
                address: { ...customer.address, city: e.target.value },
              }))
            }
            placeholder="شهر"
          />
          <input
            type="tel"
            className="a_textbox"
            value={customer.address.number}
            onChange={(e) =>
              setCustomer((customer) => ({
                ...customer,
                address: { ...customer.address, number: e.target.value },
              }))
            }
            placeholder="پلاک"
          />
        </div>
        <button className="a_button mt-4" onClick={addHandler}>
          ایجاد
        </button>
      </div>
      <div className="mt-16 self-center">
        <TiUserAdd
          width={80}
          height={80}
          fontSize="14rem"
          className="text-slate-200"
        />
      </div>
    </div>
  );
}

export default NewCustomerPage;
