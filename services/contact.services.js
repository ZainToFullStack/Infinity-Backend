// services/emailService.js
import nodemailer from 'nodemailer';

const sendContactEmail = async (contactData) => {
    try {
        // Configure email service
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or your email provider
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_APP_PASSWORD
            }
        });

        // Create email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, // Where to send
            subject: `📩 New Contact: ${contactData.name}`,
            html: `
                <h3>New Website Contact</h3>
                <p><strong>Name:</strong> ${contactData.name}</p>
                <p><strong>Email:</strong> ${contactData.email}</p>
                <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
                <p><strong>Message:</strong></p>
                <p>${contactData.message}</p>
                <br>
                <p><em>Received: ${new Date().toLocaleString()}</em></p>
            `
        };

        // Send it
        await transporter.sendMail(mailOptions);
        console.log('✅ Contact email sent to admin');
        return true;
        
    } catch (error) {
        console.error('❌ Email failed:', error.message);
        return false;
    }
};

export default sendContactEmail;