insert into platform_privilege (id, name, level, display_order)
values ('settings', '系统设置', 1, 1);

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
