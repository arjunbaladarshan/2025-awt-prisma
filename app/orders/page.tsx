import React from "react";
import { prisma } from "../lib/prisma";
import { orderdetails, orders, products } from "../generated/prisma/browser";
import Link from "next/link";

async function ProductsList() {
  const data = await prisma.orders.findMany({
    take: 10,
    where: {
      status: "In Process",
    },
    include: {
      customers: true,
    },
  });

  console.log("Data = ", data);
  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-medium">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-base font-medium">
                Order Number
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Order Date
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-base font-medium">
                Status
              </th>
              <th scope="col" className="px-6 py-3 rounded-e-base font-medium">
                Customer
              </th>
              <td scope="col" className="px-6 py-3 rounded-e-base font-medium">
                Details
              </td>
            </tr>
          </thead>
          <tbody>
            {data.map((order: any) => (
              <tr className="bg-neutral-primary">
                <td>{order.orderNumber}</td>
                <td>{order.orderDate.toDateString()}</td>
                <td>{order.status}</td>
                <td>{order.customers.customerName}</td>
                <td>
                  <Link href={`/orders/details/${order.orderNumber}`}>
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-semibold text-heading">
              <th scope="row" className="px-6 py-3 text-base">
                Total
              </th>
              <td className="px-6 py-3">3</td>
              <td className="px-6 py-3">21,000</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}

export default ProductsList;
