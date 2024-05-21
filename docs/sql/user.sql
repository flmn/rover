insert into platform_role (id, name, data_permission, created_by)
values ('rol-system-admin', '系统管理员', 'ALL', 'system');

insert into platform_user (id, email, password, name, created_by)
values ('usr-00vchk38dg640', 'admin@admin.com', '$2a$10$9JH0KnjwB1KNXQhKv7OdbuNcMeoxLRgvfQY.RhZrmhXQPCAa/9i/.',
        '管理员', 'system');

insert into platform_user_role(user_id, role_id)
values ('usr-00vchk38dg640', 'rol-system-admin');

insert into platform_session (id, user_id, access_token, expires_at, data, created_by)
values ('ssn-0108pz0c7sww2', 'usr-00vchk38dg640', 'aed1edb934a44923be6635dcbb9e4381', '2025-05-29 19:17:18',
        '{"locked":false,"email":"admin@admin.com","name":"管理员","enabled":true,"authorities":[]}', 'system');

