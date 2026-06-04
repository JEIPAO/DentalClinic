import * as React from "react"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconGripVertical,
  IconLayoutColumns,
  IconLoader,
  IconPlus,
  IconTrendingUp,
} from "@tabler/icons-react"
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { toast } from "sonner"
import { z } from "zod"

import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import {RegisterPatient}  from "@/components/Patient/register-patient"
import { ro } from "date-fns/locale/ro";

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
})

// Create a separate component for the drag handle
function DragHandle({
  id
}) {
  const { attributes, listeners } = useSortable({
    id,
  })

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent">
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

const columns = [
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon">
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
   {
    accessorKey: "id",
    header: "PatientID",
    cell: ({ row }) => {
      return row.original.id;
    },
    enableHiding: false,
  },
  {
    accessorKey: "firstname",
    header: "Firstname",
    cell: ({ row }) => {
      return row.original.firstname;
    },
    enableHiding: false,
  },
  {
    accessorKey: "middlename",
    header: "Middle Name",
    cell: ({ row }) => {
       return row.original.middlename
    },
    enableHiding: false,
  },
  {
    accessorKey: "lastname",
    header: "Last Name",
    cell: ({ row }) => (
      row.original.lastname
    ),
  },

  {
    accessorKey: "datebirth",
    header: "Date of Birth",
    cell: ({ row }) => {
      return row.original.datebirth
    },
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => {
      return row.original.age
    },
  },
  {
    accessorKey: "sex",
    header: "Sex",
    cell: ({ row }) => {
      return row.original.sex
    },
  },
  {
    accessorKey: "religion",
    header: "Religion",
    cell: ({ row }) => {
      return row.original.religion
    },
  },
  
  {
    accessorKey: "nationality",
    header: "Nationality",
    cell: ({ row }) => {
     return row.original.nationality
    },
  },
  {
    accessorKey: "contactno",
    header: "Contact No.",
    cell: ({ row }) => {
     return row.original.contact
    },
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
     return row.original.address
    },
  },
  {
    accessorKey: "Occupation",
    header: "Occupation",
    cell: ({ row }) => {
      return row.original.occupation
    },
  },
  {
    accessorKey: "emailaddress",
    header: "Email Address",
    cell: ({ row }) => {
      return row.original.email
    },
  },
  {
    accessorKey: "nickname",
    header: "Nick Name",
    cell: ({ row }) => {
      return row.original.nickname
    },
  },
  
]

