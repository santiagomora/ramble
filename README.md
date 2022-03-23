configuration 

- clone git clone -b php_pic_api git@github.com:santiagomora/ramble.git

- add execution permissions to ./api/.setupenv.sh, ./.setupenv.sh and ./setup.sh and entrypoint script ./start.sh.

- execute ./setup.sh env to generate env files and ./setup.sh to delete them.

- ./api/.setupenv.sh uses openssl to generate application key. if not installed you can generate your random 24 char long application key.

- use docker-compose up -d to initialize containers.

- go into mysql container and create the app mysql user considering the .env credentials:
```
	docker exec -it pic_api_mariadb mysql -u root -p (password: root)
	CREATE USER 'pic_api_USR'@'%' IDENTIFIED BY 'pic_api_PWD';
	GRANT ALL PRIVILEGES ON `pic_api_DB`.* TO 'pic_api_USR'@'%'
```
- go into the php lumen container and seed the databases. Each seeding gets new data from an external api.
```
	docker exec -it pic_api_php sh 
	php artisan migrate
	php artisan db:seed
```
- test with endpoints 
```
	POST localhost:8080/cuadro/
	PUT localhost:8080/cuadro/{id}
	DELETE localhost:8080/cuadro/{id}
	GET localhost:8080/cuadro?filterBy=id_dueno:<val>,id_museo:<val>,id_corriente:<val>,titulo:<val>,fecha:<val>,descripcion:<val>,id:<val>&columns=id_dueno,id_museo,id_corriente,titulo,fecha,descripcion,id (cualquier combinacion)
	GET localhost:8080/cuadro/{id}
```
