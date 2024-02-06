#[macro_use] extern crate rocket;
use rocket::http::Status;
use serde::Deserialize;
use rocket::serde::json::Json;

#[derive(Deserialize)]
struct LoginRequest {
    username: String,
    password: String,
}

#[post("/login", format = "json", data = "<login_request>")]
fn login(login_request: Json<LoginRequest>) -> Status {
    let username = &login_request.username;
    let password = &login_request.password;

    // Here, you would typically check the username and password against your database.
    // If the login is successful, return a success status (e.g., Status::Ok).
    // If the login fails, return an error status (e.g., Status::Unauthorized).

    Status::Ok
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![login])
}