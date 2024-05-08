import InvoiceFields from "@/components/invoice/Invoice";
import Link from "next/link";
import { TiArrowLeftThick } from "react-icons/ti";

function NewInvoicePage() {
  return (
    <div className="flex flex-col w-full h-full max-w-xl mx-[auto] p-2">
      <div className="flex flex-row justify-between border-b py-2">
        <h2 className="font-semibold text-2xl">فاکتور جدید</h2>
        <Link
          href="/dashboard/invoice"
          className="p-2 bg-primary inline w-[40px] text-slate-100"
        >
          <TiArrowLeftThick fontSize={20} />
        </Link>
      </div>

      <InvoiceFields />
    </div>
  );
}

export default NewInvoicePage;
