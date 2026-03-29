const paymentSchema=require("../Models/PaymentModel");

const CratePayment= async(req,res)=>{
    try {

        const SavePayment= await paymentSchema.create(req.body)
         res.status(201).json({
      message: "Payment successful",
      data:SavePayment
    });
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

const getallPayment=async(req,res)=>{
    try {
        const fetchPayment=await paymentSchema.find().populate([
            {path:"userId"},
            {path: "providerId"}
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
    CratePayment,
    getallPayment,
    getProviderPayments,
    updatePaymentStatus
}