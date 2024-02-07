mod database;
#[macro_use] extern crate rocket;
use database::models::users::Model;
use rocket::http::Status;
use sea_orm::{Database, DatabaseConnection};
use rocket::serde::json::Json;
use bcrypt::{hash, verify, DEFAULT_COST};


#[derive(serde::Deserialize)]
struct RegisterData {
    name: String,
    email: String,
    password: String,
}

#[derive(serde::Deserialize)]
struct LoginData {
    email: String,
    password: String,
}

async fn connect_to_db() -> Result<DatabaseConnection, sea_orm::error::DbErr> {
    Database::connect("./database/ferrum_database.db").await
}

#[post("/register", data = "<data>")]
async fn register(data: Json<RegisterData>) -> Status {
	let db = connect_to_db().await.unwrap();
    let user = Model {
        userid: 0, 
        name: data.name.clone(),
        email: data.email.clone(),
        password: data.password.clone(),
    };
    match Model::create(user, &db).await {
        Ok(_) => Status::Created,
        Err(_) => Status::InternalServerError,
    }
}

#[post("/login", data = "<data>")]
async fn login(data: Json<LoginData>) -> Status {
	let db = connect_to_db().await.unwrap();
    let user = Model::find_user_by_email(data.email.clone(), &db).await;
    match user {
        Ok(Some(user)) => {
            if user.password == data.password {
                Status::Ok
            } else {
                Status::Unauthorized
            }
        },
        Ok(None) => Status::NotFound,
        Err(_) => Status::InternalServerError,
    }
}

#[launch]
async fn rocket() -> _ {
    rocket::build()
	.mount("/", routes![register, login])
}
