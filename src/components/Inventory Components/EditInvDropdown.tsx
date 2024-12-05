"use client";

import { useState } from "react";
import { Menu, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import useInventory from "@/hooks/use-inventory";

interface ProductDetails {
  id: string;
  name: string;
  quantity: string;
  expiry_date: string;
}

const EditInvDropdown = ({ product }: { product: ProductDetails }) => {
  const { deleteItem, updateItem } = useInventory();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isQuantityDialogOpen, setIsQuantityDialogOpen] = useState(false);
  const [isExpiryDialogOpen, setIsExpiryDialogOpen] = useState(false);
  const [newQuantity, setNewQuantity] = useState(product.quantity);
  const [newExpiry, setNewExpiry] = useState<Date | undefined>(
    new Date(product.expiry_date)
  );
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const handleDelete = async () => {
    if (deleteConfirmation.toLowerCase() === "delete") {
      await deleteItem(product.id);
      setIsDeleteDialogOpen(false);
      setDeleteConfirmation("");
    }
  };

  const handleQuantitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuantity) {
      await updateItem(product.id, { quantity: parseInt(newQuantity) });
      setIsQuantityDialogOpen(false);
    }
  };

  const handleExpirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newExpiry) {
      await updateItem(product.id, {
        expiry_date: format(newExpiry, "yyyy-MM-dd"),
      });
      setIsExpiryDialogOpen(false);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setNewQuantity(value);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setIsQuantityDialogOpen(true)}>
            Adjust Quantity
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsExpiryDialogOpen(true)}>
            Update Expiry Date
          </DropdownMenuItem>
          {/* <DropdownMenuItem disabled>
            Reorder
          </DropdownMenuItem> */}
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>
            Delete Item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {product.name}? This action cannot
              be undone. Type "delete" to confirm.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="delete-confirm" className="text-right">
                Confirmation
              </Label>
              <Input
                id="delete-confirm"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                className="col-span-3"
                placeholder="Type 'delete' to confirm"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteConfirmation.toLowerCase() !== "delete"}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Quantity Adjustment Dialog */}
      <Dialog
        open={isQuantityDialogOpen}
        onOpenChange={setIsQuantityDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Quantity for {product.name}</DialogTitle>
            <DialogDescription>
              Enter the new quantity for this item. Current quantity:{" "}
              {product.quantity}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleQuantitySubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  New Quantity
                </Label>
                <Input
                  id="quantity"
                  type="text"
                  value={newQuantity}
                  onChange={handleQuantityChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Expiry Date Dialog */}
      <Dialog open={isExpiryDialogOpen} onOpenChange={setIsExpiryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Expiry Date for {product.name}</DialogTitle>
            <DialogDescription>
              Select the new expiry date for this item. Current expiry date:{" "}
              {new Date(product.expiry_date).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleExpirySubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="expiry" className="text-right">
                  New Expiry Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !newExpiry && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newExpiry ? (
                        format(newExpiry, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newExpiry}
                      onSelect={setNewExpiry}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditInvDropdown;
