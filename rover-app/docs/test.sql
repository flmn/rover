insert into platform_user (id, email, password)
values ('00vchk38dg640', 'admin@admin.com', '$2a$10$9JH0KnjwB1KNXQhKv7OdbuNcMeoxLRgvfQY.RhZrmhXQPCAa/9i/.');

insert into ef_enum (id, name)
values ('Aircraft.AcType', '机型');

insert into ef_enum_member (id, enum_id, label, value, display_order)
values ('00t6nzqhr0hvn', 'Aircraft.AcType', 'A-319', 'A-319', 1),
       ('00t6p18v1f4m0', 'Aircraft.AcType', 'A-320', 'A-320', 2),
       ('00tjqb3wmxtw6', 'Aircraft.AcType', 'C-919', 'C-919', 3);

insert into ef_enum (id, name)
values ('Aircraft.Manufacturer', '制造商');

insert into ef_enum_member (id, enum_id, label, value, display_order)
values ('00tjqfr6drv9k', 'Aircraft.Manufacturer', '空客', 'Airbus', 1),
       ('00tjqgnabtbzw', 'Aircraft.Manufacturer', '波音', 'Boeing', 2),
       ('00tjqhh3mjdva', 'Aircraft.Manufacturer', '商飞', 'Comac', 3);
