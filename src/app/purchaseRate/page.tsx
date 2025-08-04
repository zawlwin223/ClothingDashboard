import PurchaseGraph from '../_components/orders/purchaseGraph'
export default function PurchaseRate() {
  return (
    <>
      <div className="p-5 mt-2">
        <h1 className="font-bold  text-[30px] mb-5">Purchase Rate</h1>
        <PurchaseGraph></PurchaseGraph>
      </div>
    </>
  )
}