function DraggableRow({
  row
}) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function DataTable({
  data: initialData
}) {
  const [data, setData] = React.useState(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState({})
  const [columnFilters, setColumnFilters] = React.useState([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [sorting, setSorting] = React.useState([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [editingRow, setEditingRow] = React.useState(null)
  const [editValues, setEditValues] = React.useState({})
  const [isEditOpen, setIsEditOpen] = React.useState(false)

  const handleEdit = React.useCallback((row) => {
    setEditingRow(row)
    setEditValues(row)
    setIsEditOpen(true)
  }, [])

  const handleDelete = React.useCallback((rowId) => {
    setData((current) => current.filter((item) => item.id !== rowId))
  }, [])

  const handleSave = React.useCallback(() => {
    if (!editingRow) return

    setData((current) =>
      current.map((item) =>
        item.id === editingRow.id ? { ...item, ...editValues } : item
      )
    )
    setIsEditOpen(false)
    setEditingRow(null)
  }, [editingRow, editValues])

  const handleEditChange = (field) => (event) => {
    setEditValues((current) => ({
      ...current,
      [field]: event.target.value,
    }))
  }
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  const dataIds = React.useMemo(() => data?.map(({ id }) => id) || [], [data])

  const tableColumns = React.useMemo(
    () =>
      columns.map((column) =>
        column.id === "actions"
          ? {
              ...column,
              cell: ({ row }) => (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                      size="icon">
                      <IconDotsVertical />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem onClick={() => handleEdit(row.original)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ),
            }
          : column
      ),
    [handleEdit, handleDelete]
  )

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    globalFilterFn: (row, columnId, filterValue) => {
      const search = String(filterValue).toLowerCase()
      return row
        .getAllCells()
        .some((cell) =>
          String(cell.getValue()).toLowerCase().includes(search)
        )
    },
  })

  function handleDragEnd(event) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex);
      })
    }
  }

  return (
    <Tabs defaultValue="outline" className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
       
        <TabsList
          className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="outline">Patient Record</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Search patient name..."
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="w-lg max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconLayoutColumns />
                <span className="hidden lg:inline">Customize Columns</span>
                <span className="lg:hidden">Columns</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter((column) =>
                typeof column.accessorFn !== "undefined" &&
                column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }>
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
           <RegisterPatient/>
       
        </div>
      </div>
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}>
            <Table>
              <TableHeader className="bg-muted sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <Drawer open={isEditOpen} onOpenChange={setIsEditOpen} direction="right">
          <DrawerContent>
            <DrawerHeader className="gap-1">
              <DrawerTitle>Edit patient</DrawerTitle>
              <DrawerDescription>
                Update patient details and save your changes.
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col gap-4 px-4 pb-4">
              {editingRow ? (
                <Tabs defaultValue="information" className="w-full">
                  <TabsList>
                    <TabsTrigger value="information">Information</TabsTrigger>
                    <TabsTrigger value="minors">For Minors</TabsTrigger>
                    <TabsTrigger value="dentalmedical">Dental & Medical History</TabsTrigger>
                  </TabsList>
                  <TabsContent value="information" className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="grid gap-3">
                        <Label htmlFor="edit-firstname">Firstname</Label>
                        <Input
                          id="edit-firstname"
                          value={editValues.firstname ?? ""}
                          onChange={handleEditChange("firstname")}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="edit-middlename">Middle Name</Label>
                        <Input
                          id="edit-middlename"
                          value={editValues.middlename ?? ""}
                          onChange={handleEditChange("middlename")}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="edit-lastname">Last Name</Label>
                        <Input
                          id="edit-lastname"
                          value={editValues.lastname ?? ""}
                          onChange={handleEditChange("lastname")}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="edit-datebirth">Date of Birth</Label>
                        <Input
                          id="edit-datebirth"
                          value={editValues.datebirth ?? ""}
                          onChange={handleEditChange("datebirth")}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="edit-age">Age</Label>
                        <Input
                          id="edit-age"
                          value={editValues.age ?? ""}
                          onChange={handleEditChange("age")}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="edit-sex">Sex</Label>
                        <Input
                          id="edit-sex"
                          value={editValues.sex ?? ""}
                          onChange={handleEditChange("sex")}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="edit-religion">Religion</Label>
                        <Input
                          id="edit-religion"
                          value={editValues.religion ?? ""}
                          onChange={handleEditChange("religion")}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="edit-nationality">Nationality</Label>
                        <Input
                          id="edit-nationality"
                          value={editValues.nationality ?? ""}
                          onChange={handleEditChange("nationality")}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="edit-contact">Contact No.</Label>
                        <Input
                          id="edit-contact"
                          value={editValues.contact ?? ""}
                          onChange={handleEditChange("contact")}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="edit-address">Address</Label>
                        <Input
                          id="edit-address"
                          value={editValues.address ?? ""}
                          onChange={handleEditChange("address")}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="edit-occupation">Occupation</Label>
                        <Input
                          id="edit-occupation"
                          value={editValues.occupation ?? ""}
                          onChange={handleEditChange("occupation")}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="edit-email">Email</Label>
                        <Input
                          id="edit-email"
                          value={editValues.email ?? ""}
                          onChange={handleEditChange("email")}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="edit-nickname">Nickname</Label>
                        <Input
                          id="edit-nickname"
                          value={editValues.nickname ?? ""}
                          onChange={handleEditChange("nickname")}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="minors" className="space-y-4">
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="edit-parent-guardian">Parent/Guardian's Name</Label>
                        <Input
                          id="edit-parent-guardian"
                          value={editValues.parentGuardian ?? ""}
                          onChange={handleEditChange("parentGuardian")}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="edit-minor-occupation">Occupation</Label>
                        <Input
                          id="edit-minor-occupation"
                          value={editValues.minorOccupation ?? ""}
                          onChange={handleEditChange("minorOccupation")}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="edit-minor-referring">Whom may we thank for referring you?</Label>
                        <Input
                          id="edit-minor-referring"
                          value={editValues.minorReferring ?? ""}
                          onChange={handleEditChange("minorReferring")}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="edit-minor-consultation">Reason for Dental Consultation</Label>
                        <Input
                          id="edit-minor-consultation"
                          value={editValues.minorConsultation ?? ""}
                          onChange={handleEditChange("minorConsultation")}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="dentalmedical" className="space-y-4">
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="edit-previous-dentist">Previous Dentist</Label>
                        <Input
                          id="edit-previous-dentist"
                          value={editValues.previousDentist ?? ""}
                          onChange={handleEditChange("previousDentist")}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="edit-last-dental-visit">Last Dental Visit</Label>
                        <Input
                          id="edit-last-dental-visit"
                          value={editValues.lastDentalVisit ?? ""}
                          onChange={handleEditChange("lastDentalVisit")}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="edit-med-dentist">Name of Dentist</Label>
                        <Input
                          id="edit-med-dentist"
                          value={editValues.medDentist ?? ""}
                          onChange={handleEditChange("medDentist")}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="edit-med-office-address">Office Address</Label>
                        <Input
                          id="edit-med-office-address"
                          value={editValues.medOfficeAddress ?? ""}
                          onChange={handleEditChange("medOfficeAddress")}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="edit-good-health">1. Are you in good health?</Label>
                        <Input
                          id="edit-good-health"
                          value={editValues.goodHealth ?? ""}
                          onChange={handleEditChange("goodHealth")}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="edit-medical-treatment">2. Are you under medical treatment now?</Label>
                        <Input
                          id="edit-medical-treatment"
                          value={editValues.medicalTreatment ?? ""}
                          onChange={handleEditChange("medicalTreatment")}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="edit-serious-illness">3. Have you ever had serious illness or surgical operation?</Label>
                        <Input
                          id="edit-serious-illness"
                          value={editValues.seriousIllness ?? ""}
                          onChange={handleEditChange("seriousIllness")}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="rounded border border-dashed border-muted p-4 text-sm text-muted-foreground">
                  Select a row and click Edit to update patient details.
                </div>
              )}
            </div>
            <DrawerFooter>
              <Button onClick={handleSave} disabled={!editingRow}>
                Save changes
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <div className="flex items-center justify-between px-4">
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}>
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}>
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}>
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}>
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}>
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="past-performance" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="focus-documents" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>
  );
}

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },

  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  }
}

