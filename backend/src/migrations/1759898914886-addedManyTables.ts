import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedManyTables1759898914886 implements MigrationInterface {
    name = 'AddedManyTables1759898914886'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "unavailable_slots" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "start_time" character varying NOT NULL, "end_time" character varying NOT NULL, "reason" character varying NOT NULL, CONSTRAINT "PK_f25c3338f1e9f61f0ca2c2d53b2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "unavailable_slots"`);
    }

}
