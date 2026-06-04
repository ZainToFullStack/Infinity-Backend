// const submitcontactform = (req, res) => {
//     try {
//         const { name, email, message, phone } = req.body
//         if (!name || !email || !message) {
//             return res.status(400).json({
//                 success: false,
//                 message: "The name, email and message are required"
//             })
//         }
//         return res.status(200).json({
//             success: true,
//             message: "Thank you! We will contact you soon."
//         })
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: "Server Error",
//             error: error.message
//         })
//     }
// }
// export default submitcontactform;



// In contact.controller.js - UPDATE YOUR CODE
import sendContactEmail from "../services/contact.services.js"

const submitcontactform = async (req, res) => {
    try {
        const { name, email, message, phone } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "The name, email and message are required"
            });
        }

        const emailsend = sendContactEmail({
            name, email, message, phone
        })
        if (emailsend) {
            console.log("The Email is Successfully Send!!!");
            return res.status(200).json({
                success: true,
                message: "Thank you! Your message has been sent."
            })
        }
        else {
            console.log('❌ Email failed, but logging to console');
            // Still log to console as backup
            console.log('📧 Contact Form (Backup Log):');
            console.log('Name:', name);
            console.log('Email:', email);

            return res.status(200).json({
                success: true,
                message: "Thank you! We received your message."
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

export default submitcontactform;