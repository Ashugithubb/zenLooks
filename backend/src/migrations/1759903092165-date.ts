import { MigrationInterface, QueryRunner } from "typeorm";

export class Date1759903092165 implements MigrationInterface {
    name = 'Date1759903092165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unavailable_slots" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "unavailable_slots" ADD "date" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unavailable_slots" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "unavailable_slots" ADD "date" TIMESTAMP NOT NULL`);
    }

}
