import mailgun from 'mailgun-js';

const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, subject, text } = req.body;

    const data = {
      from: 'Your App <no-reply@yourdomain.com>',
      to: email,
      subject: subject,
      text: text,
    };

    try {
      await mg.messages().send(data);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}