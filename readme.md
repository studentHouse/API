# MoveIn API Docs

## Endpoints

---

## Session-Related Endpoints

### **POST**    /login
Requires JSON encoded body containing a email address and password.

Returns an error message if provided credentials are incorrect, and a session token if the user can be found in the database.

#### Example Request
```json
http://movein-api.azuresites.net/login
{
    "email": "john@test.com",
    "password": "Password1"
}
```
#### Example Responses
```json
Success:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJlbm5ld2VyQHdpbGwuY29tIiwiaWF0IjoxNjgxMzkzMzE2LCJleHAiOjE2ODE0MDA1MTZ9.BDO1lcZbWmsyau5UeoNhViMwvFZeKCXUiUrvGvEdFw4"
}

Error:
{
    "error": "incorrect password."
}
```

### **POST** /signup
Requires a JSON encoded body containing details of a new user.

Adds the new user to the database provided they don't already exist.

Returns a login token or error message.

#### Example Request
```json
http://movein-api.azuresites.net/signup
{
    "email": "john@test.com",
    "password": "Password2"
}
```

#### Example Response
```json
Success:
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJlbm5ld2VyQHdpbGwuY29tIiwiaWF0IjoxNjc5OTMzNTY3LCJleHAiOjE2Nzk5NDA3Njd9.9OtOWTcR2nAxfevGVhd5RShk5YO1SYLNxCB_QdaszaI",
	"message": "User created."
}

Error:
{
	"error": "Username taken."
}
```

### **POST** /logout
Removes the current session token from the database, invalidating it.  The user must login again to recive a new, valid, token.

Requires the current token be passed with the request as a URL argument.

#### Example Request
```
http://movein-api.azuresites.net/logout?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJlbm5ld2VyQHdpbGwuY29tIiwiaWF0IjoxNjc5OTMzNTY3LCJleHAiOjE2Nzk5NDA3Njd9.9OtOWTcR2nAxfevGVhd5RShk5YO1SYLNxCB_QdaszaI
```

#### Example Response
```json
{
    "message": "logged out."
}
```


---

## Functionality Related Endpoints
These endpoints all require the user to be logged in and therefore require a valid token as part of the request.


### **GET** /getusers
Returns a list of all users currently enrolled on the platform.

#### Example Request
```json
http://movein-api.azuresites.net/getusers?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJlbm5ld2VyQHdpbGwuY29tIiwiaWF0IjoxNjc5OTMzNTY3LCJleHAiOjE2Nzk5NDA3Njd9.9OtOWTcR2nAxfevGVhd5RShk5YO1SYLNxCB_QdaszaI
```

#### Example Response
```json
[
	{
		"id": 1,
		"email": "Ben23@will.com",
		"createdAt": "2023-03-27T15:43:39.889Z",
		"updatedAt": "2023-03-27T15:43:40.010Z"
	},
	{
		"id": 2,
		"email": "terst@will.com",
		"createdAt": "2023-03-27T15:46:56.036Z",
		"updatedAt": "2023-03-27T15:46:56.178Z"
	},
	{
		"id": 3,
		"email": "ben@will.com",
		"createdAt": "2023-03-27T16:07:57.191Z",
		"updatedAt": "2023-03-27T16:07:57.191Z"
	}
]
```