insert into ef_enum (id, name)
values ('Aircraft.AcType', '机型');

insert into ef_enum_member (id, enum_id, label, value, display_order)
values ('00t6nzqhr0hvn', 'Aircraft.AcType', 'A-319', 'A-319', 1),
       ('00t6p18v1f4m0', 'Aircraft.AcType', 'A-320', 'A-320', 2);
