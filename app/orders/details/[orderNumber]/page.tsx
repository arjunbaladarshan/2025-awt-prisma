import { orderdetails } from "@/app/generated/prisma/browser";
import { prisma } from "@/app/lib/prisma";
import React from "react";

async function OrderDetails({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;
  const data = await prisma.orderdetails.findMany({
    where: {
      orderNumber: Number(orderNumber),
    },
    orderBy: {
      orderLineNumber: "asc",
    },
  });

  let totalAmount = 0;
  let totalQnt = 0;

  for (let temp of data) {
    totalAmount += temp.quantityOrdered * temp.priceEach.toNumber();
    totalQnt += temp.quantityOrdered;
  }

  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-medium">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-base font-medium">
                Product Code
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Qty
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-base font-medium">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((od: orderdetails) => (
              <tr className="bg-neutral-primary">
                <td>{od.productCode}</td>
                <td>{od.quantityOrdered}</td>
                <td>{od.priceEach.toString()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-semibold text-heading">
              <th scope="row" className="px-6 py-3 text-base">
                Total
              </th>
              <td className="px-6 py-3">{totalQnt}</td>
              <td className="px-6 py-3">{totalAmount}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default OrderDetails;
