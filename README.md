# kurssiarkisto
Kurssiarkisto, project for CS-E4400 - Design of WWW Services in Autumn 2016

## Setting up the environment on OS X

First, install [Node.js](https://nodejs.org/en/) and verify that it's working by typing `node -v` into your terminal.

Then, enter the following commands into your terminal:

    $ git clone https://github.com/Flibo/kurssiarkisto.git
    $ cd kurssiarkisto/server
    $ npm install

After these steps, you can run the server with `node server.js` and visit localhost:3000 in your browser to use the server API.

## Basic workflow

When you start working on something, first do a `git pull`. When you're done with changing stuff, type `git add .` and `git commit -m "Useful commit message"`. If everything went smoothly, you can push your changes to this repository with `git push`.
