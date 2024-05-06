insert into platform_privilege (id, name, level, display_order)
values ('fleet', '机队管理', 1, 1);

insert into platform_privilege (id, name, level, parent, display_order)
values ('fleet.aircrafts', '飞机管理', 2, 'fleet', 1),
       ('fleet.aircrafts.read', '查看', 3, 'fleet.aircrafts', 1),
       ('fleet.aircrafts.create', '添加', 3, 'fleet.aircrafts', 2),
       ('fleet.aircrafts.update', '修改', 3, 'fleet.aircrafts', 3),
       ('fleet.aircrafts.delete', '删除', 3, 'fleet.aircrafts', 4),
       ('fleet.aircrafts.import', '导入', 3, 'fleet.aircrafts', 5),
       ('fleet.aircrafts.export', '导出', 3, 'fleet.aircrafts', 6);

insert into platform_privilege (id, name, level, display_order)
values ('data', '数据', 1, 2);

insert into platform_privilege (id, name, level, parent, display_order)
values ('data.airports', '机场数据库', 2, 'data', 1),
       ('data.airports.read', '查看', 3, 'data.airports', 1),
       ('data.airports.create', '添加', 3, 'data.airports', 2),
       ('data.airports.update', '修改', 3, 'data.airports', 3),
       ('data.airports.delete', '删除', 3, 'data.airports', 4),
       ('data.airports.import', '导入', 3, 'data.airports', 5),
       ('data.airports.export', '导出', 3, 'data.airports', 6);

insert into platform_privilege (id, name, level, display_order)
values ('settings', '系统设置', 1, 3);

insert into platform_privilege (id, name, level, parent, display_order)
values ('settings.users', '用户管理', 2, 'settings', 1),
       ('settings.users.read', '查看', 3, 'settings.users', 1),
       ('settings.users.create', '添加', 3, 'settings.users', 2),
       ('settings.users.update', '修改', 3, 'settings.users', 3),
       ('settings.users.delete', '删除', 3, 'settings.users', 4),
       ('settings.users.import', '导入', 3, 'settings.users', 5),
       ('settings.users.export', '导出', 3, 'settings.users', 6);

insert into platform_privilege (id, name, level, parent, display_order)
values ('settings.roles', '角色管理', 2, 'settings', 2),
       ('settings.roles.read', '查看', 3, 'settings.roles', 1),
       ('settings.roles.create', '添加', 3, 'settings.roles', 2),
       ('settings.roles.update', '修改', 3, 'settings.roles', 3),
       ('settings.roles.delete', '删除', 3, 'settings.roles', 4);

insert into platform_privilege (id, name, level, parent, display_order)
values ('settings.enums', '数据字典管理', 2, 'settings', 3),
       ('settings.enums.read', '查看', 3, 'settings.enums', 1),
       ('settings.enums.create', '添加', 3, 'settings.enums', 2),
       ('settings.enums.update', '修改', 3, 'settings.enums', 3),
       ('settings.enums.delete', '删除', 3, 'settings.enums', 4),
       ('settings.enums.import', '导入', 3, 'settings.enums', 5),
       ('settings.enums.export', '导出', 3, 'settings.enums', 6);

insert into platform_privilege (id, name, level, parent, display_order)
values ('settings.configs', '系统参数', 2, 'settings', 4),
       ('settings.configs.read', '查看', 3, 'settings.configs', 1),
       ('settings.configs.update', '修改', 3, 'settings.configs', 2),
       ('settings.configs.import', '导入', 3, 'settings.configs', 3),
       ('settings.configs.export', '导出', 3, 'settings.configs', 4);

insert into platform_privilege (id, name, level, parent, display_order)
values ('settings.server-info', '系统信息', 2, 'settings', 5);
