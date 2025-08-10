import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Order } from '@/app/_type/orderType'
import { useSendEmail } from '@/app/_hook/sendEmail'

export default function CustomerOrderModal({
  order,
  onClose,
  setOrderConfirmed,
}: {
  order: Order
  onClose: () => void
  setOrderConfirmed: (id: string) => void
}) {
  const confirmedData = {
    name: order.customer.fullName,
    email: order.customer.email,
    order: order.items,
  }

  const sendEmail = useSendEmail(order.id, onClose, setOrderConfirmed)
  const { isPending } = sendEmail

  return (
    <div className="w-full h-full flex flex-col">
      <div className="pb-3">
        <h1 className="text-[20px] font-semibold ">
          {order.customer.fullName}'s Order{' '}
        </h1>
        <p>
          <span className="font-semibold">Email</span>:{' '}
          <span>{order.customer.email}</span>
        </p>
      </div>
      {/* Scrollable content */}
      <div className=" overflow-y-auto overflow-x-hidden scrollbar-thin h-[400px]">
        {order.items.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="w-full flex items-center gap-4 p-4">
            <Image
              width={40}
              height={50}
              src={item.image.url}
              alt={item.image.alt || 'Order Item Image'}
            />
            <div className="w-full">
              <h2 className="font-bold">{item.title}</h2>
              <div className="flex">
                <p className="me-5">
                  <span className="font-semibold">Quantity</span>:{' '}
                  {item.quantity}
                </p>
                <p className="me-3">
                  <span className="font-semibold">Size</span>: {item.size}
                </p>

                <p className="flex-1">
                  <span className="font-semibold">Price</span>: $
                  {item.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4">
        <span className="font-semibold">Total Price: {order.totalPrice}</span>
      </p>

      {/* Button always at the bottom */}
      <div className="mt-5">
        <Button
          onClick={() => sendEmail.mutate(confirmedData)}
          className="w-full">
          {isPending ? 'Sending...' : 'Send Confirmed Email'}
        </Button>
      </div>
    </div>
  )
}
