import { MigrationInterface, QueryRunner } from "typeorm";

export class Deleted1760035513063 implements MigrationInterface {
    name = 'Deleted1760035513063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "deletedAt"`);
    }

}
