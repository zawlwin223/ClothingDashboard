import nodemailer from 'nodemailer'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const { name, email, order } = await request.json()
  const orderHtml = order.map(
    (
      item: any
    ) => ` <div style="border:1px solid #ccc; padding:10px; border-radius:8px; max-width:400px;">
        <img src="${item.image.url}"  alt="${item.title}" style="width:200px; max-width:250px;"/>
        <p><strong>Product:</strong> ${item.title}</p>
        <p><strong>Size:</strong> ${item.size}</p>
        <p><strong>Quantity:</strong> ${item.quantity}</p>
        <p><strong>Price:</strong> $${item.price}</p>
        <p><strong>Order ID:</strong> ${item.id}</p>
      </div>`
  )

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // type:"OAuth2",
      user: 'zawlwinp223@gmail.com',
      pass: 'hdsm jgvz gnuf xydm',
    },
  })

  const mailOptions = {
    from: 'Fashion Store',
    to: email,
    subject: 'Order Confirmation',
    // text: 'Hello',
    html: `<h2>Hi ${name},</h2>
      <p>Thank you for your order! Here are your order details:</p>
    ${orderHtml}
      <p>We will notify you once your order is shipped.</p>
      <p>Best regards,<br/>Fashion Store</p>`,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('send works')
    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      { status: 200 }
    )
  } catch (error) {
    console.log("Send doesn't work")
    console.error('Email send error:', error)
    return new Response(JSON.stringify({ message: 'Email sending failed' }), {
      status: 500,
    })
  }
}
