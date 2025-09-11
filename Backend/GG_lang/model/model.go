package model
import (
    "gorm.io/gorm"
    "gorm.io/driver/mysql"
    "fmt"
)
 type User struct{
  Id   uint64 `gorm:"primaryKey;autoIncrement"`
  Fname string `json:"fname"`
  Lname string  `json:"lname"`
  Email string   `json:"email" gorm:"not null;unique"`
  Username string `json:"username" gorm:"not null; unique"`
  Gender string   `json:"gender" gorm:"default:NULL"`
  Passwort string  `json:"passwort" gorm:"not null;default:strong"`
  Role string     `json:"role" gorm:"not null;default:Student"`
 }
 type student struct{
    gorm.Model
    Name string 
    Email string 
    Password string
}
var Db *gorm.DB
 func Create_db() {
    dsn := "root:sa@#255271&@tcp(127.0.0.1:3306)/shakil"

    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        panic("failed to connect to database")
    }
    
    // Auto Migrate the table
      err = db.AutoMigrate(&User{})
     if err != nil {
      panic("failed to auto migrate table")
   }
   err = db.AutoMigrate(&student{})
   if err != nil{
    panic("failed to auto migrate student table")
   }
   Db= db
   fmt.Println("yes")
}
