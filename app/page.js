import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col justify-between items-center h-[500px] p-2">
        <Image
          src="/CRMLogo.webp"
          width={512}
          height={512}
          alt="CRM Logo"
          className="mt-10 h-[150px] w-[150px]"
        />

        <div className="flex flex-col items-center justify-center gap-4 ">
          <p>برای بهره مندی از امکانات وارد پنل شوید.</p>

          <Link
            href="/auth/login"
            className="px-4 py-2 bg-primary rounded text-slate-100"
          >
            کاربران
          </Link>
          <Link
            href="/admin"
            className="px-4 py-2 bg-primary rounded text-slate-100"
          >
            مدیران
          </Link>
        </div>
      </main>
    </>
  );
}
