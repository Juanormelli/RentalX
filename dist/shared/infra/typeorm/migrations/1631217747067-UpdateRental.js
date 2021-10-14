"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateRentalTable1631118792007 = void 0;

class UpdateRentalTable1631118792007 {
  async up(queryRunner) {
    await queryRunner.query(`Alter table rentals alter column end_date drop not null `);
    await queryRunner.query(`Alter table rentals alter column total drop not null `);
  }

  async down(queryRunner) {}

}

exports.UpdateRentalTable1631118792007 = UpdateRentalTable1631118792007;