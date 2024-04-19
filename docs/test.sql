insert into platform_config (id, name, value, description, created_by)
values ('cnf-server-alarm-disk', '磁盘报警阈值', '80', '磁盘报警阈值百分比', 'system');

insert into platform_config (id, name, value, description, created_by)
values ('cnf-server-alarm-memory', '内存报警阈值', '80', '内存报警阈值百分比', 'system');

insert into platform_role (id, name, data_permission, created_by)
values ('rol-system-admin', '系统管理员', 'ALL', 'system');

insert into platform_user (id, email, password, name, created_by)
values ('usr-00vchk38dg640', 'admin@admin.com', '$2a$10$9JH0KnjwB1KNXQhKv7OdbuNcMeoxLRgvfQY.RhZrmhXQPCAa/9i/.',
        '管理员', 'system');

insert into platform_token (id, user_id, type, token, expires_at, created_by)
values ('tkn-00w3n62q8a8am', 'usr-00vchk38dg640', 'ACCESS_TOKEN', 'aed1edb934a44923be6635dcbb9e4381',
        '2025-05-29 19:17:18', 'system');

insert into platform_session (id, user_id, access_token, expires_at, data, created_by)
values ('ssn-0108pz0c7sww2', 'usr-00vchk38dg640', 'aed1edb934a44923be6635dcbb9e4381', '2025-05-29 19:17:18',
        '{"locked":false,"email":"admin@admin.com","name":"管理员","enabled":true,"authorities":[]}', 'system');

insert into platform_enum (id, name, created_by)
values ('Aircraft.AcType', '机型', 'system');

insert into platform_enum_member (enum_id, label, value, display_order)
values ('Aircraft.AcType', 'A-319', 'A-319', 0),
       ('Aircraft.AcType', 'A-320', 'A-320', 1),
       ('Aircraft.AcType', 'C-919', 'C-919', 2);

insert into platform_enum (id, name, created_by)
values ('Aircraft.Manufacturer', '制造商', 'system');

insert into platform_enum_member (enum_id, label, value, display_order)
values ('Aircraft.Manufacturer', '空客', 'Airbus', 0),
       ('Aircraft.Manufacturer', '波音', 'Boeing', 1),
       ('Aircraft.Manufacturer', '商飞', 'Comac', 2);
