import { MigrationInterface, QueryRunner } from "typeorm";

export class Db1760214801043 implements MigrationInterface {
    name = 'Db1760214801043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "services" ("serviceId" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "time" integer NOT NULL, "discount" integer NOT NULL DEFAULT '0', "imageUrl" character varying NOT NULL, "category" "public"."services_category_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_bd9b50de0bd3040ab0debaf36f5" PRIMARY KEY ("serviceId"))`);
        await queryRunner.query(`CREATE TABLE "bookings" ("bookingId" SERIAL NOT NULL, "date" date NOT NULL, "slot" TIME NOT NULL, "phoneNo" character varying NOT NULL, "bookedAt" TIMESTAMP NOT NULL DEFAULT now(), "serviceId" integer, "userId" integer, CONSTRAINT "PK_35a5c2c23622676b102ccc3b113" PRIMARY KEY ("bookingId"))`);
        await queryRunner.query(`CREATE TABLE "unavailable_slots" ("id" SERIAL NOT NULL, "date" date NOT NULL, "start_time" TIME NOT NULL, "end_time" TIME NOT NULL, "reason" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_f25c3338f1e9f61f0ca2c2d53b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("userId" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'User', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_15a2431ec10d29dcd96c9563b65" FOREIGN KEY ("serviceId") REFERENCES "services"("serviceId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_38a69a58a323647f2e75eb994de" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "unavailable_slots" ADD CONSTRAINT "FK_29c53076fb094147c548a327094" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unavailable_slots" DROP CONSTRAINT "FK_29c53076fb094147c548a327094"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_38a69a58a323647f2e75eb994de"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_15a2431ec10d29dcd96c9563b65"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "unavailable_slots"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
        await queryRunner.query(`DROP TABLE "services"`);
    }

}
