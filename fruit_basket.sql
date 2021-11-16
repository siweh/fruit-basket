create table fruit_basket(
    id serial not null primary key,
    fruit_type varchar not null,
    fruit_quantity int not null,
    unit_price decimal (10,3) not null
);