# QB-Movies Project BackEnd

QB-Movies is a project to fetch TMDB API, and implement,
user management for a basic, straight-forward user/movies/favorites,
page, for technical and educative purposes and integration-testing,
of several features

Specially this BackEnd repository implements mainly:

- Nestjs with MongoDB and Prisma
- Layered strcuture (MVC) in several modules, all integrating back to
    an app module
- Basic auth system with no third-party providers

To check FrontEnd repository, built in with Next.js, check [this link]()

## Installation

This app requires [Node.js](https://nodejs.org/) and [Nestjs]() to run

Clone repository and run dependency installation in your package manager

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
Then simply start the application using the Nestjs built-in cmds, for watch mode
simply add :dev at the command line

```sh
npm start
pnpm start:dev
```

## Documentation

There's basically just CRUD routes for users and a login and register
controller route, plus the exteranl API call. For full documentation, please refer
to our swagger detailedroute docs [here]()

## Main dependencies

This backend is currently extended with the following main dependencies.
Details on how we use them in this application are shown below.

| Dependency | Use |
| ------ | ------ |
| prisma | ORM & Database Connection |
| bcrypt | Password hashing / validation |
| class-validator | Validate received data intergity |

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Mateo Guerrero](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)

## License

Nest is [MIT licensed](LICENSE).
