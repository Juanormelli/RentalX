import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUserTable1630938429486 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users ADD PRIMARY KEY (id) `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
