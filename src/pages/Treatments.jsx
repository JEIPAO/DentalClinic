import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { IconChevronRight, IconListCheck, IconPencil, IconPlus, IconStethoscope, IconUserCheck } from "@tabler/icons-react"

const treatmentSummary = [
  {
    title: "Procedures",
    value: "128",
    description: "Total available treatments",
    icon: IconListCheck,
    badge: "New package",
  },
  {
    title: "Active patients",
    value: "42",
    description: "Currently in care",
    icon: IconUserCheck,
  },
  {
    title: "Completed",
    value: "76",
    description: "Treatments finished",
    icon: IconListCheck,
  },
  {
    title: "Follow-ups",
    value: "12",
    description: "Scheduled this week",
    icon: IconStethoscope,
  },
]

const procedureRows = [
  {
    name: "Root canal therapy",
    category: "Endodontics",
    price: "$580",
    status: "Standard",
  },
  {
    name: "Orthodontic consultation",
    category: "Orthodontics",
    price: "$120",
    status: "Popular",
  },
  {
    name: "Dental implant",
    category: "Implantology",
    price: "$1,950",
    status: "Premium",
  },
  {
    name: "Teeth whitening",
    category: "Cosmetic",
    price: "$280",
    status: "Trending",
  },
]

const packages = [
  {
    title: "Smile refresh",
    description: "Whitening, cleaning, and polish",
    price: "$420",
  },
  {
    title: "Complete restorative",
    description: "Implant + crown + follow-up",
    price: "$2,900",
  },
  {
    title: "Kids checkup",
    description: "Exam, cleaning and fluoride",
    price: "$150",
  },
]

export default function Treatments() {
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
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
                  Treatments & procedures
                </p>
                <h1 className="text-3xl font-semibold tracking-tight">
                  Clinical treatment dashboard
                </h1>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="secondary">Import protocols</Button>
                <Button>
                  <IconPlus className="size-4" />
                  New procedure
                </Button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {treatmentSummary.map((item) => {
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
                      {item.badge ? (
                        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          <IconChevronRight className="size-3" />
                          {item.badge}
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_0.85fr]">
              <Card className="border">
                <CardHeader>
                  <div className="flex flex-col gap-1 px-6 pb-2">
                    <CardTitle>Procedure catalog</CardTitle>
                    <CardDescription>
                      Browse clinical treatments and pricing for the practice.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Procedure</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {procedureRows.map((procedure) => (
                        <TableRow key={procedure.name}>
                          <TableCell className="font-medium">{procedure.name}</TableCell>
                          <TableCell>{procedure.category}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                procedure.status === "Premium"
                                  ? "destructive"
                                  : procedure.status === "Trending"
                                  ? "secondary"
                                  : "outline"
                              }
                              className="rounded-full px-2 py-1 text-xs"
                            >
                              {procedure.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-medium">{procedure.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="border">
                <CardHeader>
                  <div className="flex flex-col gap-1 px-6 pb-2">
                    <CardTitle>Treatment packages</CardTitle>
                    <CardDescription>
                      Template bundles for common patient needs.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 px-6 pb-6 pt-2">
                  {packages.map((pkg) => (
                    <div key={pkg.title} className="rounded-2xl border p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold">{pkg.title}</p>
                          <p className="text-sm text-muted-foreground">{pkg.description}</p>
                        </div>
                        <p className="text-lg font-semibold">{pkg.price}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <Card className="border">
                <CardHeader className="flex items-center justify-between gap-4 px-6 pb-2">
                  <div>
                    <CardTitle>Treatment activity</CardTitle>
                    <CardDescription>
                      Track ongoing treatment progress and status.
                    </CardDescription>
                  </div>
                  <Badge className="rounded-full px-2 py-1 text-xs">Live</Badge>
                </CardHeader>
                <CardContent className="space-y-4 px-6 pb-6 pt-2">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border p-4">
                      <p className="text-sm text-muted-foreground">Patient in treatment</p>
                      <p className="mt-2 text-2xl font-semibold">18</p>
                    </div>
                    <div className="rounded-2xl border p-4">
                      <p className="text-sm text-muted-foreground">New consultations</p>
                      <p className="mt-2 text-2xl font-semibold">9</p>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <div className="grid gap-2">
                      <Label htmlFor="treatment-search">Search procedures</Label>
                      <Input id="treatment-search" placeholder="Search by name or category" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="treatment-filter">Filter by status</Label>
                      <Select id="treatment-filter">
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="popular">Popular</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border">
                <CardHeader>
                  <div className="flex flex-col gap-1 px-6 pb-2">
                    <CardTitle>Quick action</CardTitle>
                    <CardDescription>
                      Add a new treatment or update pricing quickly.
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 px-6 pb-6 pt-2">
                  <div className="grid gap-3">
                    <div className="grid gap-2">
                      <Label htmlFor="new-procedure-name">Procedure name</Label>
                      <Input id="new-procedure-name" placeholder="e.g. Periodontal scaling" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="new-category">Category</Label>
                      <Input id="new-category" placeholder="e.g. Periodontics" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="new-price">Price</Label>
                      <Input id="new-price" placeholder="$0.00" />
                    </div>
                    <Button className="w-full">Create treatment</Button>
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
