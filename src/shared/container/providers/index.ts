import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayJsDateProvider } from "./DateProvider/implementations/DayJsDateProvider";

import { IMailProvider } from "./MailProvider/IMailProvider";

import { EtherialMailProvider } from "./MailProvider/implementations/EtherialMailProvider";
import { LocalStorageProvider } from "./StorageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./StorageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "./StorageProvider/IStorageProvider";




container.registerInstance<IMailProvider>(
    "EtherialMailProvider",
    new EtherialMailProvider()
)






container.registerSingleton<IDateProvider>(
    "DayJsDateProvider",
    DayJsDateProvider
)

const diskStorage = {
    local:LocalStorageProvider,
    s3:S3StorageProvider,
}

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.disk]
)