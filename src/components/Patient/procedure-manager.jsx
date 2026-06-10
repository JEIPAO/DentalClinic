import * as React from "react"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import treatmentService from "@/lib/treatmentService"
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

export function ProcedureManager({ selectedRows }) {
  const [open, setOpen] = React.useState(false)
  const [procedures, setProcedures] = React.useState([])
  const [patientProcedures, setPatientProcedures] = React.useState([])
  const [patientBills, setPatientBills] = React.useState([])
  const [selectedPatient, setSelectedPatient] = React.useState(null)

  const [selectedProcedureId, setSelectedProcedureId] = React.useState("")
  const [qty, setQty] = React.useState(1)
  const [priceOverride, setPriceOverride] = React.useState("")

  React.useEffect(() => {
    setProcedures(treatmentService.getProcedures())
  }, [])

  React.useEffect(() => {
    if (selectedRows?.length === 1) {
      const pid = selectedRows[0].id
      setSelectedPatient(pid)
      setPatientProcedures(treatmentService.getPatientProcedures(pid))
      setPatientBills(treatmentService.getPatientBills(pid))
    } else {
      setSelectedPatient(null)
      setPatientProcedures([])
      setPatientBills([])
    }
  }, [selectedRows])

  function refreshPatientData(pid) {
    setPatientProcedures(treatmentService.getPatientProcedures(pid))
    setPatientBills(treatmentService.getPatientBills(pid))
  }

  function handleCreateProcedure() {
    // open inline create flow could be added; for now redirect to procedure catalog
    // no-op (procedures can be created in Treatments page)
  }

  function handleAssign() {
    if (!selectedPatient || !selectedProcedureId) return
    const procId = Number(selectedProcedureId)
    const proc = procedures.find((p) => p.id === procId)
    if (!proc) return

    const price = priceOverride !== "" ? Number(priceOverride) : Number(proc.price || 0)
    const items = [{ procedureId: procId, price, qty: Number(qty || 1) }]

    // create bill (unpaid) and also record assignment
    treatmentService.assignProcedureToPatient(selectedPatient, procId)
    const bill = treatmentService.createBill(selectedPatient, items)
    refreshPatientData(selectedPatient)
    // reset selection
    setSelectedProcedureId("")
    setQty(1)
    setPriceOverride("")
  }

  function handleMarkPaid(billId) {
    treatmentService.markBillPaid(billId, true)
    if (selectedPatient) refreshPatientData(selectedPatient)
  }

  function handleDeleteBill(billId) {
    const bill = patientBills.find((b) => b.id === billId)
    if (!bill) return
    treatmentService.removeBill(billId)
    if (selectedPatient) refreshPatientData(selectedPatient)
    toast.success("Bill deleted", {
      action: {
        label: "Undo",
        onClick: () => {
          treatmentService.restoreBill(bill)
          if (selectedPatient) refreshPatientData(selectedPatient)
        },
      },
    })
  }

  function handleExportInvoice(billId) {
    const csv = treatmentService.getBillCSV(billId)
    if (!csv) return
    downloadCSV(`invoice-${billId}.csv`, csv)
  }

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Manage Procedures / Billing</Button>
      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Procedures & Billing</DrawerTitle>
          </DrawerHeader>

          <div className="p-4 space-y-4">
            <div>
              <Label>Selected patient</Label>
              <div className="mt-2 text-sm text-slate-700">{selectedPatient ? `Patient ID: ${selectedPatient}` : "Select one patient row to manage."}</div>
            </div>

            <div>
              <Label>Assign procedure (creates an un-paid bill)</Label>
              <div className="mt-2 flex flex-col gap-2">
                <div className="flex gap-2">
                  <Select value={selectedProcedureId} onValueChange={(v) => setSelectedProcedureId(v)}>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Choose a procedure" />
                    </SelectTrigger>
                    <SelectContent>
                      {procedures.map((p) => (
                        <SelectItem key={p.id} value={String(p.id)}>
                          {p.name} — {p.category} — ${p.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Input placeholder="Qty" type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} className="w-24" />
                  <Input placeholder="Price override" type="number" value={priceOverride} onChange={(e) => setPriceOverride(e.target.value)} className="w-32" />
                  <Button onClick={handleAssign} disabled={!selectedPatient || !selectedProcedureId}>Assign</Button>
                </div>
                <div className="text-xs text-slate-500">Assigning creates a bill line (unpaid). You can mark bills as paid later.</div>
              </div>
            </div>

            <div>
              <Label>Assigned procedures (history)</Label>
              <div className="mt-2 space-y-2">
                {patientProcedures.length ? (
                  patientProcedures.map((entry) => {
                    const proc = procedures.find((p) => p.id === entry.procedureId) || { name: `#${entry.procedureId}` }
                    return (
                      <div key={`${entry.procedureId}-${entry.assignedAt}`} className="flex items-center justify-between rounded border p-2">
                        <div>
                          <div className="font-medium">{proc.name}</div>
                          <div className="text-sm text-slate-500">Assigned {new Date(entry.assignedAt).toLocaleString()}</div>
                        </div>
                        <div>
                          <Button variant="outline" onClick={() => treatmentService.removeProcedureFromPatient(selectedPatient, entry.procedureId)}>Remove</Button>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="text-sm text-slate-500">No procedures assigned.</div>
                )}
              </div>
            </div>

            <div>
              <Label>Patient bills</Label>
              <div className="mt-2 space-y-3">
                {patientBills.length ? (
                  patientBills.map((bill) => (
                    <div key={bill.id} className="rounded border p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="text-sm text-slate-600">Invoice #{bill.id} • {new Date(bill.createdAt).toLocaleDateString()}</div>
                          <div className="mt-2">
                            {bill.items.map((it, idx) => {
                              const proc = procedures.find((p) => p.id === it.procedureId) || { name: `#${it.procedureId}` }
                              return (
                                <div key={idx} className="flex items-center justify-between text-sm">
                                  <div>{proc.name} × {it.qty}</div>
                                  <div>${(it.price * it.qty).toFixed(2)}</div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold">${bill.total.toFixed(2)}</div>
                          <div className="mt-2 flex flex-col gap-2">
                            <Button onClick={() => handleMarkPaid(bill.id)} disabled={bill.paid} className="w-full">{bill.paid ? "Paid" : "Mark Paid"}</Button>
                            <Button onClick={() => handleExportInvoice(bill.id)} className="w-full">Export</Button>
                            <Button variant="outline" onClick={() => handleDeleteBill(bill.id)} className="w-full">Delete</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-slate-500">No bills for this patient.</div>
                )}
              </div>
            </div>
          </div>

          <DrawerFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default ProcedureManager
