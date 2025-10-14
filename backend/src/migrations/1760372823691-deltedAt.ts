import { MigrationInterface, QueryRunner } from "typeorm";

export class DeltedAt1760372823691 implements MigrationInterface {
    name = 'DeltedAt1760372823691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "deletedAt"`);
    }

}
