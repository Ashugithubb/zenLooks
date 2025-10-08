import { MigrationInterface, QueryRunner } from "typeorm";

export class Bookings1759910318986 implements MigrationInterface {
    name = 'Bookings1759910318986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bookings" ("bookingId" SERIAL NOT NULL, "date" date NOT NULL, "slot" character varying NOT NULL, "phoneNo" character varying NOT NULL, "bookedAt" TIMESTAMP NOT NULL DEFAULT now(), "serviceId" integer, "userId" integer, CONSTRAINT "PK_35a5c2c23622676b102ccc3b113" PRIMARY KEY ("bookingId"))`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_15a2431ec10d29dcd96c9563b65" FOREIGN KEY ("serviceId") REFERENCES "services"("serviceId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_38a69a58a323647f2e75eb994de" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_38a69a58a323647f2e75eb994de"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_15a2431ec10d29dcd96c9563b65"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
    }

}
