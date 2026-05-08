import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarFooter,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { registry } from "@/registries/registry";
import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Link } from "react-router-dom";
// import { useEffect, useState } from "react"

export function AppSideBar() {
  // const [currentAlgo, setCurrentAlgo ] = useState()
  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <h2 className="flex items-center p-5">ALGORITHIMS </h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroupContent>
            <SidebarMenu>
              {registry.map((group) => (
                <Collapsible key={group.category} asChild className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <Link to={group.category.toLowerCase().replace(" ", "_")}>
                          <span>{group.category}</span>
                        </Link>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {group.subcats.map((item) => (
                          <SidebarMenuSubItem key={item.name}>
                            <SidebarMenuSubButton>
                              <Link
                                to={
                                  group.category.toLowerCase().replace(" ", "_") + "/" + item.path
                                }
                              >
                                <span>{item.name}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter></SidebarFooter>
      </Sidebar>
    </>
  );
}
