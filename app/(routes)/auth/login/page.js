"use client";

import { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

const userInfo = {
  username: "",
  password: "",
};

function LoginPage() {
  const [user, setUser] = useState(userInfo);
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();

  const loginHandler = async () => {
    const req = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    });

    const res = await req.json();
    if (res.status === "Success") {
      router.push("/dashboard");
    } else {
      console.log(res.msg);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center md:h-full md:flex-row">
      <div className="flex flex-col h-full justify-center items-center md:bg-primary w-full md:max-w-[33%] py-4 md:py-0 px-8 mb-4 border-l">
        <h1 className="self-center mb-6 font-bold text-2xl text-secondary">
          ورود به حساب کاربری
        </h1>
        <input
          type="text"
          value={user.username}
          onChange={(e) =>
            setUser((user) => ({ ...user, username: e.target.value }))
          }
          placeholder="نام کاربری"
          className="a_textbox"
        />
        <input
          type={isShow ? "text" : "password"}
          value={user.password}
          onChange={(e) =>
            setUser((user) => ({ ...user, password: e.target.value }))
          }
          placeholder="کلمه عبور"
          className="a_textbox"
        />
        <button
          className="a_button mt-4 bg-secondary text-primary"
          onClick={loginHandler}
        >
          ورود
        </button>
        <div className="flex self-start mt-2">
          <input
            type="checkbox"
            value={isShow}
            onChange={() => setIsShow((isShow) => !isShow)}
            id="show"
          />
          <label htmlFor="show" className="mr-2">
            نمایش گذرواژه
          </label>
        </div>
      </div>
      <div className="grow flex flex-row justify-center items-center">
        <Image
          src="/Login.jpg"
          width={800}
          height={800}
          alt="Login"
          className="md:max-w-md"
        />
      </div>
    </div>
  );
}

export default LoginPage;
