insert into platform_config (id, name, type, value, public_access, created_by)
values ('cfg-system-title', '系统名称', 'TEXT', '那啥管理系统', true, 'system');

insert into platform_config (id, name, type, value, description, created_by)
values ('cfg-server-alarm-disk', '磁盘报警阈值', 'PERCENT', '80', '磁盘报警阈值百分比', 'system'),
       ('cfg-server-alarm-memory', '内存报警阈值', 'PERCENT', '80', '内存报警阈值百分比', 'system');

insert into platform_config (id, name, type, value, readonly, created_by)
values ('cfg-test-readonly', 'readonly 测试', 'TEXT', 'readonly', true, 'system'),
       ('cfg-test-boolean', '布尔测试', 'BOOLEAN', 'true', false, 'system'),
       ('cfg-test-color', '颜色测试', 'COLOR', 'ff0000', false, 'system'),
       ('cfg-test-date', '日期测试', 'DATE', '2024-06-01', false, 'system'),
       ('cfg-test-enum', '枚举测试', 'ENUM', '', false, 'system'),
       ('cfg-test-integer', '数字测试', 'INTEGER', '15', false, 'system'),
       ('cfg-test-json', 'JSON 测试', 'JSON', '{}', false, 'system'),
       ('cfg-test-percent', '百分比测试', 'PERCENT', '50', false, 'system'),
       ('cfg-test-text', '文字测试', 'TEXT', 'TEXT', false, 'system'),
       ('cfg-test-time', '时间测试', 'TIME', '12:34', false, 'system'),
       ('cfg-test-url', 'URL 测试', 'URL', 'https://www.baidu.com', false, 'system');
