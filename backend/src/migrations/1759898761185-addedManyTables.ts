import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedManyTables1759898761185 implements MigrationInterface {
    name = 'AddedManyTables1759898761185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."services_category_enum" AS ENUM('Male', 'Female')`);
        await queryRunner.query(`CREATE TABLE "services" ("serviceId" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "time" integer NOT NULL, "discount" integer NOT NULL DEFAULT '0', "imageUrl" character varying NOT NULL, "category" "public"."services_category_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bd9b50de0bd3040ab0debaf36f5" PRIMARY KEY ("serviceId"))`);
        await queryRunner.query(`CREATE TABLE "bookings" ("bookingId" SERIAL NOT NULL, "phoneNo" character varying NOT NULL, "bookedAt" TIMESTAMP NOT NULL DEFAULT now(), "serviceServiceId" integer, "userUserId" integer, CONSTRAINT "PK_35a5c2c23622676b102ccc3b113" PRIMARY KEY ("bookingId"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('Admin', 'User')`);
        await queryRunner.query(`CREATE TABLE "users" ("userId" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'User', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_becdcf334c620387e277d1c5a1c" FOREIGN KEY ("serviceServiceId") REFERENCES "services"("serviceId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_d9f5b6f5c07efc947db7162a5e2" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_d9f5b6f5c07efc947db7162a5e2"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_becdcf334c620387e277d1c5a1c"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "bookings"`);
        await queryRunner.query(`DROP TABLE "services"`);
        await queryRunner.query(`DROP TYPE "public"."services_category_enum"`);
    }

}
