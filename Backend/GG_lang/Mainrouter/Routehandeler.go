package Mainrouter

import (
	"encoding/json"
	"fmt"
	"frist/model"
	"net/http"
	"context"

)
type ctxKey string
const userKey ctxKey = "user"
var Mux *http.ServeMux
func check(email string ,username string ) string {
	var e string
	var u string 
	model.Db.Raw(`Select email from users where email=?`,email).Scan(&e)
	model.Db.Raw(`Select username from users where username=?`,username).Scan(&u)
	if u==username ||e==email {
	return "This user name or Email is alrady exist"
	}
	return ""
}
func CheckNessary(next http.Handler) http.Handler{
	return http.HandlerFunc( func(w http.ResponseWriter, r *http.Request){
     D:=json.NewDecoder(r.Body)
	var U model.User
	 err:=D.Decode(&U)
	 if err!=nil{
		http.Error(w,"Fail to decode the data",http.StatusBadRequest)
		return;
	 }
      res:=check(U.Email,U.Username)
	  if res!=""{
		http.Error(w, res,http.StatusConflict)
      return;
	  }
	  ctx := context.WithValue(r.Context(), userKey, U)
    next.ServeHTTP(w, r.WithContext(ctx))
    })
}
func setuser(w http.ResponseWriter, r *http.Request){
		user, ok := r.Context().Value(userKey).(model.User)
   if !ok {
    http.Error(w, "no user in context", http.StatusUnauthorized)
    return
   }
	 result:=model.Db.Create(&user)
	 if result.Error!=nil{
         fmt.Println(result.Error)
		 http.Error(w,"Enternal database server error",http.StatusBadRequest)
		return
	 }
	 resp:=map[string]string{
		"status":"succes",
		"message":"Your account created succesfully",
	 }
	  w.WriteHeader(200)
	 en:=json.NewEncoder(w)
	 en.Encode(resp)

}
func global(next *http.ServeMux)http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter,r *http.Request){
		w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS,PUT,DELETE")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Content-Type", "application/json")
		if r.Method=="OPTIONS"{
		w.WriteHeader(200)
			return;
		}
		next.ServeHTTP(w,r)
	})
}
func Router(){
	Mux=http.NewServeMux()
	Userlogin()
	Mux.Handle("POST /signup",CheckNessary(http.HandlerFunc(setuser)))
    fmt.Println("the port is running is 8081")
    err:=http.ListenAndServe(":8081",global(Mux))
    if err!=nil{
     fmt.Println("internal server error")
     }
}