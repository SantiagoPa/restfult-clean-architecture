import nodemailer, { Transporter } from 'nodemailer';
import { EmailDatasource } from '../../domain/datasource/email.datasource';
import { SendMailOptions } from '../../domain/types/email.types';

export class EmailNodeMailerDatasoruce implements EmailDatasource {

    private transporter: Transporter;

    constructor(
        mailerService: string,
        mailerEmail: string,
        mailerKey: string,
        private readonly postToProvider: boolean,
    ) {
        this.transporter = nodemailer.createTransport({
            service: mailerService,
            auth: {
                user: mailerEmail,
                pass: mailerKey,
            }
        });
    }

    async sendEmail(options: SendMailOptions): Promise<boolean> {

        const { to, subject, htmlBody, attachements = [] } = options;
        if (!this.postToProvider) return true;

        try {
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements,
            });
            // console.log( sentInformation );
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }

    }

}
