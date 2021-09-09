

import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateRentalTable1631118792007 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`Alter table rentals alter column end_date drop not null `)
        await queryRunner.query(`Alter table rentals alter column total drop not null `)


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
