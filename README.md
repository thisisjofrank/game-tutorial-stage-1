# 🦕 Dino Runner Game

A comprehensive tutorial series for building a Dino Runner game using Deno and
TypeScript.

## Stage 1: Foundation & setup

### Getting started

Deploy this stage and explore the code.

[![Deploy on Deno](https://deno.com/button)](https://app.deno.com/new?clone=https://github.com/thisisjofrank/game-tutorial-stage-1.git&install=deno+install&mode=dynamic&entrypoint=src/main.ts)

This button will create a new GitHub repository with the code from this stage
and deploy it to Deno Deploy, you'll be able to visit the deployed application
and see the code in action, then you can clone the repository to your local
machine to make it your own.

## What's in this code?

This stage focuses on setting up a simple web server with some basic API
endpoints and static file serving.

### Project structure

```text
Runner Game/
├── src/                    # Server-side source code
│   ├── main.ts             # Server entry point
│   └── routes/             # Route definitions
│       └── api.routes.ts   # API route definitions
├── public/                 # Client-side static files
│   ├── index.html          # Main landing page
│   ├── js/
│   │   └── game.js         # Client-side game logic
│   └── css/
│       └── styles.css      # Styling
├── deno.json               # Deno configuration
├── .env.example            # Environment variables template
└── README.md               # Documentation
```

### `deno.json` - Project configuration

This is where we set up scripts and dependencies for our Deno project.

In this file you will see a `dev` task to run the development server and a
`serve` task to run the production server.

This is also where we define our dependencies in the `imports` section, such as
the Oak framework for building web servers.

#### Deno permissions

Deno requires explicit permissions for file system access, network access, and
environment variable access, this helps to keep your application secure,
especially when using third-party modules, you'll be prompted to grant
permissions if the code you're running requires them, letting you know what your
code is accessing.

We have set up permissions flags in the commands in the `tasks` section of the
`deno.json` file specifies the necessary permissions for our application to
function correctly eg:

```json
"dev": "deno run --allow-net --allow-read --allow-env --env-file --watch src/main.ts",
```

These flags allow the server to read files, access the network, and use
environment variables from a `.env` file.

### `src/main.ts` - HTTP Server entry point

This is where we set up our Deno server using the Oak framework with a
professional architecture. It handles static file serving from the `public/`
directory and provides organized API endpoints with proper separation of
concerns.

### `src/routes/api.routes.ts` - API route definitions

This file contains the API route definitions for our server. It currently
includes a simple health check endpoint that returns a JSON response to verify
that the server is running correctly.

### .env.example - Environment variables template

This file serves as a template for environment variables. Create a new file
called `.env` copy the contents of the example file to set up the server port
and other variables in future.

### `public/index.html` - A landing page

For now this page contains some simple HTML to demonstrate the server
functionality. This is where we will add a canvas in order to display the game
in later stages.

### `public/js/game.js` - Client-side game logic

This file will contain the logic for the game, for now it implements a simple
health check API endpoint.

### `public/css/styles.css` - Styles

Some simple CSS to make the landing page look clean and professional.

## Running the code

To run the server, first install the dependencies, then start the server:

```bash
deno install
deno run dev
```

You can see the application at [http://localhost:8000](http://localhost:8000).

## Stage 1 accomplishments

By completing Stage 1, you'll have:

- ✅ Set up a working Deno development environment
- ✅ Created a basic Oak web server
- ✅ Implemented static file serving
- ✅ Built a simple API endpoint
- ✅ Established project structure for future stages

## Next steps

You can now proceed to
[Stage 2](https://github.com/thisisjofrank/game-tutorial-stage-2), where we will
add a canvas element to the landing page and lay the foundations for our game
architecture.
