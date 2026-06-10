const PROCEDURES_KEY = "dc_procedures_v1"
const PATIENT_PROCS_KEY = "dc_patient_procedures_v1"
const BILLS_KEY = "dc_bills_v1"

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch (e) {
    return fallback
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getProcedures() {
  return read(PROCEDURES_KEY, [
    { id: 1, name: "Cleaning (Prophylaxis)", category: "General", price: 50 },
    { id: 2, name: "Filling (Composite)", category: "Restorative", price: 120 },
    { id: 3, name: "Root Canal Therapy", category: "Endodontics", price: 600 },
  ])
}

export function addProcedure(proc) {
  const list = getProcedures()
  const id = list.length ? Math.max(...list.map((p) => p.id)) + 1 : 1
  const newProc = { id, ...proc }
  list.push(newProc)
  write(PROCEDURES_KEY, list)
  return newProc
}

export function updateProcedure(id, patch) {
  const list = getProcedures().map((p) => (p.id === id ? { ...p, ...patch } : p))
  write(PROCEDURES_KEY, list)
  return list
}

export function removeProcedure(id) {
  const list = getProcedures().filter((p) => p.id !== id)
  write(PROCEDURES_KEY, list)

  // also remove references from patient assignments
  const map = read(PATIENT_PROCS_KEY, {})
  Object.keys(map).forEach((pid) => {
    map[pid] = map[pid].filter((entry) => entry.procedureId !== id)
  })
  write(PATIENT_PROCS_KEY, map)

  return list
}

export function restoreProcedure(proc) {
  const list = getProcedures()
  // if id exists, avoid collision by using next id
  if (list.some((p) => p.id === proc.id)) {
    const id = list.length ? Math.max(...list.map((p) => p.id)) + 1 : 1
    const newProc = { ...proc, id }
    list.push(newProc)
    write(PROCEDURES_KEY, list)
    return newProc
  }
  list.push(proc)
  write(PROCEDURES_KEY, list)
  return proc
}

// CSV helpers
function toCSV(rows, headers) {
  const esc = (v) => String(v ?? "").replace(/"/g, '""')
  const headerLine = headers.join(",")
  const lines = rows.map((r) => headers.map((h) => `"${esc(r[h])}"`).join(","))
  return [headerLine, ...lines].join("\n")
}

export function exportProceduresCSV() {
  const rows = getProcedures()
  const headers = ["id", "name", "category", "price"]
  return toCSV(rows, headers)
}

export function importProceduresCSV(text, { replace = false } = {}) {
  const lines = text.split(/\r?\n/).filter(Boolean)
  if (!lines.length) return []
  const headers = lines[0].split(/,\s*/).map((h) => h.replace(/"/g, "").trim())
  const data = lines.slice(1).map((line) => {
    // basic CSV parse (handles quoted values)
    const parts = line.match(/(?:"([^"]*)"|([^,]+))(?:,|$)/g) || []
    const values = parts.map((p) => p.replace(/,$/, "").replace(/^"|"$/g, ""))
    const obj = {}
    headers.forEach((h, i) => {
      obj[h] = values[i]
    })
    return obj
  })

  const parsed = data.map((r) => ({ id: r.id ? Number(r.id) : undefined, name: r.name, category: r.category, price: Number(r.price || 0) }))
  if (replace) {
    write(PROCEDURES_KEY, parsed.map((p, i) => ({ ...p, id: p.id ?? i + 1 })))
    return getProcedures()
  }
  // append, ensuring ids
  const existing = getProcedures()
  const maxId = existing.length ? Math.max(...existing.map((p) => p.id)) : 0
  const toAdd = parsed.map((p, i) => ({ ...p, id: p.id ?? (maxId + i + 1) }))
  const merged = [...existing, ...toAdd]
  write(PROCEDURES_KEY, merged)
  return merged
}

export function getBillCSV(billId) {
  const bills = getBills()
  const bill = bills.find((b) => b.id === billId)
  if (!bill) return ""
  const procedures = getProcedures()
  // build CSV with meta header then items
  const meta = `Invoice ID,${bill.id}\nPatient ID,${bill.patientId}\nDate,${new Date(bill.createdAt).toISOString()}\nPaid,${bill.paid}\n\n`
  const itemHeaders = ["procedureId", "procedureName", "qty", "price", "lineTotal"]
  const rows = bill.items.map((it) => {
    const proc = procedures.find((p) => p.id === it.procedureId) || { name: `#${it.procedureId}` }
    return { procedureId: it.procedureId, procedureName: proc.name, qty: it.qty, price: it.price, lineTotal: (it.qty * it.price).toFixed(2) }
  })
  const csvItems = toCSV(rows, itemHeaders)
  return meta + csvItems
}

export function exportAllBillsCSV() {
  const bills = getBills()
  const procedures = getProcedures()
  const headers = ["billId", "patientId", "createdAt", "paid", "procedureId", "procedureName", "qty", "price", "lineTotal"]
  const rows = []
  bills.forEach((b) => {
    b.items.forEach((it) => {
      const proc = procedures.find((p) => p.id === it.procedureId) || { name: `#${it.procedureId}` }
      rows.push({ billId: b.id, patientId: b.patientId, createdAt: new Date(b.createdAt).toISOString(), paid: b.paid, procedureId: it.procedureId, procedureName: proc.name, qty: it.qty, price: it.price, lineTotal: (it.qty * it.price).toFixed(2) })
    })
  })
  return toCSV(rows, headers)
}

export function getPatientProcedures(patientId) {
  const map = read(PATIENT_PROCS_KEY, {})
  return map[patientId] || []
}

export function assignProcedureToPatient(patientId, procedureId) {
  const map = read(PATIENT_PROCS_KEY, {})
  const list = Array.isArray(map[patientId]) ? map[patientId] : []
  // store entries with timestamp
  list.push({ procedureId, assignedAt: Date.now() })
  map[patientId] = list
  write(PATIENT_PROCS_KEY, map)
  return map[patientId]
}

export function removeProcedureFromPatient(patientId, procedureId) {
  const map = read(PATIENT_PROCS_KEY, {})
  const list = (map[patientId] || []).filter((p) => p.procedureId !== procedureId)
  map[patientId] = list
  write(PATIENT_PROCS_KEY, map)
  return list
}

// Billing
export function getBills() {
  return read(BILLS_KEY, [])
}

function nextBillId(bills) {
  return bills.length ? Math.max(...bills.map((b) => b.id)) + 1 : 1
}

export function createBill(patientId, items) {
  // items: [{ procedureId, price, qty }]
  const bills = getBills()
  const id = nextBillId(bills)
  const total = items.reduce((s, it) => s + (Number(it.price || 0) * Number(it.qty || 1)), 0)
  const bill = { id, patientId, items, total, createdAt: Date.now(), paid: false }
  bills.push(bill)
  write(BILLS_KEY, bills)
  return bill
}

export function getPatientBills(patientId) {
  return getBills().filter((b) => b.patientId === patientId)
}

export function markBillPaid(billId, paid = true) {
  const bills = getBills().map((b) => (b.id === billId ? { ...b, paid } : b))
  write(BILLS_KEY, bills)
  return bills.find((b) => b.id === billId)
}

export function removeBill(billId) {
  const bills = getBills().filter((b) => b.id !== billId)
  write(BILLS_KEY, bills)
  return bills
}

export default {
  getProcedures,
  addProcedure,
  updateProcedure,
  getPatientProcedures,
  assignProcedureToPatient,
  removeProcedureFromPatient,
}
