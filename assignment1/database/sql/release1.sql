--liquibase formatted sql

--changeset prateek:release1-changeset1 
create extension if not exists "uuid-ossp";

--changeset prateek:release1-changeset2
create table product
(
    productid uuid not null primary key,
    productname varchar(1000) not null,
    description varchar(4000) null,
    cost varchar(100) null,
    viewcount int null,
    createddate timestamp with time zone not null,
    updateddate timestamp with time zone null,
    isactive boolean not null default(true)
);