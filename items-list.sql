create database learndb;

use learndb;

create table tb_users
(
id int primary key auto_increment,
name varchar(50) not null,
email varchar(50) not null,
password varchar(50) not null
);



create table tb_items
(
id int primary key auto_increment,
label varchar(50),
qte int,
items int,
constraint fk_items foreign key(items) references tb_users(id)
);
