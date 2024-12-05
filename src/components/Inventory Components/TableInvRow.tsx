"use client";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { TableCell, TableRow } from "../ui/table";
import EditInvDropdown from "./EditInvDropdown";

const TableInvRow = ({
  id,
  item,
  department,
  quantity,
  batchNumber,
  unitPrice,
  expiration,
}: {
  id: string;
  item: string;
  department: string;
  quantity: string;
  batchNumber: string;
  unitPrice: string;
  expiration: string;
}) => {
  // Local state for quantity and expiration
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const [localExpiration, setLocalExpiration] = useState(expiration);

  const quantityOfItem = parseInt(localQuantity);
  const quantityColor =
    quantityOfItem > 50
      ? "bg-green-500"
      : quantityOfItem > 20
      ? "bg-yellow-500"
      : "bg-red-500";
  const quantityTextColor =
    quantityOfItem > 50
      ? "text-green-50"
      : quantityOfItem > 20
      ? "text-yellow-50"
      : "text-red-50";

  // Format expiration date
  const expirationDate = new Date(localExpiration);
  const formattedExpiration = expirationDate.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const currentDate = new Date();
  const daysUntilExpiration =
    (expirationDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);

  let expirationColor, expirationTextColor;
  if (daysUntilExpiration <= 30) {
    expirationColor = "bg-red-500";
    expirationTextColor = "text-red-50";
  } else if (daysUntilExpiration <= 60) {
    expirationColor = "bg-yellow-500";
    expirationTextColor = "text-yellow-50";
  } else {
    expirationColor = "bg-green-500";
    expirationTextColor = "text-green-50";
  }

  const product = {
    id: id,
    name: item,
    quantity: localQuantity,
    expiry_date: localExpiration,
    setLocalQuantity, // Pass setter function for quantity
    setLocalExpiration, // Pass setter function for expiration
  };
  console.log("Local Expiry", localExpiration)
  console.log("Local Quantity", localQuantity);
  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{item}</div>
      </TableCell>
      <TableCell>
        <div className="font-medium">{department}</div>
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={`${quantityColor} ${quantityTextColor}`}
        >
          {localQuantity}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="font-medium">{batchNumber}</div>
      </TableCell>
      <TableCell>
        <div className="font-medium">₹{unitPrice}</div>
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={`${expirationColor} ${expirationTextColor}`}
        >
          {formattedExpiration}
        </Badge>
      </TableCell>
      <TableCell>
        <EditInvDropdown product={product} />
      </TableCell>
    </TableRow>
  );
};

export default TableInvRow;
