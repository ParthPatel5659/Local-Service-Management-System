const Razorpay = require('razorpay')
const crypto = require("crypto");
require("dotenv").config();
const Payment = require("../Models/PaymentModel");
const Booking = require("../Models/BookingModel");
const logActivity = require("../Utils/activityLogger");
const Notification = require("../Models/NotificationModel");

const razorpayClient = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET
});

// ✅ CREATE ORDER
const CreateRazorPayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({
        message: "Amount is required"
      });
    }

    const order = await razorpayClient.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    });

    res.status(200).json({
      success: true,
      order
    });

  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: error.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
      userId,
      providerId,
      amount,
      paymentMethod
    } = req.body;

    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const payment = await Payment.create({
      bookingId,
      userId,
      providerId,
      amount,
      paymentMethod,
      orderId: razorpay_order_id,
      transactionId: razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      paymentStatus: "Success"
    });

    if (bookingId) {
      await Booking.findByIdAndUpdate(bookingId, {
        paymentStatus: "Paid"
      });
    }

     await logActivity({
      userId,
      role: "user",
      action: "PAYMENT_SUCCESS",
      message: "User completed payment successfully",
      meta: {
        bookingId,
        amount,
        paymentId: razorpay_payment_id
      }
    });

    // ===============================
    // 🔔 NOTIFICATION FOR USER
    // ===============================
    await Notification.create({
      userId: userId,
      providerId: providerId,
      title: "Payment Successful",
      message: "Your payment has been completed successfully.",
      type: "payment"
    });

    // ===============================
    // 🔔 NOTIFICATION FOR PROVIDER
    // ===============================
    await Notification.create({
      userId: userId, // ⚠️ REQUIRED FIELD
      providerId: providerId,
      title: "New Payment Received",
      message: "You have received a payment for a booking.",
      type: "payment"
    });


    return res.status(200).json({
      success: true,
      message: "Payment successful",
      data: payment
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};



const getallPayment=async(req,res)=>{
    try {
        const fetchPayment=await Payment.find().populate([
            {path:"userId"},
            {path: "providerId"},
            {path:"bookingId"}
        ])
         res.status(200).json({
      message: " get allPayment  successful",
      data:fetchPayment
    });
    } catch (error) {
         res.status(500).json({
            message:error.message
        })
    }
}

//get for provider

const getProviderPayments = async (req, res) => {
  try {
    const providerId = req.params.id;

    const payments = await Payment.find({ providerId })
      .populate("userId", "Firstname Lastname")
      .populate("bookingId");

    res.status(200).json({
      message: "Provider payments fetched",
      data: payments,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching payments",
      error: error.message,
    });
  }
};

//update payment status
// const updatePaymentStatus = async (req, res) => {
//   try {
//     const { paymentStatus } = req.body;

//     const payment = await paymentSchema.findByIdAndUpdate(
//       req.params.id,
//       { paymentStatus },
//       { new: true }
//     );

//     res.status(200).json({
//       message: "Payment updated",
//       data: payment,
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: "Error updating payment",
//       error: error.message,
//     });
//   }
// };

// controllers/paymentController.js


 const updatePaymentStatus = async (req, res) => {
  try {

    const { paymentStatus } = req.body;

    // ✅ Validate input
    const validStatus = ["pending", "success", "failed"];

    if (!validStatus.includes(paymentStatus)) {
      return res.status(400).json({
        message: "Invalid payment status"
      });
    }

    // ✅ Update payment
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status: paymentStatus },   // ⚠️ your model uses "status"
      { new: true }
    );

    // ❌ If not found
    if (!payment) {
      return res.status(404).json({
        message: "Payment not found"
      });
    }

    // ✅ If payment success → update booking
    if (paymentStatus === "success") {
      await Booking.findByIdAndUpdate(payment.booking, {
        paymentStatus: "paid"
      });
    }

    res.status(200).json({
      message: "Payment updated successfully",
      data: payment,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating payment",
      error: error.message,
    });
  }
};

module.exports={
    CreateRazorPayOrder,
    verifyPayment,
    getallPayment,
    getProviderPayments,
    updatePaymentStatus
}
