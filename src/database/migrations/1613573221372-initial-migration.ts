import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1613573221372 implements MigrationInterface {
    name = 'initialMigration1613573221372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "resource_model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "url" character varying(500) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "activityId" uuid, CONSTRAINT "PK_0eaee66a77f1d9ad17f88c74940" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "activity_model" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(500) NOT NULL, "desc" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3b803b36ba732f8ae386bc4b30c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "resource_model" ADD CONSTRAINT "FK_0da08465d5ad819ed7233195491" FOREIGN KEY ("activityId") REFERENCES "activity_model"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resource_model" DROP CONSTRAINT "FK_0da08465d5ad819ed7233195491"`);
        await queryRunner.query(`DROP TABLE "activity_model"`);
        await queryRunner.query(`DROP TABLE "resource_model"`);
    }

}
