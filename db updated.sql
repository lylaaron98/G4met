
create table accounts(

    id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'gamer'
    
)ENGINE=InnoDB;

create table gamers(

    id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    rating INT UNSIGNED NOT NULL DEFAULT 0,
    gamingExperience INT UNSIGNED NOT NULL DEFAULT 1,
    gamerMatchedRating VARCHAR(30) NOT NULL DEFAULT 'bronze',

    account_id TINYINT UNSIGNED NOT NULL,

    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE

)ENGINE=InnoDB;

create table games(

    id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description VARCHAR(2500) NOT NULL,
    genre VARCHAR(250) NOT NULL

)ENGINE=InnoDB;

create table gamesRoles(

    id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL

)ENGINE=InnoDB;

create table gamersGames(

    id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    gamer_id TINYINT UNSIGNED NOT NULL,
    game_id TINYINT UNSIGNED NOT NULL,
    game_role_id TINYINT UNSIGNED NOT NULL,
    game_level INT UNSIGNED NOT NULL DEFAULT 1,
    game_experience VARCHAR(100) NOT NULL DEFAULT '1 year',

    FOREIGN KEY (gamer_id) REFERENCES gamers(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    FOREIGN KEY (game_role_id) REFERENCES gamesRoles(id) ON DELETE CASCADE

)ENGINE=InnoDB;

create table gamerMatchesHistory(

    id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    first_gamer_id TINYINT UNSIGNED NOT NULL,
    second_gamer_id TINYINT UNSIGNED NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (first_gamer_id) REFERENCES gamers(id) ON DELETE CASCADE,
    FOREIGN KEY (second_gamer_id) REFERENCES gamers(id) ON DELETE CASCADE

)ENGINE=InnoDB;

create table gamerRequestsHistory(

    id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    sender_id TINYINT UNSIGNED NOT NULL,
    receiver_id TINYINT UNSIGNED NOT NULL,

    status VARCHAR(30) NOT NULL DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (sender_id) REFERENCES gamers(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES gamers(id) ON DELETE CASCADE

)ENGINE=InnoDB;


INSERT INTO games(name,description,genre)
VALUES

    ("League Of Legends","League of Legends is a team-based strategy game where two teams of five powerful champions face off to destroy the other's base. Choose from over 140 champions to make epic plays, secure kills, and take down towers as you battle your way to victory.","Multiplayer online battle arena, Action role-playing game"),
    ("Valorant","Valorant is a tactical shooting game involving two teams with 5 players in each team. Every player can sign in and play remotely from anywhere in the world. Every game has 25 rounds and the team that wins 13 of them first wins the game. Players can choose their in-game characters called agents at the start of the game.","Shooter Video Game")
;

INSERT INTO gamesRoles(name)
VALUES
    ("Top"),
    ("Jungle"),
    ("Mid"),
    ("AD Carry"),
    ("Support"),
    ("Initiator"),
    ("Duelist"),
    ("Controller"),
    ("Sentinel")
;

