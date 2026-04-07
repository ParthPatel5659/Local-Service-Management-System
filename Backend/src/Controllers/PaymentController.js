const razorpay=require("razorpay")
const crypto=require("crypto")
require('dotenv').config();
const paymentSchema=require("../Models/PaymentModel");
// const Razorpay = require("razorpay");

const RAZORPAY_KEY=process.env.RAZORPAY_KEY
const RAZORPAY_SECRET=process.env.RAZORPAY_SECRET

const RazorPay=new razorpay({
  key_id:RAZORPAY_KEY,
  key_secret:RAZORPAY_SECRET
})

// ✅ CREATE ORDER
const CreateRazorPayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now()
    };

    const order = await RazorPay.orders.create(options);

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

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSign === razorpay_signature) {

      const payment = await paymentSchema.create({
        bookingId,
        userId,
        providerId,
        amount,
        paymentMethod,
        transactionId: razorpay_payment_id,
        paymentStatus: "Success"
      });

      return res.json({
        success: true,
        message: "Payment successful",
        data: payment
      });
    }

    res.status(400).json({ message: "Invalid signature" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};



const getallPayment=async(req,res)=>{
    try {
        const fetchPayment=await paymentSchema.find().populate([
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

    const payments = await paymentSchema.find({ providerId })
      .populate("userId", "Firstname")
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
const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    const payment = await paymentSchema.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    );

    res.status(200).json({
      message: "Payment updated",
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