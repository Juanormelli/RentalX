"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SESMailProvider = void 0;

var _tsyringe = require("tsyringe");

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _fs = _interopRequireDefault(require("fs"));

var _dec, _dec2, _dec3, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let SESMailProvider = (_dec = (0, _tsyringe.injectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = class SESMailProvider {
  constructor() {
    this.client = void 0;
    this.client = _nodemailer.default.createTransport({
      SES: new _awsSdk.default.SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_SES_REGION
      })
    });
  }

  async sendMail(to, subject, variables, path) {
    const templateFileContext = _fs.default.readFileSync(path).toString("utf-8");

    const templateParse = _handlebars.default.compile(templateFileContext);

    const templateHTML = templateParse(variables);
    const message = await this.client.sendMail({
      to,
      from: "NoReply@rentx.com.br",
      subject,
      html: templateHTML
    });
    console.log(message);
    console.log(_nodemailer.default.getTestMessageUrl(message));
  }

}) || _class) || _class) || _class);
exports.SESMailProvider = SESMailProvider;