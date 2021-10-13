import { IMailProvider } from "../IMailProvider";
import { injectable } from "tsyringe";
import aws from "aws-sdk"
import nodemailer, { Transporter } from "nodemailer";
import { text } from "express";
import handlebars from "handlebars";
import fs from "fs"

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
   
     this.client = nodemailer.createTransport({
        SES:new aws.SES({
            apiVersion:"2010-12-01",
            region: process.env.AWS_SES_REGION,
        })
      
    
  })
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
   
export { SESMailProvider };
