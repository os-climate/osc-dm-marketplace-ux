# bgs-dm-marketplace-ux - BGS Server for Data Mesh Registry - User Interface

This project is the Bazaar (Marketplace) for Broda Group
Software's Ecosystem Platform. The Bazaar is a catalog, or marketplace, that
makes it easy for users to find, consume, share, and trust
data.

Full documentation is available in in the
[bgs-dm-mesh-doc](https://github.com/brodagroupsoftware/bgs-dm-mesh-doc)
repo.

This application interacts with other applications. You can run
the full set of applications by following instructions in the
[bgs-dm-mesh-doc](https://github.com/brodagroupsoftware/bgs-dm-mesh-doc)
repo.

The remaining sections explain how to Dockerize the application
as well as providing a few developer notes.

## Prerequisites

None noted.

## Setting up your Environment

Some environment variables are used by various coded and scripts.
Setup your environment as follows (note that "source" is used)
~~~~
source ./bin/environment.sh
~~~~

## React Application

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app)
and follows normal React practices.

## Proxy Setup to Access Server Information

Note that this application access data residing on a server.
It uses basic HTTP request, but this does require a proxy to be
setup such that CORS issues to not surface.

The following line is added to the package.json
~~~~
"proxy": "http://127.0.0.1:8000",
~~~~

The "package.json" should look similar to the following
(note the "proxy" tag):
~~~~
{
  "name": "bgs-dm-marketplace-ux",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://127.0.0.1:8000",
  "dependencies": {
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
~~~~

## Dockerizing the Application

The application is designed to run in a Docker container.

To create the Docker container ("dockerizing"), issue the
following command:
~~~~
$PROJECT_DIR/bin/dockerize.sh
~~~~

## Running the Application

The following command will start the standalone
application locally.
~~~~
$PROJECT_DIR/app/start.sh
~~~~


