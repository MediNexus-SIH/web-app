import { Badge } from "../ui/badge";
import { TableCell, TableRow } from "../ui/table";
import EditInvDropdown from "./EditInvDropdown";

const TableInvRow = ({
  item,
  itemCategory,
  quantity,
  location,
  expiration,
}: {
  item: string;
  itemCategory: string;
  quantity: string;
  location: string;
  expiration: string;
}) => {
  const quantityOfItem = parseInt(quantity);
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
  const expirationDate = new Date(expiration);
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

  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{item}</div>
      </TableCell>
      <TableCell>{itemCategory}</TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={`${quantityColor} ${quantityTextColor}`}
        >
          {quantity}
        </Badge>
      </TableCell>
      <TableCell>{location}</TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={`${expirationColor} ${expirationTextColor}`}
        >
          {expiration}
        </Badge>
      </TableCell>
      <TableCell>
        <EditInvDropdown />
      </TableCell>
    </TableRow>
  );
};

export default TableInvRow