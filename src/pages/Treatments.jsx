import { useEffect, useState } from "react"
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
import { IconChevronRight, IconListCheck, IconPencil, IconPlus, IconStethoscope, IconUserCheck, IconTrash, IconDownload, IconUpload } from "@tabler/icons-react"
import treatmentService from "@/lib/treatmentService"
import { toast } from "sonner"
import { useRef } from "react"

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

// initial procedureRows are managed by treatmentService (localStorage)

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
  const [procedures, setProcedures] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [editValues, setEditValues] = useState({ name: "", category: "", price: "" })
  const [newProcedure, setNewProcedure] = useState({ name: "", category: "", price: "" })

  useEffect(() => {
    setProcedures(treatmentService.getProcedures())
  }, [])

  function handleCreateProcedure() {
    if (!newProcedure.name) return
    const created = treatmentService.addProcedure({ name: newProcedure.name, category: newProcedure.category || "General", price: Number(newProcedure.price || 0) })
    setProcedures((s) => [...s, created])
    setNewProcedure({ name: "", category: "", price: "" })
  }

  function handleEditClick(proc) {
    setEditingId(proc.id)
    setEditValues({ name: proc.name, category: proc.category, price: String(proc.price) })
  }

  function handleSaveEdit() {
    treatmentService.updateProcedure(editingId, { name: editValues.name, category: editValues.category, price: Number(editValues.price || 0) })
    setProcedures(treatmentService.getProcedures())
    setEditingId(null)
  }

  function handleDeleteProcedure(id) {
    if (!confirm("Delete procedure? This will remove it from the catalog and from patient assignments.")) return
    const deleted = procedures.find((p) => p.id === id)
    treatmentService.removeProcedure(id)
    setProcedures(treatmentService.getProcedures())
    toast.success("Procedure deleted", {
      action: {
        label: "Undo",
        onClick: () => {
          treatmentService.restoreProcedure(deleted)
          setProcedures(treatmentService.getProcedures())
        },
      },
    })
  }

  // CSV import/export handlers
  const importInputRef = useRef(null)

  function downloadCSV(filename, text) {
    const blob = new Blob([text], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  function handleExportProcedures() {
    const csv = treatmentService.exportProceduresCSV()
    downloadCSV("procedures.csv", csv)
  }

  function handleExportAllBills() {
    const csv = treatmentService.exportAllBillsCSV()
    downloadCSV("bills.csv", csv)
  }

  function handleImportClick() {
    importInputRef.current?.click()
  }

  function handleImportFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const text = String(ev.target.result || "")
      treatmentService.importProceduresCSV(text, { replace: false })
      setProcedures(treatmentService.getProcedures())
      toast.success("Imported procedures")
    }
    reader.readAsText(file)
    e.target.value = null
  }

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
              {/* <Card className="border">
                <CardHeader>
                  <div className="flex items-center justify-between px-6 pb-2">
                    <div>
                      <CardTitle>Exports</CardTitle>
                      <CardDescription>Import/export procedures and bills</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <input ref={importInputRef} onChange={handleImportFile} type="file" accept="text/csv" hidden />
                      <Button variant="outline" onClick={handleImportClick}><IconUpload className="size-4" /> Import</Button>
                      <Button onClick={handleExportProcedures}><IconDownload className="size-4" /> Export Procedures</Button>
                      <Button onClick={handleExportAllBills}><IconDownload className="size-4" /> Export Bills</Button>
                    </div>
                  </div>
                </CardHeader>
              </Card> */}
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
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {procedures.map((procedure) => {
                        const status = procedure.price >= 1000 ? "Premium" : procedure.price >= 300 ? "Trending" : "Standard"
                        return (
                          <TableRow key={procedure.id}>
                            <TableCell className="font-medium">
                              {editingId === procedure.id ? (
                                <Input value={editValues.name} onChange={(e) => setEditValues((s) => ({ ...s, name: e.target.value }))} />
                              ) : (
                                procedure.name
                              )}
                            </TableCell>
                            <TableCell>
                              {editingId === procedure.id ? (
                                <Input value={editValues.category} onChange={(e) => setEditValues((s) => ({ ...s, category: e.target.value }))} />
                              ) : (
                                procedure.category
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={status === "Premium" ? "destructive" : status === "Trending" ? "secondary" : "outline"}
                                className="rounded-full px-2 py-1 text-xs"
                              >
                                {status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {editingId === procedure.id ? (
                                <Input value={editValues.price} onChange={(e) => setEditValues((s) => ({ ...s, price: e.target.value }))} />
                              ) : (
                                `$${Number(procedure.price).toFixed(2)}`
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              {editingId === procedure.id ? (
                                <div className="flex items-center justify-end gap-2">
                                  <Button onClick={handleSaveEdit}>Save</Button>
                                  <Button variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                                </div>
                              ) : (
                                <div className="flex items-center justify-end gap-2">
                                  <Button onClick={() => handleEditClick(procedure)} size="sm">
                                    <IconPencil />
                                  </Button>
                                  <Button variant="destructive" onClick={() => handleDeleteProcedure(procedure.id)} size="sm">
                                    <IconTrash />
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        )
                      })}
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
                    <CardTitle>Billing summary</CardTitle>
                    <CardDescription>Totals by procedure from saved bills</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  {(() => {
                    const bills = treatmentService.getBills()
                    const map = new Map()
                    const procs = treatmentService.getProcedures()
                    bills.forEach((b) => b.items.forEach((it) => {
                      const cur = map.get(it.procedureId) || { qty: 0, total: 0 }
                      cur.qty += Number(it.qty || 1)
                      cur.total += Number(it.qty || 1) * Number(it.price || 0)
                      map.set(it.procedureId, cur)
                    }))
                    const rows = Array.from(map.entries()).map(([procId, v]) => ({ procId, qty: v.qty, total: v.total, name: (procs.find((p) => p.id === procId) || {}).name || `#${procId}` }))
                    if (!rows.length) return <div className="text-sm text-slate-500">No billing activity yet.</div>
                    return (
                      <div className="space-y-2">
                        {rows.map((r) => (
                          <div key={r.procId} className="flex items-center justify-between rounded border p-3">
                            <div>
                              <div className="font-medium">{r.name}</div>
                              <div className="text-sm text-slate-500">{r.qty} item(s)</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">${r.total.toFixed(2)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  })()}
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
                        <Input id="new-procedure-name" placeholder="e.g. Periodontal scaling" value={newProcedure.name} onChange={(e) => setNewProcedure((s) => ({ ...s, name: e.target.value }))} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-category">Category</Label>
                        <Input id="new-category" placeholder="e.g. Periodontics" value={newProcedure.category} onChange={(e) => setNewProcedure((s) => ({ ...s, category: e.target.value }))} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="new-price">Price</Label>
                        <Input id="new-price" placeholder="$0.00" value={newProcedure.price} onChange={(e) => setNewProcedure((s) => ({ ...s, price: e.target.value }))} />
                      </div>
                      <Button className="w-full" onClick={handleCreateProcedure}>Create treatment</Button>
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
