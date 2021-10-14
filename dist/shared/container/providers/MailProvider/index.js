"use strict";

var _tsyringe = require("tsyringe");

var _EtherialMailProvider = require("./implementations/EtherialMailProvider");

var _SESMailProvider = require("./implementations/SESMailProvider");

const mailProvider = {
  etherial: _tsyringe.container.resolve(_EtherialMailProvider.EtherialMailProvider),
  SES: _tsyringe.container.resolve(_SESMailProvider.SESMailProvider)
};

_tsyringe.container.registerInstance("MailProvider", mailProvider[process.env.MAIL_PROVIDER]);