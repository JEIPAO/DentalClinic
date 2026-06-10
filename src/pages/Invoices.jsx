import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import treatmentService from "@/lib/treatmentService"
import patients from "@/app/dashboard/data.json"
import { toast } from "sonner"

function downloadCSV(filename, text) {
  const blob = new Blob([text], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function Invoices() {
  const [patientId, setPatientId] = useState(null)
  const [procedures, setProcedures] = useState([])
  const [lines, setLines] = useState([]) // {procedureId, qty, price}

  useEffect(() => {
    setProcedures(treatmentService.getProcedures())
  }, [])

  function addLine() {
    setLines((s) => [...s, { procedureId: procedures[0]?.id ?? null, qty: 1, price: procedures[0]?.price ?? 0 }])
  }

  function updateLine(idx, patch) {
    setLines((s) => s.map((l, i) => (i === idx ? { ...l, ...patch } : l)))
  }

  function removeLine(idx) {
    setLines((s) => s.filter((_, i) => i !== idx))
  }

  const subtotal = lines.reduce((s, l) => s + (Number(l.price || 0) * Number(l.qty || 1)), 0)

  function handleCreateInvoice() {
    if (!patientId) return toast.error("Select a patient first")
    if (!lines.length) return toast.error("Add at least one line item")
    const items = lines.map((l) => ({ procedureId: Number(l.procedureId), price: Number(l.price), qty: Number(l.qty) }))
    const bill = treatmentService.createBill(Number(patientId), items)
    toast.success(`Invoice ${bill.id} created`)
    // reset
    setPatientId(null)
    setLines([])
  }

  function handleExportInvoice(billId) {
    const csv = treatmentService.getBillCSV(billId)
    if (!csv) return toast.error("No invoice found")
    downloadCSV(`invoice-${billId}.csv`, csv)
  }

  return (
    <SidebarProvider
      style={{ "--sidebar-width": "calc(var(--spacing) * 72)", "--header-height": "calc(var(--spacing) * 12)" }}>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="px-4 py-6 lg:px-6">
          <div className="mb-4">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Invoicing</p>
            <h1 className="text-3xl font-semibold">Create invoice</h1>
          </div>

          <Card className="border">
            <CardHeader>
              <div className="flex items-center justify-between px-6 pb-2">
                <div>
                  <CardTitle>New invoice</CardTitle>
                  <CardDescription>Create an invoice by selecting patient and procedures.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Patient</Label>
                  <Select value={patientId ?? ""} onValueChange={(v) => setPatientId(v ? Number(v) : null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((p) => (
                        <SelectItem key={p.id} value={String(p.id)}>
                          {p.firstname} {p.lastname} — {p.nickname} • {p.contact}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Line items</Label>
                  <div className="mt-2 space-y-2">
                    {lines.map((line, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Select value={String(line.procedureId ?? "")} onValueChange={(v) => updateLine(idx, { procedureId: Number(v) })}>
                          <SelectTrigger className="w-64">
                            <SelectValue placeholder="Procedure" />
                          </SelectTrigger>
                          <SelectContent>
                            {procedures.map((p) => (
                              <SelectItem key={p.id} value={String(p.id)}>
                                {p.name} — {p.category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input className="w-20" type="number" value={line.qty} onChange={(e) => updateLine(idx, { qty: Number(e.target.value) })} />
                        <Input className="w-32" type="number" value={line.price} onChange={(e) => updateLine(idx, { price: Number(e.target.value) })} />
                        <div className="flex-1 text-right">${(Number(line.price || 0) * Number(line.qty || 1)).toFixed(2)}</div>
                        <Button variant="outline" onClick={() => removeLine(idx)}>Remove</Button>
                      </div>
                    ))}
                    <div>
                      <Button onClick={addLine}>Add line</Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-4">
                  <div className="text-lg font-semibold">Subtotal: ${subtotal.toFixed(2)}</div>
                  <Button onClick={handleCreateInvoice}>Create Invoice</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
