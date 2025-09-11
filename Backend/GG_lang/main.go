package main
import (
    "fmt"
    "frist/model"
    "frist/Mainrouter"
   // "net/http"
)
func main(){
    fmt.Println("Starting the application...")
    //mux:=http.NewServeMux()
}
func init(){
    model.Create_db()
    Mainrouter.Router()
}