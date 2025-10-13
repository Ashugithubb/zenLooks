import { MigrationInterface, QueryRunner } from "typeorm";

export class PaymentStatus1760357646898 implements MigrationInterface {
    name = 'PaymentStatus1760357646898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."bookings_paymentstatus_enum" AS ENUM('Pending', 'Paid')`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "paymentStatus" "public"."bookings_paymentstatus_enum" NOT NULL DEFAULT 'Pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "paymentStatus"`);
        await queryRunner.query(`DROP TYPE "public"."bookings_paymentstatus_enum"`);
    }

}
