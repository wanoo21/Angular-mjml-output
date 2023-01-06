# Angular MJML Output

This aplication converts IPEmails objects to MJML and renders them to HTML. It's build as a simple Express server that serves the API for the Angular application.

In this project, you will also find the custom templates for the IPEmails objects.

## Run locally

First make sure you have [Node.js](https://nodejs.org/en/) installed globally.

This project uses [yarn](https://yarnpkg.com/en/) as the package manager. To install `yarn`, you can run the following command:

```bash
npm install -g yarn
```

To run the application locally, follow these steps:

```bash
yarn install
// for production
yarn start
// for development
yarn run dev
```

Then you can access the application by visiting <http://localhost:3000/ping> in your web browser.

## Run Docker container

To build the image, you can run the following command from the directory where the `Dockerfile` is located:

```bash
docker build -t angular-mjml-output .
```

Replace `angular-mjml-output` with the desired name for your image.

To run the container, you can use the following command:

```bash
docker run -p 3000:3000 angular-mjml-output
```

This will start the container and bind port 3000 on the host machine to port 3000 on the container. This allows you to access the application by visiting <http://localhost:3000/ping> in your web browser.

## Run Docker container with Docker Compose

This docker-compose.yml file does the following:

* Defines a single service called **angular-mjml-output**.
* Builds the **angular-mjml-output** service using the `Dockerfile` in the current directory `(.)`.
* Maps port `3000` on the host machine to port `3000` on the container.
* Sets the `restart` policy for the app service to `always`, which means that the container will be automatically restarted if it stops or crashes.

To build and run the containers, you can use the following command:

```bash
docker-compose up
```

This will build the image and start the container, and you should be able to access the Express application by visiting <http://localhost:3000/ping> in your web browser.