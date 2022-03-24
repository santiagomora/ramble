<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210414031946 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE positions DROP FOREIGN KEY FK_D69FE57C7011923D');
        $this->addSql('DROP INDEX IDX_D69FE57C7011923D ON positions');
        $this->addSql('ALTER TABLE positions DROP po_company_id');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE positions ADD po_company_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE positions ADD CONSTRAINT FK_D69FE57C7011923D FOREIGN KEY (po_company_id) REFERENCES companies (co_id)');
        $this->addSql('CREATE INDEX IDX_D69FE57C7011923D ON positions (po_company_id)');
    }
}
