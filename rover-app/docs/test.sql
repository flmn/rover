insert into platform_role (id, name)
values ('rol-system-admin', '系统管理员');

insert into platform_user (id, email, password, name)
values ('usr-00vchk38dg640', 'admin@admin.com', '$2a$10$9JH0KnjwB1KNXQhKv7OdbuNcMeoxLRgvfQY.RhZrmhXQPCAa/9i/.',
        '管理员');

insert into platform_token (id, user_id, type, token, expires_at)
values ('tkn-00w3n62q8a8am', 'usr-00vchk38dg640', 'ACCESS_TOKEN', 'aed1edb934a44923be6635dcbb9e4381',
        '2025-03-29 19:17:18');

insert into ef_enum (id, name)
values ('Aircraft.AcType', '机型');

insert into ef_enum_member (enum_id, label, value, display_order)
values ('Aircraft.AcType', 'A-319', 'A-319', 1),
       ('Aircraft.AcType', 'A-320', 'A-320', 2),
       ('Aircraft.AcType', 'C-919', 'C-919', 3);

insert into ef_enum (id, name)
values ('Aircraft.Manufacturer', '制造商');

insert into ef_enum_member (enum_id, label, value, display_order)
values ('Aircraft.Manufacturer', '空客', 'Airbus', 1),
       ('Aircraft.Manufacturer', '波音', 'Boeing', 2),
       ('Aircraft.Manufacturer', '商飞', 'Comac', 3);
