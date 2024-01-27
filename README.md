# Palworld-node-player-announcer

![https://github.com/r48n34/Palworld-node-player-announcer](/assert/palImg.jpg)

> Currently in beta, use at your own risks

A dead simple method to announce player join and leave count (Count only, due to bugs currently) by nodejs.

## Install 
1. Clone the project
```bash
git clone https://github.com/r48n34/Palworld-node-player-announcer.git
```

2. Install packages
```bash
yarn
```

3. Initial the `.env` file  
Create a file named `.env` at the root, and copy `.env.sample` items to your `.env`.
```bash
RCON_IP=127.0.0.1 # RCON ip (Default: 127.0.0.1)
RCON_PORT=25575 # RCON port (Default: 25575)
RCON_PASSWORD=1233211234567 # RCON password / admin password (Default: "")
INTERVAL=5 # RCON INTERVAL (5 = 5 seconds) (Default: 5)
```

4. Run with `start`
```bash
yarn start
```


## Docker method
This method is for docker usage to build your own `docker images` and up with `docker-compose`.  

1. Build docker
```bash
docker build -t palworld-node-player-announcer .
```

2. Using `docker-compose.yml` 
```bash
docker-compose up --force-recreate -d
```

## Q&A
Q. Why not to shows player name  
A. Due to current RCON display non-english word issues, this solution is only for display players joning or leave.