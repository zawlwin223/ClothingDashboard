'use client'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import classes from './navStyle.module.css'

// export default function Navigation() {
//   const pathname = usePathname()

//   return (
//     <nav className="pt-7  flex-1 bg-black text-white h-screen font-bold text-[15px] px-5">
//       <h1 className="text-2xl ">Admin Dashboard</h1>
//       <ul>
//         <li className="mt-5">
//           <Link
//             href="/dashboard"
//             className={pathname === '/dashboard' ? classes.active : ''}>
//             Dashboard
//           </Link>
//         </li>
//         <li className="mt-5">
//           <Link
//             href="/products"
//             className={pathname === '/products' ? classes.active : ''}>
//             Products
//           </Link>
//         </li>

//         <li className="mt-5">
//           <Link
//             href="/orders"
//             className={pathname === '/orders' ? classes.active : ''}>
//             Orders
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   )
// }

import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react'
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
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Products',
    url: '/products',
    icon: Inbox,
  },
  {
    title: 'Orders',
    url: '/orders',
    icon: Calendar,
  },
  {
    title: 'Purchase Rate',
    url: '/purchaseRate',
    icon: Calendar,
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
                    <Link href={item.url}>
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
