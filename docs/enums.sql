insert into platform_enum (id, name, created_by)
values ('Aircraft.AcType', '机型', 'system');

insert into platform_enum_member (enum_id, label, value, display_order)
values ('Aircraft.AcType', 'A-319', 'A-319', 0),
       ('Aircraft.AcType', 'A-320', 'A-320', 1),
       ('Aircraft.AcType', 'C-919', 'C-919', 2);

insert into platform_enum (id, name, created_by)
values ('Aircraft.Manufacturer', '制造商', 'system');

insert into platform_enum_member (enum_id, label, value, display_order)
values ('Aircraft.Manufacturer', '空客', 'Airbus', 0),
       ('Aircraft.Manufacturer', '波音', 'Boeing', 1),
       ('Aircraft.Manufacturer', '商飞', 'Comac', 2);
