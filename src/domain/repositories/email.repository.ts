import { SendMailOptions } from "../types/email.types";

export abstract class EmailRepository {

    abstract sendEmail(sendMailOptions: SendMailOptions): Promise<boolean>;

}