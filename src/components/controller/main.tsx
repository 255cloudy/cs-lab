// This is the main function where my app will live
// This is the main controller for all the lab stuff
import { SidebarProvider, SidebarInset } from "../ui/sidebar";
import { TopBar } from "./top-bar";
import { AppSideBar } from "./side";
import { Outlet } from "react-router-dom";
export function Main() {
  return (
    <>
      <SidebarProvider>
        {/* sidebar shoud be here */}
        <AppSideBar></AppSideBar>
        <SidebarInset>
          {/* Everything that is not the Sidebar */}
          <TopBar></TopBar>
          <div className="p-6">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
