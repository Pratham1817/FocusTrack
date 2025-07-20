import 'dotenv/config';
import fs from 'fs';
import handlebars from 'handlebars';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

export const sendEmail = async (recipient, resetToken) => {
	const emailTempl = fs
		.readFileSync('./templates/emailTemplate.html', 'utf-8')
		.toString();
	const template = handlebars.compile(emailTempl);

	const html = template({
		token: resetToken,
	});

	const mailerSend = new MailerSend({
		apiKey: process.env.MAILERSEND_API_KEY,
	});

	const sentFrom = new Sender(
		`support@${process.env.EMAIL_DOMAIN}`,
		'TaskFlow Pro'
	);
	const recipients = [new Recipient(recipient.email, recipient.username)];

	const emailParams = new EmailParams()
		.setFrom(sentFrom)
		.setTo(recipients)
		.setSubject('Password Reset')
		.setHtml(html);

	await mailerSend.email.send(emailParams);
};
