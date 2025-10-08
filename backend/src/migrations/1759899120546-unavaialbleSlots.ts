import { MigrationInterface, QueryRunner } from "typeorm";

export class UnavaialbleSlots1759899120546 implements MigrationInterface {
    name = 'UnavaialbleSlots1759899120546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unavailable_slots" ADD "userUserId" integer`);
        await queryRunner.query(`ALTER TABLE "unavailable_slots" ADD CONSTRAINT "FK_f697a7f71f6740242a44397d757" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unavailable_slots" DROP CONSTRAINT "FK_f697a7f71f6740242a44397d757"`);
        await queryRunner.query(`ALTER TABLE "unavailable_slots" DROP COLUMN "userUserId"`);
    }

}
