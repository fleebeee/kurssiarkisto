# kurssiarkisto
Kurssiarkisto, project for CS-E4400 - Design of WWW Services in Autumn 2016

## Setting up the environment on OS X

First, install [Node.js](https://nodejs.org/en/) and verify that it's working by typing `node -v` into your terminal. Then you need to clone the repository:

    $ git clone https://github.com/Flibo/kurssiarkisto.git

The service is split into three smaller services that you must run concurrently.

### Client

The client can be set up by entering these commands into your terminal:

    $ cd client
    $ npm install

You can run the client with `npm start`. The client is available at localhost:8000.

### Server

Enter the following commands into your terminal:

    $ cd server
    $ npm install

After these steps, you can run the server with `node server.js` and visit localhost:3000 in your browser to use the server API.

### Database

TODO

## Basic workflow

When you start working on something, first do a `git pull`. When you're done with changing stuff, type `git add .` and `git commit -m "Useful commit message"`. If everything went smoothly, you can push your changes to this repository with `git push`.
