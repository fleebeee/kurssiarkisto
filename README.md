# kurssiarkisto
Kurssiarkisto, project for CS-E4400 - Design of WWW Services in Autumn 2016

## Description
A service for Aalto university students and personnel to write and read reviews and comments about courses and find basic information about them.

## Technologies

The service consists of a Express.js REST API that feeds into a Next.js (a React-based framework) client. There's a MongoDB database that the server uses to fetch and store data. We use Babel to enable ES6 syntax and eslint to enforce a common programming style throughout the project.

## Setting up the development environment on OS X

First, install [Node.js](https://nodejs.org/en/) and verify that it's working by typing `node -v` into your terminal. Then you need to clone the repository:

    $ git clone https://github.com/Flibo/kurssiarkisto.git

The service is split into three smaller services that you must run concurrently. Once they are running, you can access the website at localhost:3000.

### Database

First, you have to install [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) on your machine by either Homebrew or with a binary. Then, setup MongoDB with

    $ sudo mkdir -p /data/db
    $ sudo chown -R $USER /data/db

You can now run `mongod --dbpath=/data/db` to bring up MongoDB.

### Server

Enter the following commands into your terminal:

    $ cd server
    $ npm install

After these steps, you can run the server with `npm run dev` and visit localhost:3003 in your browser to use the server API.

### Client

The client can be set up by entering these commands into your terminal:

    $ cd client
    $ npm install

You can run the client with `npm run dev`. The client i.e. the public interface for the web service is available at localhost:3000.

## Deployment

When deploying, instead of running `npm run dev` both on `client` and `server` folders, first run `npm run build` and then `npm run start`. This way the project will run on the production environment and be more efficient.

### DigitalOcean

Rough instructions on Ubuntu 16:

    $ curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
    $ sudo apt-get install -y nodejs

Setup a SSH key for GitHub
    
    $ git clone git@github.com:Flibo/kurssiarkisto.git
    $ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
    $ echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
    $ sudo apt-get update
    $ sudo apt-get install -y mongodb-org=3.2.10 mongodb-org-server=3.2.10 mongodb-org-shell=3.2.10 mongodb-org-mongos=3.2.10 mongodb-org-tools=3.2.10
    $ sudo service mongod start
    $ sudo apt-get install python
    $ npm install -g node-gyp
    $ sudo apt-get install build-essential
    $ npm install
    $ export LC_ALL=C

Setup nginx

    $ sudo service nginx restart
    
## Basic workflow

When you start working on something, first do a `git pull`. When you're done with changing stuff, type `git add .` and `git commit -m "Useful commit message"`. If everything went smoothly, you can push your changes to this repository with `git push`.
