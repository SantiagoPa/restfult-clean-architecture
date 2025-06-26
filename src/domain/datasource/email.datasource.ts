import { SendMailOptions } from "../types/email.types";

export abstract class EmailDatasource {

    abstract sendEmail(sendMailOptions: SendMailOptions): Promise<boolean>;

}