# Palworld-node-player-announcer

> Currently in beta, use at your own risks

A dead simple method to announce player join and leave count (Count only, due to bugs currently).

## Install 
1. Clone the projects
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
RCON_IP=127.0.0.1 # RCON ip
RCON_PORT=25575 # RCON port
RCON_PASSWORD=1233211234567 # RCON password / admin password
INTERVAL=5 # RCON INTERVAL (5 = 5 seconds)
```

4. Run with `start`
```bash
yarn start
```