import { MigrationInterface, QueryRunner } from "typeorm"

export class default1686149601940 implements MigrationInterface {
    name = 'default1686149601940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "answers" ("id" SERIAL NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, "post_id" integer, CONSTRAINT "PK_9c32cec6c71e06da0254f2226c6" PRIMARY KEY ("id"))`)
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`)
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'user')`)
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', "location" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`)
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_f4cf663ebeca05b7a12f6a2cc97" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await queryRunner.query(`ALTER TABLE "answers" ADD CONSTRAINT "FK_47094431adba2af0ee0e3405177" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"`)
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_47094431adba2af0ee0e3405177"`)
        await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_f4cf663ebeca05b7a12f6a2cc97"`)
        await queryRunner.query(`DROP TABLE "users"`)
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`)
        await queryRunner.query(`DROP TABLE "posts"`)
        await queryRunner.query(`DROP TABLE "answers"`)
    }

}
