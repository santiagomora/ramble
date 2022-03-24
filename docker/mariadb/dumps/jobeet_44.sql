drop table if exists affiliates_categories;

drop table if exists jobs;

drop table if exists categories;

drop table if exists affiliates;

drop table if exists companies;

drop table if exists admin;

create table if not exists affiliates(
	af_id int auto_increment primary key,
	af_url varchar(100) not null unique,
	af_email varchar(100) not null unique,
	af_token varchar(150) not null unique,
	af_active boolean,
	af_created_at timestamp default now()
);

create table if not exists categories(
	ca_id int auto_increment primary key,
	name varchar(50) not null
);

create table if not exists affiliates_categories(
	ac_category_id int not null,
	ac_affiliate_id int not null,
	primary key ( ac_category_id,ac_affiliate_id ),
	foreign key ( ac_category_id ) references categories(ca_id) on delete cascade,
	foreign key ( ac_affiliate_id ) references affiliates(af_id) on delete cascade
);

create table if not exists jobs(
	jb_id int auto_increment primary key,
	jb_type varchar(50) not null,
	jb_company varchar(50) not null,
	jb_logo varchar(150) not null,
	jb_url varchar(255) not null,
	jb_position varchar(50) not null,
	jb_location varchar(150) not null,
	jb_description text not null,
	jb_instructions text not null,
	jb_token varchar(150) not null,
	jb_public boolean,
	jb_activated boolean, 
	jb_email varchar(150) not null unique,
	jb_expires_at timestamp default now(),
	jb_created_at timestamp default now(),
	jb_updated_at timestamp default now(),
	jb_category_id int not null,
	foreign key( jb_category_id ) references categories( ca_id ) on delete cascade	
);


create table if not exists companies(
	co_id int auto_increment primary key,
	co_logo varchar(150) not null,
	co_api_token varchar(255) unique not null,
	co_email varchar(150) not null unique,
	co_password varchar(255) not null
);

create table if not exists company_categories(
	cc_ca_id int not null,
	cc_co_id int not null,
	primary key( cc_ca_id,cc_co_id ),
	foreign key( cc_ca_id ) references categories(ca_id) on delete cascade,
	foreign key( cc_co_id ) references companies(co_id) on delete cascade
);

create table if not exists admin(
	am_id int auto_increment primary key,
	am_logo varchar(150) not null,
	am_api_token varchar(255) unique not null,
	am_email varchar(150) not null unique,
	am_password varchar(255) not null
);
