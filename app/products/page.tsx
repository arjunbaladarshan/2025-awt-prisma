import React from "react";
import { prisma } from "../lib/prisma";
import { orderdetails, products } from "../generated/prisma/browser";

async function ProductsList() {
  const data = await prisma.orderdetails.findMany({
    include: {
      products: true,
    },
    take: 1,
  });

  console.log("Data = ", data);
  return (
    <>
      <table>
        {data.map((order: any) => (
          <tr>
            <td className="border border-amber-200">{order.orderNumber}</td>
            <td className="border border-amber-200">{order.productCode}</td>
            <td className="border border-amber-200">
              {order.products.productName}
            </td>
            <td className="border border-amber-200">{order.quantityOrdered}</td>
          </tr>
        ))}
      </table>
    </>
  );
}

export default ProductsList;
