import { IMailProvider } from "../IMailProvider";
import { injectable } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer";
import { text } from "express";
import handlebars from "handlebars";
import fs from "fs"

@injectable()
class EtherialMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transport = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
      this.client = transport;
    }).catch((err) => console.error(err));
  }

  async sendMail(to: string, subject: string, variables:any, path:string): Promise<void> {
    const templateFileContext = fs.readFileSync(path).toString("utf-8")

    const templateParse = handlebars.compile(templateFileContext)

    const templateHTML=templateParse(variables)

    const message = await this.client.sendMail({ 
        to,
        from:"NoReply@rentx.com.br",
        subject,
        
        html: templateHTML
    })

    console.log(message);
    console.log(nodemailer.getTestMessageUrl(message))
  }
}

export { EtherialMailProvider };
