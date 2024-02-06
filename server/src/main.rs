use rocket::request::FromRequest;
use rocket::{request, response::Redirect, Request, FromForm, form::Form};

#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_sync_db_pools;
#[macro_use] extern crate diesel;

use rocket::http::Cookie;
use rocket::http::Status;
#[database("sqlite_db")]
struct DbConn(diesel::SqliteConnection);

#[derive(FromForm)]
struct Login {
    username: String,
    password: String,
}

#[derive(Debug)]
struct User {
    username: String,
}

#[rocket::async_trait]
impl<'r> FromRequest<'r> for User {
    type Error = std::convert::Infallible;

    async fn from_request(request: &'r Request<'_>) -> request::Outcome<User, Self::Error> {
        request.cookies()
        .get_private("user_id")
        .and_then(|cookie| cookie.value().parse().ok())
        .map(|user_id| User { username: user_id})
        .or_forward(())
    }
}

#[post("/login", data= "<login_form>")]
async fn login(conn: DbConn, login_form: Form<Login>) -> Result<Redirect, Template> {
    // Confirm Login Creds
    conn.run(move |c| {
        use crate::schema::users::dsl::*;
        let user = users.filter(name.eq(&login_form.username)).first<User>(c).ok()?;
        Some(user)
    }).await
    .map(|user| {
        let mut cookies = conn.cookies();
        cookies.add_private(Cookie::new("user_id", user.username));
        Ok(Redirect::to("/"))
    })
    .unwrap_or(Err(Status::Unathorized))
}

#[get("/logout")]
fn logout(mut cookies: Cookies) -> Redirect {
    cookies.remove_private(Cookie::named("user_id"));
    Redirect::to("/")
}

#[launch]
fn rocket() -> _ {
    rocket::build()
    .attach(DbConn::fairing())
    .mount("/", routes![login, logout])
}

