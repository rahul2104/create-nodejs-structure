# Node js Structure

Nodejs project structure using expressjs,socket.io

## Install

### Install current stable version of nodejs

```Shell
curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh

sudo bash nodesource_setup.sh

sudo apt install nodejs

sudo apt-get install g++ build-essential

Nodejs current version check

nodejs -v
```
### Install redis server
```Shell
sudo apt update

sudo apt install redis-server
```
### Install mongodb

Install new version of mongodb
```Shell
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -

echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list

sudo apt-get update

sudo apt-get install -y mongodb-org

sudo service mongod start

sudo service mongod stop
```
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

## Env setup
create .env file in root folder

add all key from env.example

## Database connection
default database info (mongodb)

db name - demo

db port - 27017 (default mongodb port)

db user - demo

db pass - demo

## Redis server 
it is use for token store

default redis server setup

server: 'localhost',

port: 6379, (default redis port)

## Development server
base url -
   http://localhost:5001

Basic Auth api security 

basic auth credentials
username- demo
password - demo

## Staging server
base url -
   http://localhost:5002

## Production server
base url -
   http://localhost:5003

## Swagger Doc link

http://localhost:5001/apiDocs/v1/
```Shell
    basic auth credentials
    username- demo
    password - demo
```
