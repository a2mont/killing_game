alter table Kills
add foreign key (TargetId) references Players(PlayerId),
add foreign key (OwnerId) references Players(PlayerId),
add foreign key (GameId) references Games(GameId);
create table Players(
	PlayerId int not null,
    PlayerName varchar(255)
);
create table Games(
	GameId int not null,
    GameName varchar(255),
    Progress varchar(255),
    check (Progress ='WAITING' or Progress ='STARTED' or Progress ='FINISHED'),
    primary key (GameId)
);
create table Players_Games(
	PlayerId int,
    GameId int,
    foreign key (PlayerId) references Players(PlayerId),
    foreign key (GameId) references Games(GameId)
);
create table Kills(
	KillId int not null,
    KillDescription varchar(1020) not null,
    TargetId int unique,
    OwnerId int,
    GameId int,
    primary key (KillId)
);

insert into Kills(KillDescription, TargetId, OwnerId, GameId)
values('Raconter sa vie ui', 2, 1, 1);
insert into Kills(KillDescription, TargetId, OwnerId, GameId)
values('tuer sa vie ui', 1, 2, 2);
select * from kills;

insert into players( PlayerName)
values('Alice');
insert into players(PlayerName)
values('Bob');
insert into players(PlayerName)
values('Charlie');
select * from players;

insert into Games(GameName, Progress)
values('Partie 1', "WAITING");
insert into Games(GameName, Progress)
values('Partie 2', "WAITING");
select * from games;

insert into players_games(PlayerId, GameId)
value(1,1);
insert into players_games(PlayerId, GameId)
value(2,1);
insert into players_games(PlayerId, GameId)
value(1,2);
insert into players_games(PlayerId, GameId)
value(2,2);
select * from players_games;
show create table players_games;
