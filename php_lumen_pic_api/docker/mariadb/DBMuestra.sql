use EDCH_mariadb_DB;

create table if not exists pais(
	id int unsigned primary key auto_increment,
	nombre varchar(50) not null unique
);

create table if not exists corriente(
	id int unsigned primary key auto_increment,
	nombre varchar(50) not null,
	descripcion varchar(255) not null	
	constraint UN_NombreDescripcion unique (nombre,descripcion)

create table if not exists dueno(
	id int unsigned primary key auto_increment,
	nombre varchar(50) not null,
	token varchar(100) not null,
	constraint UN_token unique (token)
);

create table if not exists autor(
	id int unsigned primary key auto_increment, 
	nombre varchar(50) not null,
	id_pais_nacimiento int unsigned not null,
	ano_nacimiento varchar(10) not null,
	ano_defuncion varchar(10) not null,
	constraint FK_AutorPais foreign key (id_pais_nacimiento) references pais(id)
);

create table if not exists museo(
	id int unsigned primary key auto_increment,
	nombre varchar(50) not null,
	constraint UN_NombrePais unique (nombre)
);

create table if not exists cuadro(
	id int unsigned primary key auto_increment, 
	titulo varchar(255) not null,
	fecha varchar(20) not null,
	descripcion varchar(255) not null,
	id_dueno int unsigned not null,
	id_autor int unsigned not null,
	id_corriente int unsigned not null,
	id_museo int unsigned,
	constraint FK_CuadroMuseo foreign key (id_museo) references museo(id),
	constraint FK_CuadroAutor foreign key (id_autor) references autor(id),
	constraint FK_CuadroCorriente foreign key (id_corriente) references corriente(id),
	constraint FK_CuadroDueno foreign key (id_dueno) references dueno(id),
	constraint UN_AutorTitulo unique (titulo,id_autor)
);
