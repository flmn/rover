create table if not exists ef_enum
(
    id          varchar(36)  not null primary key,

    name        varchar(20)  not null,
    description varchar(500) not null default '',

    created_at  timestamptz  not null default now(),
    updated_at  timestamptz           default null,
    version     integer      not null default 0
);

create unique index if not exists ef_enum_name_uk
    on ef_enum using btree (name);

create table if not exists ef_enum_member
(
    id            varchar(36) not null primary key,

    enum_id       varchar(36) not null,
    label         varchar(20) not null,
    value         varchar     not null,
    display_order integer     not null default 0,
    is_default    boolean     not null default false,

    created_at    timestamptz not null default now(),
    updated_at    timestamptz          default null,
    is_deleted    boolean     not null default false,
    deleted_at    timestamptz          default null,
    version       integer     not null default 0
);

create unique index if not exists ef_enum_member_label_uk
    on ef_enum_member using btree (enum_id, label);

create unique index if not exists ef_enum_member_value_uk
    on ef_enum_member using btree (enum_id, value);
