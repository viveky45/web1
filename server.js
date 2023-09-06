const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const db = require('./db'); // Import database connection
const Professor = require('./model/Professor'); // Import Professor model

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());


app.post('/allot-project', async (req, res) => {
  const { projectName, specialization } = req.body;

  if (!projectName || !specialization) {
    res.status(400).json({ error: 'Both project name and specialization are required.' });
    return;
  }

  try {
    // Find the professor with the lowest lastAllottedIndex for the given specialization
    const professor = await Professor.findOneAndUpdate(
      { specialization },
      { $inc: { lastAllottedIndex: 1 } },
      { new: true }
    ).sort({ lastAllottedIndex: 1 });

    if (!professor) {
      res.status(404).json({ error: `No professors found for specialization: ${specialization}` });
      return;
    }

    // Send email to the allotted professor
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vivekupwork45@gmail.com',
        pass: 'szjiojjixtsepfpm',
      },
    });

    const mailOptions = {
      from: 'vivekupwork45@gmail.com',
      to: professor.email,
      subject: 'Project Allotment',
      text: `You have been allotted the project "${projectName}" in the specialization "${specialization}".`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Project allotted successfully!', professor: professor });

  } catch (error) {
    console.error('Error allotting project and sending email:', error);
    res.status(500).json({ error: 'Error allotting project and sending email. Please check the server logs for details.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
