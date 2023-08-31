<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210418060659 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX ca_name ON categories');
        $this->addSql('CREATE UNIQUE INDEX ca_name ON categories (ca_admin_id, ca_name, ca_company_id)');
        $this->addSql('DROP INDEX jt_name ON job_types');
        $this->addSql('CREATE UNIQUE INDEX jt_name ON job_types (jt_name, jt_admin_id, jt_company_id)');
        $this->addSql('DROP INDEX po_name ON positions');
        $this->addSql('CREATE UNIQUE INDEX po_name ON positions (po_name, po_admin_id, po_company_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX ca_name ON categories');
        $this->addSql('CREATE UNIQUE INDEX ca_name ON categories (ca_admin_id, ca_name)');
        $this->addSql('DROP INDEX jt_name ON job_types');
        $this->addSql('CREATE UNIQUE INDEX jt_name ON job_types (jt_name, jt_admin_id)');
        $this->addSql('DROP INDEX po_name ON positions');
        $this->addSql('CREATE UNIQUE INDEX po_name ON positions (po_name, po_admin_id)');
    }
}
