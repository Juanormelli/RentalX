import { container } from "tsyringe";
import { S3StorageProvider } from "../StorageProvider/implementations/S3StorageProvider";
import { IMailProvider } from "./IMailProvider";
import { EtherialMailProvider} from "./implementations/EtherialMailProvider";
import { SESMailProvider } from "./implementations/SESMailProvider";




const mailProvider = {
    etherial:container.resolve(EtherialMailProvider),
    SES:container.resolve(SESMailProvider),
}


container.registerInstance<IMailProvider>(
    "MailProvider",
    mailProvider[process.env.MAIL_PROVIDER],
)


