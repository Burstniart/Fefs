

1. Create a server: Here we create one using node
The template used is the simpleServer.js file, which is runned with node and that creates our server.

1. Get a server: Right now I got a Digital Ocean server running Ubuntu 20 LTS, apparently I could get an Azure or AWS server running, for know I'm using some credits given to me to use un Digital ocean but since it requires the minimum you can get a server up and running for 6 dollars a month, again this is for basic tiers on this cloud providers, maybe there are some free tiers out there that work for small projectsFly.io and Oracle Cloud I'm looking at both of you.

	1. Generate your ssh key: ssh-keygen generates ssh keys which you then use to log in your server.

1. Get a domain name: Got mine from Github student pack offer from Namecheap, I have a couple left but this one gets me a .me domain for now.
(On a funny note I checked a github actions box and it automatically deployed my user.github.io page, cool I guess...)

1. Set domain name on your server: Add your domain to your server

	1. Create 2 records for your domain in your server: These A type DNS records will point to different places, "@" will point to the root and "www" to the main hostname I'm guessing

	
	- While your at it get your server name links, we'll need them to add them in the domain

1. Set the server names on your domain: Add nameservers as customDNS to your domain, you know, the ones I said we'll be needing; this may take some time so we'll set up the server to kill some time

	- Updating my server so it works nice and smooth~

1. Set up a new user: Leaving root as default is dangerous!
	1. Create a new user
	1. Give it sudo!

1. Add your authorized keys: Create a file inside the ~/.ssh/ directory, there we'll be adding our public ssh key to aDD user log.
On a side note i couldn't log in the first time, it said something about permission denied and public key so I re-cpied and pasted the public key and also indicate that my user@direction should ssh in  with the key as such:
ssh -i ~/.ssh/mykey user@direction(ip)

	**Important: change permissions with chmod to the authorized keys files in order to prevent anyone from reading or modifying it, 644 should allow sudo and some process that need it to consult it** 

1. Lock root out: Disable root login from the sshd (daemon) config file.

**Warning: If done incorrectly this could lock you out, luckily we have our user set but nevertheless should we let our guards down**

After that simply restart the service:
sudo service sshd restart

1. Install Nginx: What goes where?

Since our server now is up and running we need something to manage the work and Nginx is the man for the job.
I love to say nginx... NGINX NGINX NGINX NGINX NGINX NGINX!!!!!

  - Install nginx in the server machine, not your local machine:

	sudo apt install nginx

  - Get the service up and running:

	sudo service nginx start

1. Modify homepage your way: Creating a HTML file.

Here's the thing: Most people use this route to store their pages, it can be modified but since it's a standard we'll be keeping things there.
Oh the route is `/var/www/html/` so go ahead and create a simple html file, it doesn't have to be a fully fleshed html file, passing plain text will work for now


   sudo vi /var/www/html/index.html

*I'll include the file I used and a screenshot here*
 >> include index screenshot here

1. Create an application server with NodeJS

Now lets go ahead and download NodeJS and NPM  to manage our application server, from your server run:
	
	sudo apt install nodejs npm

Also while we're at it let's install git

	sudo apt install git

1. The set up

Change ownership of the www directory to the current user

	sudo chown -r $USER:$USER /var/www

Note: $USER calls your current user so the command can be typed like so as long as your current user is the right one

Create app directory inside www directory, this will be our app directory

	mkdir /var/www/app

Initialize a repository with git inside with `git init`

- Inside the app directory you can go ahead and create the architecture for your project, for this one I've created an app.js file and ui directory with a js, css and html directories inside

1. Bring in JSON
This is a well known process, let's create our JSON file to start managing our project since this is running with node:

	npm init

1. Bring in Express
Express is a JS web server that we'll use to handle our server, install it with npm

	npm i express --save

1. Set the server, again
Alright so now write the server but this time do it in the express syntax, feel free to do it your way or maybe just copy and paste the express snippet provided as an example
https://expressjs.com/en/starter/hello-world.html

- Once our app.js file is set you can run it with 'node app.js' but since it's pointing to the port 3000 it wont be accesible unless you specify it

url.dom:port

So we got to tell Nginx to conect

1. Point Nginx to the right port
Do a 'sudo vi /etc/nginx/sites-available/default' to add in the proxy pass directive, this where you wind the '''location / {}''' tag we'll add inside the curly braces:

	proxy_pass http://127.0.0.1:300/;

The benefit of doing this is being able to run multiple apps, rout databases and they wont affect each other if one is taken down

- Go ahead and restart your server once the changes are done

	sudo service nginx reload

After refreshing your page you'll be able to see the changes, don't forget to start your app before refreshing tho


1. Add a process manager
A process manager will keep the app up and running and handle errors ir might encounter, so it will make mantaining the server an easier job
Let us begin by doing a globla installation of PM2 as a process manager:

   sudo npm i -g pm2

Now let's go and statr PM2

   pm2 start app.js

To setup the auto restart, which is why we're here

    pm2 startup

Copy and paste the code provided by NP2 to set up the startup script, it should do it automatically but I encountered and error while testing so if you test by shutting down your server and turning it back on again resolving in your app not coming back on it's own simply repeat those steps but include the script

Test with 'pm2 status' to see the process status

After that do a 'pm2 save' to save changes


