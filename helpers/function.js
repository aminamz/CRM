import { Customer } from "@/model/customer/customer";

export function MakeInvoice(oldArr) {
  const newArr = oldArr.map(async (item) => {
    const { _doc } = item;
    const { cid, ...others } = _doc;
    const person = await Customer.findById({ _id: cid });
    others.customer = person.firstName + " " + person.lastName;
    return others;
  });
  return newArr;
}
