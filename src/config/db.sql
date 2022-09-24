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
    description VARCHAR(255) NOT NULL,
    genre VARCHAR(30) NOT NULL

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

-- ALTER TABLE gamersGames ADD COLUMN game_level INT NOT NULL DEFAULT 0;

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

SELECT a.username,g.id,g.rating,g.gamingExperience,g.gamerMatchedRating
FROM accounts a,gamers g,gamerRequestsHistory grh 
WHERE a.id = g.account_id AND
grh.receiver_id != g.id AND
g.id != 1

SELECT r.id,r.sender_id,r.receiver_id,ar.username as 'receiver_name',as.username as 'sender_name'
            FROM accounts as,accounts ar,gamerRequestsHistory r,gamers gs,gamers gr
            WHERE gs.id = r.sender_id AND
            gr.id = r.receiver_id AND
            as.id = gs.account_is AND
            ar.id = gr.account_id AND
            r.sender_id = 1
