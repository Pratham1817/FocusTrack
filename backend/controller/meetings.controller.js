import mongoose from 'mongoose';
import Meeting from '../models/meeting.js';
import nodemailer from 'nodemailer';
import User from '../models/user.js';

// Gmail Transporter Setup (uses your credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'prathamvyavahare18@gmail.com',
    pass: 'scowopotkrvgpfzi', // App Password, not your Gmail password
  },
});

// Send email reminder
const sendReminderEmail = async (email, title, date, time) => {
  const mailOptions = {
    from: 'prathamvyavahare18@gmail.com',
    to: email,
    subject: 'Meeting Reminder - TaskFlow',
    text: `Hey! You’ve scheduled a meeting: "${title}" on ${date} at ${time}.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent to', email);
  } catch (err) {
    console.error('❌ Email sending failed:', err.message);
  }
};

const getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({ userId: req.user.id });
    res.status(200).json(meetings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUserMeetings = async (req, res) => {
  const { id } = req.params;
  try {
    const userMeetings = await Meeting.find({ userId: id });
    res.status(200).json(userMeetings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const createMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.create(req.body);

    // Get user email from database using userId
    const userId = req.body.userId;
    const user = await User.findById(userId);

    if (!user || !user.email) {
      return res.status(400).json({ error: 'User email not found.' });
    }

    // Send reminder email
    await sendReminderEmail(user.email, meeting.title, meeting.date, meeting.time);

    res.status(200).json(meeting);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const deleteMeeting = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid meeting ID" });
  }

  try {
    const meeting = await Meeting.findByIdAndDelete(id);
    res.status(200).json(meeting);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateMeeting = async (req, res) => {
  const { id } = req.params;
  try {
    const meeting = await Meeting.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
    res.status(200).json(meeting);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteAllMeetings = async (req, res) => {
  try {
    await Meeting.deleteMany();
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export {
  getAllMeetings,
  getUserMeetings,
  createMeeting,
  deleteMeeting,
  updateMeeting,
  deleteAllMeetings,
};
