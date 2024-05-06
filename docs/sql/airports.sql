insert into data_airport(id, iata_code, name, latitude, longitude, country, created_by)
values ('ZBAA', 'PEK', '北京首都国际机场', 40.08010101318359, 116.58499908447266, 'CN', 'system'),
       ('ZSSS', 'SHA', '上海虹桥国际机场', 31.19790077209473, 121.33599853515625, 'CN', 'system'),
       ('ZGGG', 'CAN', '广州白云国际机场', 23.39240074157715, 113.29900360107422, 'CN', 'system'),
       ('ZUUU', 'CTU', '成都双流国际机场', 30.57850074768066, 103.94699859619140, 'CN', 'system'),
       ('ZWWW', 'URC', '乌鲁木齐地窝堡国际机场', 43.90710067749023, 87.47419738769531, 'CN', 'system');

insert into data_runway(airport_id, name)
values ('ZBAA', '18R/36L'),
       ('ZBAA', '18L/36R'),
       ('ZBAA', '01/19');
