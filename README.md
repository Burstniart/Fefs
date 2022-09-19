

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

