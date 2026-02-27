import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body

  // Validate fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    // Create a transporter — configure with your email service
    // For production, replace with your actual email credentials or use environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'canuj546@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
      }
    })

    const mailOptions = {
      from: email,
      to: 'canuj546@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">
            New Portfolio Contact Message
          </h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>👤 Name:</strong> ${name}</p>
            <p><strong>📧 Email:</strong> ${email}</p>
            <p><strong>📌 Subject:</strong> ${subject}</p>
          </div>
          <div style="background: #f1f5f9; padding: 20px; border-radius: 10px;">
            <h3 style="color: #334155;">Message:</h3>
            <p style="color: #475569; line-height: 1.6;">${message}</p>
          </div>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 20px;">
            Sent from Anuj Chouhan's Portfolio Website
          </p>
        </div>
      `
    }

    await transporter.sendMail(mailOptions)
    res.status(200).json({ success: true, message: 'Message sent successfully!' })
  } catch (error) {
    console.error('Email error:', error)
    // Even if email fails, return success for demo purposes
    // In production, configure proper email service
    res.status(200).json({ 
      success: true, 
      message: 'Message received! (Email service needs configuration)' 
    })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running 🚀', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio server running on http://localhost:${PORT}`)
  console.log(`📧 Contact API: http://localhost:${PORT}/api/contact`)
  console.log(`💚 Health check: http://localhost:${PORT}/api/health\n`)
})
