insert into platform_privilege (id, name, level)
values ('settings', '系统设置', 1);

insert into platform_privilege (id, name, level, parent)
values ('settings.users', '用户管理', 2, 'settings'),
       ('settings.users.read', '查看', 3, 'settings.users'),
       ('settings.users.create', '添加', 3, 'settings.users'),
       ('settings.users.update', '修改', 3, 'settings.users'),
       ('settings.users.delete', '删除', 3, 'settings.users'),
       ('settings.users.import', '导入', 3, 'settings.users'),
       ('settings.users.export', '导出', 3, 'settings.users');

insert into platform_privilege (id, name, level, parent)
values ('settings.roles', '角色管理', 2, 'settings'),
       ('settings.roles.read', '查看', 3, 'settings.roles'),
       ('settings.roles.create', '添加', 3, 'settings.roles'),
       ('settings.roles.update', '修改', 3, 'settings.roles'),
       ('settings.roles.delete', '删除', 3, 'settings.roles');

insert into platform_privilege (id, name, level, parent)
values ('settings.enums', '数据字典管理', 2, 'settings'),
       ('settings.enums.read', '查看', 3, 'settings.enums'),
       ('settings.enums.create', '添加', 3, 'settings.enums'),
       ('settings.enums.update', '修改', 3, 'settings.enums'),
       ('settings.enums.delete', '删除', 3, 'settings.enums'),
       ('settings.enums.import', '导入', 3, 'settings.enums'),
       ('settings.enums.export', '导出', 3, 'settings.enums');

insert into platform_privilege (id, name, level, parent)
values ('settings.configs', '系统参数', 2, 'settings'),
       ('settings.configs.read', '查看', 3, 'settings.configs'),
       ('settings.configs.update', '修改', 3, 'settings.configs'),
       ('settings.configs.import', '导入', 3, 'settings.configs'),
       ('settings.configs.export', '导出', 3, 'settings.configs');

insert into platform_privilege (id, name, level, parent)
values ('settings.server-info', '系统信息', 2, 'settings');
