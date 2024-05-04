import Link from "next/link";

import {
  BiBarChartAlt,
  BiCustomize,
  BiPackage,
  BiSolidUser,
  BiHomeAlt,
} from "react-icons/bi";

function NavigationBar() {
  return (
    <div className="flex flex-row gap-4 absolute w-screen bottom-0 h-16 px-2 z-100 bg-primary">
      <div className="flex flex-row justify-around items-center w-full text-slate-100 border-t-">
        <Link href="/dashboard/product">
          <div className="flex flex-col place-items-center">
            <BiPackage fontSize={24} />
            <span className="text-sm">کالا</span>
          </div>
        </Link>
        <Link href="/dashboard/customer">
          <div className="flex flex-col place-items-center">
            <BiSolidUser fontSize={24} />
            <span className="text-sm">مشتری</span>
          </div>
        </Link>
        <Link href="/dashboard">
          <div className="flex flex-col place-items-center rounded-full bg-secondary text-primary p-2">
            <BiHomeAlt fontSize={28} />
          </div>
        </Link>
        <Link href="/dashboard/invoice">
          <div className="flex flex-col place-items-center">
            <BiCustomize fontSize={24} />
            <span className="text-sm">فاکتور</span>
          </div>
        </Link>
        <Link href="/dashboard/report">
          <div className="flex flex-col place-items-center">
            <BiBarChartAlt fontSize={24} />
            <span className="text-sm">گزارش</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default NavigationBar;
