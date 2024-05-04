"use client";

import { useEffect, useState } from "react";

const userInfo = {
  username: "",
  password: "",
};

function AdminPage() {
  const [user, setUser] = useState(userInfo);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = () => {
    fetch("./api/users", { next: { revalidate: 60 } })
      .then((res) => res.json())
      .then((data) => setUserList(data.data));
  };
  const submitHandler = () => {
    const submit = async () => {
      const res = await fetch("./api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password,
        }),
      });
      const data = await res.json();
      console.log(data);
      loadUser();
      setUser(userInfo);
    };

    submit();
  };

  return (
    <div className="flex flex-col p-8 gap-4">
      <div className="flex flex-col">
        <h2 className="text-primary font-bold">ایجاد کاربر جدید</h2>
        <div>
          <input
            type="text"
            value={user.username}
            onChange={(e) =>
              setUser((user) => ({ ...user, username: e.target.value }))
            }
            placeholder="نام کاربری"
            className="w-full rounded p-1 mt-2 border-solid border border-secondary focus:outline-none"
          />
          <input
            type="password"
            value={user.password}
            onChange={(e) =>
              setUser((user) => ({ ...user, password: e.target.value }))
            }
            placeholder="کلمه عبور"
            className="w-full rounded p-1 mt-2 border-solid border border-secondary focus:outline-none"
          />
          <button
            className="mt-2 p-2 w-full bg-primary rounded text-slate-100 hover:bg-secondary hover:text-primary"
            onClick={submitHandler}
          >
            ایجاد
          </button>
        </div>
      </div>
      <div className="mt-2">
        <h2 className="text-primary font-bold">لیست کاربران</h2>
        <table className="table-auto mt-2 w-full text-center h-[50px] overflow-scroll">
          <thead>
            <tr className="border-b">
              <th className="pl-4">ردیف</th>
              <th>نام کاربری</th>
            </tr>
          </thead>
          <tbody>
            {!userList && (
              <tr>
                <td className="py-4" colSpan={2}>
                  کاربری ثبت نشده است
                </td>
              </tr>
            )}
            {userList.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;
