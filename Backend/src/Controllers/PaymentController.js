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

module.exports={
    CratePayment
}