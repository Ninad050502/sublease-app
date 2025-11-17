import express from "express";
import nodemailer from "nodemailer";
import Lease from "../models/Lease.js";

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail", // or other
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* 
  POST /api/contact/interest
  body: { leaseId, takerEmail, message }
*/
router.post("/interest", async (req, res) => {
  try {
    const { leaseId, takerEmail, message } = req.body;

    const lease = await Lease.findById(leaseId).populate("giver", "email");
    if (!lease || !lease.giver?.email) {
      return res.status(404).json({ message: "Lease or giver not found" });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: lease.giver.email,
      subject: `Interest in your sublease: ${lease.title}`,
      text: `
A taker is interested in your sublease listing:

Title: ${lease.title}
Location: ${lease.location}
Rent: $${lease.amount}/month
Duration: ${lease.duration} months

Taker's email: ${takerEmail}

Message from taker:
${message || "(no message provided)"}
      `,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("❌ Error sending contact email:", err);
        return res.status(500).json({ message: "Failed to send email" });
      }
      console.log("📧 Contact email sent:", info.response);
      res.json({ message: "Email sent to the giver successfully" });
    });
  } catch (err) {
    console.error("🔥 Error in contact/interest:", err);
    res.status(500).json({ message: "Error sending email" });
  }
});

export default router;
