import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function sendUserConfirmationEmail(to: string, name: string) {
  return resend.emails.send({
    from: 'Company A <onboarding@resend.dev>',
    to,
    subject: 'Quote Request Received',
    html: `<p>Hi ${name},</p><p>We have received your quote request. We'll get back to you soon!</p>`,
  })
}

export async function sendAdminNotificationEmail(
    name: string,
    email: string,
    productName: string,
    message?: string
  ) {
    return resend.emails.send({
      from: 'Company A <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL!,
      subject: 'New Quote Request',
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Product:</strong> ${productName}</p>
        ${
          message
            ? `<p><strong>Message:</strong></p><p style="white-space: pre-wrap;">${message}</p>`
            : ''
        }
      `,
    })
  }  
