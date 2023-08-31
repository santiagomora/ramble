<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210416023541 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX af_email ON affiliates');
        $this->addSql('DROP INDEX af_name ON affiliates');
        $this->addSql('DROP INDEX af_token ON affiliates');
        $this->addSql('DROP INDEX af_url ON affiliates');
        $this->addSql('ALTER TABLE affiliates CHANGE af_created_at af_created_at DATETIME DEFAULT NULL, CHANGE af_updated_at af_updated_at DATETIME DEFAULT NULL');
        $this->addSql('CREATE UNIQUE INDEX unique_affiliate ON affiliates (af_name, af_url, af_email)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX unique_affiliate ON affiliates');
        $this->addSql('ALTER TABLE affiliates CHANGE af_created_at af_created_at DATETIME DEFAULT CURRENT_TIMESTAMP, CHANGE af_updated_at af_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP');
        $this->addSql('CREATE UNIQUE INDEX af_email ON affiliates (af_email)');
        $this->addSql('CREATE UNIQUE INDEX af_name ON affiliates (af_name)');
        $this->addSql('CREATE UNIQUE INDEX af_token ON affiliates (af_token)');
        $this->addSql('CREATE UNIQUE INDEX af_url ON affiliates (af_url)');
    }
}
