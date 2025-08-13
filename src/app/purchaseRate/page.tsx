'use client'
import { useState } from 'react'
import PurchaseGraph from '../_components/orders/purchaseGraph'
import { Card } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { ChevronDown } from 'lucide-react'
export default function PurchaseRate() {
  const [purchaseRate, setPurchaseRate] = useState('Daily Purchase Rate')
  return (
    <div className="p-8 ">
      <Card className="px-9 py-5 mt-2">
        <div className="w-full flex justify-between items-center">
          <h1 className="font-bold  text-[30px] mb-5 ms-3">Purchase Rate</h1>
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-black text-white w-[250px] px-3 flex items-center justify-around h-[40px] rounded-[5px]">
              {purchaseRate}
              <ChevronDown className="mt-1"></ChevronDown>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => setPurchaseRate('Daily Purchase Rate')}>
                Daily Purchase Rate
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setPurchaseRate('Monthly Purchase Rate')}>
                Monthly Purchase Rate
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="h-[450px] ">
          <PurchaseGraph purchaseRate={purchaseRate}></PurchaseGraph>
        </div>
      </Card>
    </div>
  )
}
