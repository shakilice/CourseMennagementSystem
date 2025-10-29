package model
import (
    "gorm.io/gorm"
    "gorm.io/driver/mysql"
    "fmt"
    "time"
)
 type User struct{
  Id   uint64 `gorm:"primaryKey;autoIncrement"`
  Email string   `json:"email" gorm:"not null;unique"`
  Username string `json:"username" gorm:"not null; unique"`
  Gender string   `json:"gender" gorm:"default:NULL"`
  Passwort string  `json:"passwort" gorm:"not null;default:strong"`
  Role string     `json:"role" gorm:"not null;default:Student"`
 }
 type Channel struct {
	ID          uint64  `gorm:"primaryKey;autoIncrement" json:"id"`
	ChannelName string  `json:"channel_name" gorm:"not null;unique"`
	Title       string  `json:"title"`
	TotalValue  float64 `json:"total_value" gorm:"default:0"`
}
type Profile struct {
	ID          uint64    `gorm:"primaryKey;autoIncrement" json:"id"`
	UserID      uint64    `json:"user_id" gorm:"not null;unique"`
	FirstName   string    `json:"first_name" gorm:"not null"`
	LastName    string    `json:"last_name" gorm:"not null"`
	Gender      string    `json:"gender"`
	Religion    string    `json:"religion"`
	Role        string    `json:"role" gorm:"not null;default:'Student'"`
	Address     string    `json:"address"`
	DateOfBirth time.Time `json:"date_of_birth"`
	Bio         string    `json:"bio"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
type CourseDetail struct {
	ID          uint64    `gorm:"primaryKey;autoIncrement" json:"id"`
	ChannelName string    `json:"channel_name" gorm:"not null"`
	Module      string    `json:"module" gorm:"not null"`
	Lesson      string    `json:"lesson" gorm:"not null"`
	Description string    `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
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
