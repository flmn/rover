import {
    IconAdjustments,
    IconCpu,
    IconHome,
    IconPlane,
    IconPlaneTilt,
    IconSettings,
    IconUsers,
    IconUsersGroup,
    IconVocabulary
} from "@tabler/icons-react";
import { MenuModel } from "@/types";

const defaultMenus: MenuModel[] = [
    {
        icon: <IconHome size="1.5rem" stroke={1.5}/>,
        label: '首页',
        path: '/',
    },
    {
        icon: <IconPlaneTilt size="1.5rem" stroke={1.5}/>,
        label: '机队管理',
        path: '/fleet',
        children: [
            {
                icon: <IconPlane size="1.5rem" stroke={1.5}/>,
                label: '飞机管理',
                path: '/fleet/aircrafts',
            },
        ]
    },
    {
        icon: <IconSettings size="1.5rem" stroke={1.5}/>,
        label: '系统设置',
        path: '/settings',
        children: [
            {
                icon: <IconUsers size="1.5rem" stroke={1.5}/>,
                label: '用户管理',
                path: '/settings/users',
            },
            {
                icon: <IconUsersGroup size="1.5rem" stroke={1.5}/>,
                label: '角色管理',
                path: '/settings/roles',
            },
            {
                icon: <IconVocabulary size="1.5rem" stroke={1.5}/>,
                label: '数据字典管理',
                path: '/settings/enums',
            },
            {
                icon: <IconAdjustments size="1.5rem" stroke={1.5}/>,
                label: '系统参数',
                path: '/settings/configs',
            },
            {
                icon: <IconCpu size="1.5rem" stroke={1.5}/>,
                label: '系统信息',
                path: '/settings/server-info',
            },
        ]
    },
];

const menus: MenuModel[] = defaultMenus.filter(() => {
    return true;
});

const menuNames = menus.reduce((result: Record<string, string>, item: MenuModel) => {
    result[item.path] = item.label;

    if (item.children) {
        item.children.forEach((sub) => result[sub.path] = sub.label);
    }

    return result;
}, {});

function getMenuName(path: string) {
    return menuNames[path];
}

export { menus, getMenuName }
