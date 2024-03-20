create table if not exists platform_enum
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

create table if not exists platform_enum_member
(
    id            varchar(36) not null primary key,

    enum_id       varchar(36) not null,
    label         varchar(20) not null,
    value         varchar     not null,
    display_order integer     not null default 0,
    is_default    boolean     not null default false,

    is_deleted    boolean     not null default false,
    created_at    timestamptz not null default now(),
    updated_at    timestamptz          default null,
    deleted_at    timestamptz          default null,
    version       integer     not null default 0
);

create unique index if not exists platform_enum_member_uk
    on platform_enum_member
        using btree (enum_id, label, value);

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
