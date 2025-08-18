import nodemailer from 'nodemailer'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const { name, email, order } = await request.json()

  const orderHtml = order
    .map(
      (item: any) => `
        <div style="border:1px solid #ddd; padding:15px; border-radius:8px; margin-bottom:15px; background:#f9f9f9;">
          <img src="${item.image.url}" alt="${item.title}" style="width:150px; height:auto; border-radius:4px; display:block; margin-bottom:10px;" />
          <p style="margin:4px 0;"><strong>Product:</strong> ${item.title}</p>
          <p style="margin:4px 0;"><strong>Size:</strong> ${item.size}</p>
          <p style="margin:4px 0;"><strong>Quantity:</strong> ${item.quantity}</p>
          <p style="margin:4px 0; color:#333;"><strong>Price:</strong> <span style="color:#e63946;">$${item.price}</span></p>
          <p style="margin:4px 0;"><strong>Order ID:</strong> ${item.id}</p>
        </div>`
    )
    .join('')

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'zawlwinp223@gmail.com',
      pass: 'hdsm jgvz gnuf xydm',
    },
  })

  const mailOptions = {
    from: '"Fashion Store" <zawlwinp223@gmail.com>',
    to: email,
    subject: 'Order Confirmation',
    html: `
      <div style="font-family:Arial, sans-serif; background:#ffffff; padding:20px; border-radius:10px; max-width:600px; margin:auto; border:1px solid #eee;">
        <h2 style="color:#2a9d8f;">Hi ${name},</h2>
        <p style="font-size:16px; color:#333;">Thank you for your order! 🎉 Here are your order details:</p>
        ${orderHtml}
        <hr style="margin:20px 0; border:none; border-top:1px solid #ddd;" />
        <p style="font-size:14px; color:#555;">We will notify you once your order is shipped.</p>
        <p style="font-size:14px; color:#555;">Best regards,<br/><strong>Fashion Store</strong></p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      {
        status: 200,
      }
    )
  } catch (error) {
    console.error('Email send error:', error)
    return new Response(JSON.stringify({ message: 'Email sending failed' }), {
      status: 500,
    })
  }
}
