create table if not exists platform_file
(
    id          varchar(36)  not null primary key,

    name varchar(50) not null,
    description varchar(500) not null default '',

    is_deleted  boolean      not null default false,
    created_at  timestamptz  not null default now(),
    updated_at  timestamptz           default null,
    deleted_at  timestamptz           default null,
    version     integer      not null default 0
);

create table if not exists fleet_airline
(
    id         varchar(36) not null primary key,

    code       varchar(4)  not null,
    name       varchar(20) not null,

    is_deleted boolean     not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz          default null,
    deleted_at timestamptz          default null,
    version    integer     not null default 0
);

create table if not exists ent_fleet_airline
(
    id         varchar(36) not null primary key,

    code       varchar(4)  not null,
    name       varchar(20) not null,

    is_deleted boolean     not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz          default null,
    deleted_at timestamptz          default null,
    version    integer     not null default 0
);

create table if not exists fleet_fleet
(
    id          varchar(36)  not null primary key,

    name        varchar(20)  not null,
    description varchar(500) not null default '',

    is_deleted  boolean      not null default false,
    created_at  timestamptz  not null default now(),
    updated_at  timestamptz           default null,
    deleted_at  timestamptz           default null,
    version     integer      not null default 0
);

create table if not exists fleet_aircraft
(
    id         varchar(36) not null primary key,

    reg_num    varchar(8)  not null,

    is_deleted boolean     not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz          default null,
    deleted_at timestamptz          default null,
    version    integer     not null default 0
);
