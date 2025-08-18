'use client'

import { Home, SquareActivity } from 'lucide-react'
import { Package, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
  },
  {
    title: 'Products',
    url: '/products',
    icon: Package,
  },
  {
    title: 'Orders',
    url: '/orders',
    icon: ShoppingCart,
  },
  {
    title: 'Purchase Rate',
    url: '/purchaseRate',
    icon: SquareActivity,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className=" text-white">
      <SidebarContent className="bg-black">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white">
            <h1 className="font-bold text-2xl mt-5">Application</h1>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-7">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem className="py-3" key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} prefetch>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
