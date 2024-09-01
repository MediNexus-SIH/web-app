import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Component() {
  return (
    <div className="flex w-full flex-col bg-muted/40">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard" prefetch={false}>
                  Dashboard
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Inventory</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Total Items</CardTitle>
              <CardDescription>
                The total number of medical supplies, equipment, and
                pharmaceuticals in your inventory.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">1,234</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Low Stock</CardTitle>
              <CardDescription>
                Items that have fallen below the minimum stock level and need to
                be reordered.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-red-500">47</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Expiring Soon</CardTitle>
              <CardDescription>
                Items that will expire within the next 30 days.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-yellow-500">12</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Reorder Requests</CardTitle>
              <CardDescription>
                Pending requests to reorder items that have fallen below the
                minimum stock level.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-500">8</div>
            </CardContent>
          </Card>
        </div>
        <Card className="w-full">
          <CardHeader className="pb-3">
            <CardTitle>Inventory</CardTitle>
            <CardDescription>
              View and manage your hospital&apos;s medical supplies, equipment,
              and pharmaceuticals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table className="mb-4">
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Expiration</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Surgical Masks</div>
                    <div className="text-sm text-muted-foreground">
                      Medical Supplies
                    </div>
                  </TableCell>
                  <TableCell>Medical Supplies</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-red-500 text-red-50">
                      12
                    </Badge>
                  </TableCell>
                  <TableCell>Hospital Storeroom</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-yellow-500 text-yellow-50"
                    >
                      2023-06-30
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <div className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Adjust Quantity</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Expired</DropdownMenuItem>
                        <DropdownMenuItem>Reorder</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Nitrile Gloves</div>
                    <div className="text-sm text-muted-foreground">
                      Medical Supplies
                    </div>
                  </TableCell>
                  <TableCell>Medical Supplies</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-500 text-green-50"
                    >
                      250
                    </Badge>
                  </TableCell>
                  <TableCell>Hospital Storeroom</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-500 text-green-50"
                    >
                      2024-12-31
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <div className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Adjust Quantity</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Expired</DropdownMenuItem>
                        <DropdownMenuItem>Reorder</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Ibuprofen 200mg</div>
                    <div className="text-sm text-muted-foreground">
                      Pharmaceuticals
                    </div>
                  </TableCell>
                  <TableCell>Pharmaceuticals</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-red-500 text-red-50">
                      35
                    </Badge>
                  </TableCell>
                  <TableCell>Pharmacy Stockroom</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-yellow-500 text-yellow-50"
                    >
                      2023-09-15
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <div className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Adjust Quantity</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Expired</DropdownMenuItem>
                        <DropdownMenuItem>Reorder</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Oxygen Tanks</div>
                    <div className="text-sm text-muted-foreground">
                      Medical Equipment
                    </div>
                  </TableCell>
                  <TableCell>Medical Equipment</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-500 text-green-50"
                    >
                      78
                    </Badge>
                  </TableCell>
                  <TableCell>Biomedical Storeroom</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-500 text-green-50"
                    >
                      2025-06-30
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <div className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Adjust Quantity</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Expired</DropdownMenuItem>
                        <DropdownMenuItem>Reorder</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Saline Solution</div>
                    <div className="text-sm text-muted-foreground">
                      Pharmaceuticals
                    </div>
                  </TableCell>
                  <TableCell>Pharmaceuticals</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-yellow-500 text-yellow-50"
                    >
                      68
                    </Badge>
                  </TableCell>
                  <TableCell>Pharmacy Stockroom</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-yellow-500 text-yellow-50"
                    >
                      2023-11-30
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <div className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Adjust Quantity</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Expired</DropdownMenuItem>
                        <DropdownMenuItem>Reorder</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
