import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Email config (use environment variables)
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_TO = 'adarsh2612006@gmail.com';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact form submission:', { name, email, message });

  // Send email
  const mailOptions = {
    from: `Portfolio Contact <${EMAIL_USER}>`,
    to: EMAIL_TO,
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b><br>${message.replace(/\n/g, '<br>')}</p>`
  };
  console.log('Attempting to send email...');
  transporter.sendMail(mailOptions, (error, info) => {
    console.log('Inside sendMail callback');
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
    console.log('Email sent:', info);
    // Optionally, still save to file
    const clientDir = path.join(__dirname, 'client');
    if (!fs.existsSync(clientDir)) {
      fs.mkdirSync(clientDir);
    }
    const timestamp = Date.now();
    const filename = `contact_${timestamp}.json`;
    const filePath = path.join(clientDir, filename);
    const data = { name, email, message, timestamp };
    fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
      if (err) {
        console.error('Error saving contact info:', err);
        // Email sent, but file failed
        return res.json({ success: true, message: 'Email sent, but failed to save contact info.' });
      }
      res.json({ success: true, message: 'Contact form received, email sent, and saved!' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
}); 