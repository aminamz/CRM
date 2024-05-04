import Link from "next/link";
import React from "react";
import { TiPen } from "react-icons/ti";

function TableList({ listItem, headerList, tableData, editURI }) {
  return (
    <table className="w-full md:w-[400px] text-center">
      <thead className="border-b">
        <tr className="py-2">
          {headerList.map((header, index) => (
            <th key={index} className="py-2">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {!listItem.length ? (
          <tr>
            <td colSpan={headerList.length}>اطلاعات موجود نیست</td>
          </tr>
        ) : (
          listItem.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              {tableData.map((h, i) => (
                <td key={i}>{item[h]}</td>
              ))}

              <td>
                <Link
                  href={`/dashboard/${editURI.link}=${item[editURI.key]}`}
                  className="inline-block"
                >
                  <TiPen />
                </Link>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default TableList;
