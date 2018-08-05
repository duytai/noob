# noup
Noup is a deployment tool, it provides common features:

- Setup `NodeJS` enviroment for standard `NodeJS` projects: `nvm`, `node`
- Deploy `node` project, deploy your latest project's commit
- Start/Stop/Show logs by using `pm2`

### Installation

```bash
npm i -g noup
```

### Create a noup project

```bash
mkdir ~/my-first-noup
cd ~/my-first-noup
noup init
```
it will create `noup.json` file in your project folder

### Example `noup.json`

```json
{
  "workers": {
    "one": {
      "host": "<username>@<ip>",
      "instances": 2,
      "env": {
        "MONGO_URL": ""
      }
    }
  },
  "app": {
    "name": "bot",
    "path": "/Users/macbookpro/Tests/worker",
    "commit": ""
  },
  "env": {
    "REDIS_URL": ""
  },
  "node": "v10.5.0"
}
```
`noup.json` is easy to follow. However, there are some important fields to keep in mind:

- `host`: noup does not require `pem` or `username`, `password` so you have to add your own ssh key to servers
- `instances`: numbers of processes of your deployed project
- `path`: absolute path or `git url`. Notice: noup will deploy your latest commits not code in that directory

The project entry is `main` field of your `package.json`

### Commom steps

```bash
# setup server's environment
noup setup
# deploy your project
noup deploy
# start your project
noup start
# stop your project
noup stop
# more details
noup --help
```

### Debug

Set `VERBOSE` flag to true to see full logs. For example
```bash
VERBOSE=true noup setup
```
