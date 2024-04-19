insert into platform_privilege (id, name)
values ('settings', '系统设置');

insert into platform_privilege (id, name, parent)
values ('settings.users', '用户管理', 'settings'),
       ('settings.users.read', '查看', 'settings.users'),
       ('settings.users.create', '添加', 'settings.users'),
       ('settings.users.update', '修改', 'settings.users'),
       ('settings.users.delete', '删除', 'settings.users'),
       ('settings.users.import', '导入', 'settings.users'),
       ('settings.users.export', '导出', 'settings.users');

insert into platform_privilege (id, name, parent)
values ('settings.roles', '角色管理', 'settings'),
       ('settings.roles.read', '查看', 'settings.roles'),
       ('settings.roles.create', '添加', 'settings.roles'),
       ('settings.roles.update', '修改', 'settings.roles'),
       ('settings.roles.delete', '删除', 'settings.roles');

insert into platform_privilege (id, name, parent)
values ('settings.enums', '数据字典管理', 'settings'),
       ('settings.enums.read', '查看', 'settings.enums'),
       ('settings.enums.create', '添加', 'settings.enums'),
       ('settings.enums.update', '修改', 'settings.enums'),
       ('settings.enums.delete', '删除', 'settings.enums'),
       ('settings.enums.import', '导入', 'settings.enums'),
       ('settings.enums.export', '导出', 'settings.enums');

insert into platform_privilege (id, name, parent)
values ('settings.configs', '系统参数', 'settings'),
       ('settings.configs.read', '查看', 'settings.configs'),
       ('settings.configs.update', '修改', 'settings.configs'),
       ('settings.configs.import', '导入', 'settings.configs'),
       ('settings.configs.export', '导出', 'settings.configs');

insert into platform_privilege (id, name, parent)
values ('settings.server-info', '系统信息', 'settings');
