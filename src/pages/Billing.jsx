import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { IconCalendar, IconCreditCard, IconReceipt, IconWallet } from "@tabler/icons-react"

const billingSummary = [
  {
    title: "Total billed",
    value: "$42,560",
    description: "This month",
    icon: IconReceipt,
  },
  {
    title: "Paid",
    value: "$28,400",
    description: "Received so far",
    icon: IconWallet,
  },
  {
    title: "Outstanding",
    value: "$14,160",
    description: "Pending payment",
    icon: IconCreditCard,
  },
  {
    title: "Next due",
    value: "$3,250",
    description: "Due in 6 days",
    icon: IconCalendar,
  },
]

const invoices = [
  {
    id: "INV-1001",
    patient: "Mia Johnson",
    dueDate: "2026-06-10",
    status: "Due",
    amount: "$1,250",
  },
  {
    id: "INV-1002",
    patient: "Jayden Lee",
    dueDate: "2026-06-14",
    status: "Partial",
    amount: "$2,800",
  },
  {
    id: "INV-1003",
    patient: "Sofia Patel",
    dueDate: "2026-06-18",
    status: "Paid",
    amount: "$980",
  },
  {
    id: "INV-1004",
    patient: "Noah Cruz",
    dueDate: "2026-06-22",
    status: "Due",
    amount: "$4,500",
  },
]

const payments = [
  {
    id: "PMT-2301",
    patient: "Mia Johnson",
    date: "Jun 1, 2026",
    method: "Credit Card",
    amount: "$650",
  },
  {
    id: "PMT-2302",
    patient: "Sofia Patel",
    date: "May 29, 2026",
    method: "Cash",
    amount: "$980",
  },
  {
    id: "PMT-2303",
    patient: "Asher Reed",
    date: "May 26, 2026",
    method: "Insurance",
    amount: "$1,200",
  },
]

export default function Billing() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        }
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="flex flex-1 flex-col">
          <div className="px-4 py-6 lg:px-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
                    Billing overview
                  </p>
                  <h1 className="text-3xl font-semibold tracking-tight">
                    Payment dashboard
                  </h1>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button variant="secondary">Generate invoice</Button>
                  <Button>New payment</Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {billingSummary.map((item) => {
                  const Icon = item.icon
                  return (
                    <Card key={item.title} className="border">
                      <CardHeader className="flex items-start justify-between gap-4 px-6 pt-6">
                        <div>
                          <CardTitle>{item.value}</CardTitle>
                          <CardDescription>{item.title}</CardDescription>
                        </div>
                        <div className="rounded-2xl bg-muted p-3">
                          <Icon className="size-5 text-primary" />
                        </div>
                      </CardHeader>
                      <CardContent className="px-6 pb-6 pt-2 text-sm text-muted-foreground">
                        {item.description}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
              <Card className="border">
                <CardHeader>
                  <div className="flex items-center justify-between gap-4 px-6 pb-2">
                    <div>
                      <CardTitle>Outstanding invoices</CardTitle>
                      <CardDescription>
                        Review current billing status and follow up on unpaid invoices.
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="rounded-full px-2 py-1 text-xs">
                      {invoices.length} invoices
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Due date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium text-foreground">{invoice.id}</TableCell>
                          <TableCell>{invoice.patient}</TableCell>
                          <TableCell>{invoice.dueDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                invoice.status === "Paid"
                                  ? "secondary"
                                  : invoice.status === "Due"
                                  ? "default"
                                  : "ghost"
                              }
                              className="rounded-full px-2 py-1 text-xs"
                            >
                              {invoice.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-medium">{invoice.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="border">
                <CardHeader>
                  <div>
                    <CardTitle>Payment details</CardTitle>
                    <CardDescription>
                      Record a payment or update invoice status.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 px-6 pb-6 pt-2">
                  <div className="grid gap-3">
                    <div className="grid gap-2">
                      <Label htmlFor="billing-patient">Patient</Label>
                      <Input id="billing-patient" placeholder="Enter patient name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="billing-invoice">Invoice number</Label>
                      <Input id="billing-invoice" placeholder="INV-XXXX" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="billing-amount">Amount</Label>
                      <Input id="billing-amount" placeholder="$0.00" />
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="billing-method">Payment method</Label>
                    <Select id="billing-method">
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit-card">Credit card</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="insurance">Insurance</SelectItem>
                        <SelectItem value="bank-transfer">Bank transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="billing-notes">Notes</Label>
                    <Input id="billing-notes" placeholder="Add payment notes" />
                  </div>
                </CardContent>
                <CardFooter className="justify-end px-6">
                  <Button>Submit payment</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <Card className="border">
                <CardHeader>
                  <CardTitle>Recent payments</CardTitle>
                  <CardDescription>Latest transactions from patient collections.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payment</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>{payment.id}</TableCell>
                          <TableCell>{payment.patient}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell className="text-right font-medium">
                            {payment.amount}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="border">
                <CardHeader>
                  <CardTitle>Billing actions</CardTitle>
                  <CardDescription>Quick actions for invoices and receipts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 px-6 pb-6">
                  <div className="grid gap-3">
                    <Button variant="outline">Download statement</Button>
                    <Button variant="outline">Send reminders</Button>
                    <Button variant="outline">Export invoices</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
