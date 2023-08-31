<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210413035407 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE admin (am_id INT AUTO_INCREMENT NOT NULL, am_logo VARCHAR(150) NOT NULL, am_name VARCHAR(150) NOT NULL, am_api_token VARCHAR(255) NOT NULL, am_email VARCHAR(150) NOT NULL, am_password VARCHAR(255) NOT NULL, am_created_at DATETIME DEFAULT CURRENT_TIMESTAMP, am_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX am_api_token (am_api_token), UNIQUE INDEX am_email (am_email), PRIMARY KEY(am_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE affiliates (af_id INT AUTO_INCREMENT NOT NULL, af_admin_id INT DEFAULT NULL, af_url VARCHAR(100) NOT NULL, af_email VARCHAR(100) NOT NULL, af_name VARCHAR(100) NOT NULL, af_token VARCHAR(150) NOT NULL, af_created_at DATETIME DEFAULT CURRENT_TIMESTAMP, af_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, af_active TINYINT(1) DEFAULT NULL, INDEX af_admin_id (af_admin_id), UNIQUE INDEX af_name (af_name), UNIQUE INDEX af_token (af_token), UNIQUE INDEX af_url (af_url), UNIQUE INDEX af_email (af_email), PRIMARY KEY(af_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE categories (ca_id INT AUTO_INCREMENT NOT NULL, ca_admin_id INT DEFAULT NULL, ca_name VARCHAR(50) NOT NULL, INDEX ca_admin_id (ca_admin_id), UNIQUE INDEX ca_name (ca_admin_id, ca_name), PRIMARY KEY(ca_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE affiliates_categories (ac_category_id INT NOT NULL, ac_affiliate_id INT NOT NULL, INDEX IDX_87BE2180447E487B (ac_category_id), INDEX IDX_87BE21801697D7AF (ac_affiliate_id), PRIMARY KEY(ac_category_id, ac_affiliate_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE companies (co_id INT AUTO_INCREMENT NOT NULL, co_admin_id INT DEFAULT NULL, co_logo VARCHAR(150) NOT NULL, co_name VARCHAR(150) NOT NULL, co_api_token VARCHAR(255) NOT NULL, co_email VARCHAR(150) NOT NULL, co_password VARCHAR(255) NOT NULL, co_created_at DATETIME DEFAULT CURRENT_TIMESTAMP, co_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, INDEX co_admin_id (co_admin_id), UNIQUE INDEX co_api_token (co_api_token), UNIQUE INDEX co_email (co_email), PRIMARY KEY(co_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE job_types (jt_id INT AUTO_INCREMENT NOT NULL, jt_admin_id INT DEFAULT NULL, jt_name VARCHAR(40) NOT NULL, INDEX jt_admin_id (jt_admin_id), UNIQUE INDEX jt_name (jt_name, jt_admin_id), PRIMARY KEY(jt_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE jobs (jb_id INT AUTO_INCREMENT NOT NULL, jb_category_id INT DEFAULT NULL, jb_type_id INT DEFAULT NULL, jb_company_id INT DEFAULT NULL, jb_admin_id INT DEFAULT NULL, jb_position_id INT DEFAULT NULL, jb_company_name VARCHAR(50) NOT NULL, jb_logo VARCHAR(150) NOT NULL, jb_url VARCHAR(255) NOT NULL, jb_title VARCHAR(100) NOT NULL, jb_location VARCHAR(150) NOT NULL, jb_description TEXT NOT NULL, jb_instructions TEXT NOT NULL, jb_token VARCHAR(150) NOT NULL, jb_public TINYINT(1) NOT NULL, jb_activated TINYINT(1) NOT NULL, jb_email VARCHAR(150) NOT NULL, jb_expires_at DATETIME NOT NULL, jb_created_at DATETIME DEFAULT NULL, jb_updated_at DATETIME DEFAULT NULL, INDEX jb_position_id (jb_position_id), INDEX jb_type_id (jb_type_id), INDEX jb_company_id (jb_company_id), INDEX jb_admin_id (jb_admin_id), INDEX jb_category_id (jb_category_id), PRIMARY KEY(jb_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE positions (po_id INT AUTO_INCREMENT NOT NULL, po_company_id INT DEFAULT NULL, po_admin_id INT DEFAULT NULL, po_name VARCHAR(50) NOT NULL, po_description VARCHAR(100) DEFAULT NULL, INDEX IDX_D69FE57C7011923D (po_company_id), INDEX po_admin_id (po_admin_id), UNIQUE INDEX po_name (po_name, po_admin_id), PRIMARY KEY(po_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE affiliates ADD CONSTRAINT FK_108C6A8F8AC65FFD FOREIGN KEY (af_admin_id) REFERENCES admin (am_id)');
        $this->addSql('ALTER TABLE categories ADD CONSTRAINT FK_3AF346683076FD45 FOREIGN KEY (ca_admin_id) REFERENCES admin (am_id)');
        $this->addSql('ALTER TABLE affiliates_categories ADD CONSTRAINT FK_87BE2180447E487B FOREIGN KEY (ac_category_id) REFERENCES categories (ca_id)');
        $this->addSql('ALTER TABLE affiliates_categories ADD CONSTRAINT FK_87BE21801697D7AF FOREIGN KEY (ac_affiliate_id) REFERENCES affiliates (af_id)');
        $this->addSql('ALTER TABLE companies ADD CONSTRAINT FK_8244AA3A2EBFCDF6 FOREIGN KEY (co_admin_id) REFERENCES admin (am_id)');
        $this->addSql('ALTER TABLE job_types ADD CONSTRAINT FK_586C34408ABC896C FOREIGN KEY (jt_admin_id) REFERENCES admin (am_id)');
        $this->addSql('ALTER TABLE jobs ADD CONSTRAINT FK_A8936DC5D6D0AA13 FOREIGN KEY (jb_category_id) REFERENCES categories (ca_id)');
        $this->addSql('ALTER TABLE jobs ADD CONSTRAINT FK_A8936DC583FCE76A FOREIGN KEY (jb_type_id) REFERENCES job_types (jt_id)');
        $this->addSql('ALTER TABLE jobs ADD CONSTRAINT FK_A8936DC560E6532F FOREIGN KEY (jb_company_id) REFERENCES companies (co_id)');
        $this->addSql('ALTER TABLE jobs ADD CONSTRAINT FK_A8936DC5A00C78C3 FOREIGN KEY (jb_admin_id) REFERENCES admin (am_id)');
        $this->addSql('ALTER TABLE jobs ADD CONSTRAINT FK_A8936DC5191219B7 FOREIGN KEY (jb_position_id) REFERENCES positions (po_id)');
        $this->addSql('ALTER TABLE positions ADD CONSTRAINT FK_D69FE57C7011923D FOREIGN KEY (po_company_id) REFERENCES companies (co_id)');
        $this->addSql('ALTER TABLE positions ADD CONSTRAINT FK_D69FE57C19AB6F3C FOREIGN KEY (po_admin_id) REFERENCES admin (am_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE affiliates DROP FOREIGN KEY FK_108C6A8F8AC65FFD');
        $this->addSql('ALTER TABLE categories DROP FOREIGN KEY FK_3AF346683076FD45');
        $this->addSql('ALTER TABLE companies DROP FOREIGN KEY FK_8244AA3A2EBFCDF6');
        $this->addSql('ALTER TABLE job_types DROP FOREIGN KEY FK_586C34408ABC896C');
        $this->addSql('ALTER TABLE jobs DROP FOREIGN KEY FK_A8936DC5A00C78C3');
        $this->addSql('ALTER TABLE positions DROP FOREIGN KEY FK_D69FE57C19AB6F3C');
        $this->addSql('ALTER TABLE affiliates_categories DROP FOREIGN KEY FK_87BE21801697D7AF');
        $this->addSql('ALTER TABLE affiliates_categories DROP FOREIGN KEY FK_87BE2180447E487B');
        $this->addSql('ALTER TABLE jobs DROP FOREIGN KEY FK_A8936DC5D6D0AA13');
        $this->addSql('ALTER TABLE jobs DROP FOREIGN KEY FK_A8936DC560E6532F');
        $this->addSql('ALTER TABLE positions DROP FOREIGN KEY FK_D69FE57C7011923D');
        $this->addSql('ALTER TABLE jobs DROP FOREIGN KEY FK_A8936DC583FCE76A');
        $this->addSql('ALTER TABLE jobs DROP FOREIGN KEY FK_A8936DC5191219B7');
        $this->addSql('DROP TABLE admin');
        $this->addSql('DROP TABLE affiliates');
        $this->addSql('DROP TABLE categories');
        $this->addSql('DROP TABLE affiliates_categories');
        $this->addSql('DROP TABLE companies');
        $this->addSql('DROP TABLE job_types');
        $this->addSql('DROP TABLE jobs');
        $this->addSql('DROP TABLE positions');
    }
}