function TableCellViewer({
  item
}) {
  const isMobile = useIsMobile()

  return (

    <Drawer direction={isMobile ? "bottom" : "right"}>
       
      {/* <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.id} 
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.header}</DrawerTitle>
          <DrawerDescription>
            Showing total visitors for the last 6 months
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 10,
                  }}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.6}
                    stroke="var(--color-mobile)"
                    stackId="a" />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a" />
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 leading-none font-medium">
                  Trending up by 5.2% this month{" "}
                  <IconTrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Showing total visitors for the last 6 months. This is just
                  some random text to test the layout. It spans multiple lines
                  and should wrap around.
                </div>
              </div>
              <Separator />
            </>
          )}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Header</Label>
              <Input id="header" defaultValue={item.header} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">Type</Label>
                <Select defaultValue={item.type}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Table of Contents">
                      Table of Contents
                    </SelectItem>
                    <SelectItem value="Executive Summary">
                      Executive Summary
                    </SelectItem>
                    <SelectItem value="Technical Approach">
                      Technical Approach
                    </SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Capabilities">Capabilities</SelectItem>
                    <SelectItem value="Focus Documents">
                      Focus Documents
                    </SelectItem>
                    <SelectItem value="Narrative">Narrative</SelectItem>
                    <SelectItem value="Cover Page">Cover Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Done">Done</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="target">Target</Label>
                <Input id="target" defaultValue={item.target} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="limit">Limit</Label>
                <Input id="limit" defaultValue={item.limit} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="reviewer">Reviewer</Label>
              <Select defaultValue={item.reviewer}>
                <SelectTrigger id="reviewer" className="w-full">
                  <SelectValue placeholder="Select a reviewer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                  <SelectItem value="Jamik Tashpulatov">
                    Jamik Tashpulatov
                  </SelectItem>
                  <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent> */}
    </Drawer>
  );
}