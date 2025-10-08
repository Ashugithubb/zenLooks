import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedManyTables1759905164876 implements MigrationInterface {
    name = 'AddedManyTables1759905164876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" ADD "slot" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "slot"`);
    }

}
