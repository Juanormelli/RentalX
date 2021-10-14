"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecification1629295168094 = void 0;

var _typeorm = require("typeorm");

class CreateSpecification1629295168094 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "specification",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "name",
        type: "varchar"
      }, {
        name: "description",
        type: "varchar"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("specification");
  }

}

exports.CreateSpecification1629295168094 = CreateSpecification1629295168094;