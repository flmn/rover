insert into platform_config (id, name, type, value, public_access, created_by)
values ('cnf-system-title', '系统名称', 'TEXT', '那啥管理系统', true, 'system');

insert into platform_config (id, name, type, value, description, created_by)
values ('cnf-server-alarm-disk', '磁盘报警阈值', 'PERCENT', '80', '磁盘报警阈值百分比', 'system'),
       ('cnf-server-alarm-memory', '内存报警阈值', 'PERCENT', '80', '内存报警阈值百分比', 'system');
