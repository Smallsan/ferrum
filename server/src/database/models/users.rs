use sea_orm::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "users")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub userid: i32,
    pub name: String,
    pub email: String,
    pub password: String,
}


impl Model {
    pub async fn create(user: Model, db: &DatabaseConnection) -> Result<(), DbErr> {
        let active_model: ActiveModel = ActiveModel {
            userid: Default::default(), // This will be ignored by the database
            ..user.into()
        };
        active_model.insert(db).await?;
        Ok(())
    }

    pub async fn find_user_by_email(email: String, db: &DatabaseConnection) -> Result<Option<Model>, DbErr> {
        let user = Entity::find().filter(Column::Email.eq(email)).one(db).await?;
        Ok(user)
    }
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {}

impl ActiveModelBehavior for ActiveModel {}
