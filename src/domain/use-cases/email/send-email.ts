import { EmailRepository } from "../../repositories/email.repository";
import { SendMailOptions } from "../../types/email.types";

export interface EmailSendUseCase {
    execute(options: SendMailOptions): Promise<boolean>;
}

export class SendEmail implements EmailSendUseCase {

    constructor(
        private readonly repository: EmailRepository,
    ) { }

    execute(options: SendMailOptions): Promise<boolean> {
        return this.repository.sendEmail(options);
    }

}