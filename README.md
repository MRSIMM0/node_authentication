## Node Authentication App

It’s a simple Node.js application for authentication users using email confirmation. 

### Technology

- Node.js
- Typescipt
- Docker Compose
- postgreSQL
- Liquibasel

### Usage

To run application use ***docker compose up***. Then required containers will be build, and app will start.

### Endpoints

**/register** - used for user registration

body:

```json

{
		username:string,
    email:string,
    password:string
}
```

**/authenticate** - used for user authentication

body:

```json
{
		email:string,
    password:string
}
```

**/forgot** - used for reset user password

body:

```json
{
	email:string
}
```