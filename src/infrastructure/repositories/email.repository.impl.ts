import { EmailDatasource } from "../../domain/datasource/email.datasource";
import { EmailRepository } from "../../domain/repositories/email.repository";
import { SendMailOptions } from "../../domain/types/email.types";


export class EmailRepositoryImpl implements EmailRepository {

    constructor(
        private readonly datasource: EmailDatasource
    ){}

    sendEmail(sendMailOptions: SendMailOptions): Promise<boolean> {
        return this.datasource.sendEmail(sendMailOptions)
    }

}