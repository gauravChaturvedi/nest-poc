import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1613572069451 implements MigrationInterface {
    name = 'initialMigration1613572069451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "resource_model_paymentstatus_enum" AS ENUM('PAID', 'NOT_PAID')`);
        await queryRunner.query(`CREATE TYPE "resource_model_currency_enum" AS ENUM('NGN', 'USD', 'GBP', ' EUR')`);
        await queryRunner.query(`CREATE TABLE "resource_model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "resourceNo" character varying(500) NOT NULL, "description" text NOT NULL, "paymentStatus" "resource_model_paymentstatus_enum" NOT NULL DEFAULT 'NOT_PAID', "currency" "resource_model_currency_enum" NOT NULL DEFAULT 'USD', "taxRate" integer NOT NULL, "issueDate" character varying NOT NULL, "dueDate" character varying NOT NULL, "note" text NOT NULL, "items" jsonb NOT NULL DEFAULT '[]', "taxAmount" integer NOT NULL, "subTotal" integer NOT NULL, "total" character varying NOT NULL, "amountPaid" integer NOT NULL DEFAULT '0', "outstandingBalance" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "activityId" uuid, CONSTRAINT "PK_0eaee66a77f1d9ad17f88c74940" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "activity_model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(500) NOT NULL, "email" text NOT NULL, "phone" character varying(15) NOT NULL, "address" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3b803b36ba732f8ae386bc4b30c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "resource_model" ADD CONSTRAINT "FK_0da08465d5ad819ed7233195491" FOREIGN KEY ("activityId") REFERENCES "activity_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resource_model" DROP CONSTRAINT "FK_0da08465d5ad819ed7233195491"`);
        await queryRunner.query(`DROP TABLE "activity_model"`);
        await queryRunner.query(`DROP TABLE "resource_model"`);
        await queryRunner.query(`DROP TYPE "resource_model_currency_enum"`);
        await queryRunner.query(`DROP TYPE "resource_model_paymentstatus_enum"`);
    }

}
