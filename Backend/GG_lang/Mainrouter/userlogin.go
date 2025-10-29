package Mainrouter

import (
	"encoding/json"
	"fmt"
	"frist/model"
	"net/http"
  "frist/Auth"
)
type Person struct{
  Username string `json:"username"`
  Passwort string `json:"passwort"`
}
func login(w http.ResponseWriter,r *http.Request){
   d:=json.NewDecoder(r.Body);
   var P Person
   err:=d.Decode(&P)
   if err!=nil{
	http.Error(w,"invalid jason object",http.StatusBadRequest)
	return
   }
   var username string
   var email string
   var role string 
   fmt.Println(P)
   r1:=model.Db.Raw("select username from users where username=?&& passwort=?",P.Username,P.Passwort).Scan(&username)
   r2:=model.Db.Raw("select email from users where email=? && passwort=?",P.Username,P.Passwort).Scan(&email)
   if r1.RowsAffected==1 || r2.RowsAffected==1{
	 en:=json.NewEncoder(w)
	 lg:= map[string]string {
		"status":"succesful",
		"message":"Login succesful",
	 }
	 w.WriteHeader(200)
	 en.Encode(lg)
     if r1.RowsAffected==1 {
        model.Db.Raw("select role from users where username=?&& passwort=?",P.Username,P.Passwort).Scan(&role)
        Auth.Setcridential(username ,role,w)
         return;
     }
      model.Db.Raw("select role from users where email=?&& passwort=?",P.Username,P.Passwort).Scan(&role)
        Auth.Setcridential(username ,role,w)
      return;
   }
  http.Error(w,"Invalid User name or Password",http.StatusBadRequest)

}
func Userlogin(){
  Mux.Handle("POST /userlogin/login",http.HandlerFunc(login))
}