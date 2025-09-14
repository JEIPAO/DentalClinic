import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/Patient/data-table"
import {PatientTable} from "@/components/Patient/PatientTable"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "@/app/dashboard/data.json"

export default function Patient() {
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
        {/* <SiteHeader /> */}
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
  
              <div className="px-4 lg:px-6">
                <DataTable data={data} />
              </div>
           
            </div>

            
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
