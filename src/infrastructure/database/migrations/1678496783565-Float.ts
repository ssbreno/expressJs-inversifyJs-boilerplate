import { MigrationInterface, QueryRunner } from 'typeorm';

export class Float1678496783565 implements MigrationInterface {
  name = 'Float1678496783565';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "value"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "value" double precision NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "value"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "value" integer NOT NULL`,
    );
  }
}
