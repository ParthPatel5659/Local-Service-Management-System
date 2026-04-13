const Support = require("../Models/SupportModel")
const mailSend = require('../Utils/MaliUtils');

// Create request
const createSupport = async (req, res) => {
  try {
    const support = await Support.create(req.body)

    res.status(201).json({
      message: "Support created",
      data: support
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getAllSupport = async (req, res) => {
  try {
    const data = await Support.find()
      .populate("userId", "Firstname Lastname email")
      .sort({ createdAt: -1 });

    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserSupport = async (req, res) => {
  try {
    const userId = req.params.id;

    const data = await Support.find({ userId });

    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const replySupport = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { reply } = req.body;

//     const support = await Support.findByIdAndUpdate(
//       id,
//       {
//         reply,
//         status: "Resolved"
//       },
//       { new: true }
//     );

//     res.json({
//       message: "Reply sent",
//       data: support
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const replySupport = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    // ✅ update support
    const support = await Support.findByIdAndUpdate(
      id,
      {
        reply,
        status: "Resolved",
      },
      { new: true }
    ).populate("userId");

    // ✅ send email
    await mailSend(
      support.userId.email,
      "Support Reply",
      "supportReply.html",
      {
        name: support.userId.Firstname,
        message: reply,
      }
    );

    res.json({
      message: "Reply sent + email sent",
      data: support,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createSupport,getAllSupport,getUserSupport,replySupport }