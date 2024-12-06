"use client";

import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Menu, X, Package, Edit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOrder } from "@/hooks/use-order";
import useDepartments from "@/hooks/useDepartments";
import { SelectDropdown } from "../SelectDropdown";
import { OrderItem } from "@/lib/interfaces";
import { ScrollArea } from "@/components/ui/scroll-area";

interface OrderDetails {
  id: string;
  status: string;
  orderItems: OrderItem[];
}

const OrderActionsDropdown = ({ order }: { order: OrderDetails }) => {
  const { dropdownDepartments, loading: departmentsLoading } = useDepartments();
  const { cancelOrder, updateOrderItems } = useOrder();
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isEditQuantityDialogOpen, setIsEditQuantityDialogOpen] =
    useState(false);
  const [isEditDepartmentDialogOpen, setIsEditDepartmentDialogOpen] =
    useState(false);
  const [editedItems, setEditedItems] = useState<OrderItem[]>([]);
  const [cancelConfirmation, setCancelConfirmation] = useState("");

  const handleCancel = async () => {
    if (cancelConfirmation.toLowerCase() === "cancel") {
      await cancelOrder(order.id);
      setIsCancelDialogOpen(false);
      setCancelConfirmation("");
      window.location.reload();
    }
  };

  const handleQuantitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateOrderItems(order.id, editedItems);
    setIsEditQuantityDialogOpen(false);
    window.location.reload();
  };

  const handleDepartmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateOrderItems(order.id, editedItems);
    setIsEditDepartmentDialogOpen(false);
    window.location.reload();
  };

  const handleQuantityChange = (itemId: string, value: string) => {
    if (/^\d*$/.test(value)) {
      setEditedItems((items) =>
        items.map((item) =>
          item.item_id === itemId
            ? { ...item, quantity: parseInt(value) || 0 }
            : item
        )
      );
    }
  };

  const handleDepartmentChange = (itemId: string, value: string) => {
    setEditedItems((items) =>
      items.map((item) =>
        item.item_id === itemId ? { ...item, department: value } : item
      )
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {order.status !== "CANCELLED" && (
            <DropdownMenuItem onClick={() => setIsCancelDialogOpen(true)}>
              <X className="mr-2 h-4 w-4" />
              <span>Cancel Order</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => {
              setEditedItems([...order.orderItems]);
              setIsEditQuantityDialogOpen(true);
            }}
          >
            <Package className="mr-2 h-4 w-4" />
            <span>Edit Quantities</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setEditedItems([...order.orderItems]);
              setIsEditDepartmentDialogOpen(true);
            }}
          >
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit Departments</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Cancel Order Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Order Cancellation</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel Order #{order.id}? This action
              will change the order status to CANCELLED.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cancel-confirm" className="text-right">
                Confirmation
              </Label>
              <Input
                id="cancel-confirm"
                value={cancelConfirmation}
                onChange={(e) => setCancelConfirmation(e.target.value)}
                className="col-span-3"
                placeholder="Type 'cancel' to confirm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCancelDialogOpen(false)}
            >
              Go Back
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={cancelConfirmation.toLowerCase() !== "cancel"}
            >
              Cancel Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Quantities Dialog */}
      <Dialog
        open={isEditQuantityDialogOpen}
        onOpenChange={setIsEditQuantityDialogOpen}
      >
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Edit Item Quantities</DialogTitle>
            <DialogDescription>
              Update the quantities for items in Order #{order.id}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleQuantitySubmit}>
            <ScrollArea className="h-[400px] pr-4">
              {editedItems.map((item, index) => (
                <div key={item.item_id} className="mb-6">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">
                      Item {index + 1}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {item.item_name}
                    </p>
                  </div>
                  <Separator className="my-2" />
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor={`current-quantity-${item.item_id}`}
                      className="text-right"
                    >
                      Current
                    </Label>
                    <Input
                      id={`current-quantity-${item.item_id}`}
                      value={
                        order.orderItems.find((i) => i.item_id === item.item_id)
                          ?.quantity || 0
                      }
                      className="col-span-3"
                      disabled
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 mt-2">
                    <Label
                      htmlFor={`new-quantity-${item.item_id}`}
                      className="text-right"
                    >
                      New
                    </Label>
                    <Input
                      id={`new-quantity-${item.item_id}`}
                      type="text" // Changed from "number" to "text"
                      value={item.quantity}
                      onInput={(e) => {
                        const value = (
                          e.target as HTMLInputElement
                        ).value.replace(/[^0-9]/g, ""); // Allow only numeric values
                        handleQuantityChange(item.item_id, value);
                      }}
                      className="col-span-3"
                      min={1}
                    />
                  </div>
                </div>
              ))}
            </ScrollArea>
            <DialogFooter className="mt-4">
              <Button type="submit">Update Quantities</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Departments Dialog */}
      <Dialog
        open={isEditDepartmentDialogOpen}
        onOpenChange={setIsEditDepartmentDialogOpen}
      >
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Edit Item Departments</DialogTitle>
            <DialogDescription>
              Update the departments for items in Order #{order.id}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleDepartmentSubmit}>
            <ScrollArea className="h-[400px] pr-4">
              {editedItems.map((item, index) => (
                <div key={item.item_id} className="mb-6">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">
                      Item {index + 1}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {item.item_name}
                    </p>
                  </div>
                  <Separator className="my-2" />
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor={`current-department-${item.item_id}`}
                      className="text-right"
                    >
                      Current
                    </Label>
                    <Input
                      id={`current-department-${item.item_id}`}
                      value={
                        order.orderItems.find((i) => i.item_id === item.item_id)
                          ?.department || ""
                      }
                      className="col-span-3"
                      disabled
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4 mt-2">
                    <Label
                      htmlFor={`new-department-${item.item_id}`}
                      className="text-right"
                    >
                      New
                    </Label>
                    <SelectDropdown
                      className="w-[250px]"
                      onValueChange={(value) =>
                        handleDepartmentChange(item.item_id, value)
                      }
                      options={dropdownDepartments.filter(
                        (department) => department.label !== item.department
                      )}
                      placeholder="Department..."
                      value={item.department}
                    />
                  </div>
                </div>
              ))}
            </ScrollArea>
            <DialogFooter className="mt-4">
              <Button type="submit">Update Departments</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderActionsDropdown;
