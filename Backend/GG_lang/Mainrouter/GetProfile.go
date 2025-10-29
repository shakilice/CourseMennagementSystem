package Mainrouter

import (
	"encoding/json"
	"net/http"

	"frist/Auth"
	"frist/model"
)

// ProfileInfo struct (matches your model)
type ProfileInfo struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Gender    string `json:"gender"`
	Religion  string `json:"religion"`
	Role      string `json:"role"`
	Address   string `json:"address"`
	Bio       string `json:"bio"`
}

// browseProfile handler
func Profile(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	claims := Auth.GetClaims(r)
	if claims == nil {
		http.Error(w, "Unauthorized: invalid token", http.StatusUnauthorized)
		return
	}

	username := claims.Username

	var profile ProfileInfo

	result := model.Db.Raw(`
		SELECT p.first_name, p.last_name, p.gender, p.religion, u.role, p.address, p.bio
		FROM profiles p
		JOIN users u ON u.id = p.user_id
		WHERE u.username = ?
	`, username).Scan(&profile)

	if result.Error != nil || result.RowsAffected == 0 {
		http.Error(w, "Profile not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(profile)
}

// RegisterProfileRoute registers the route in the same style
func Getprofile() {
	Mux.Handle("/profile", Auth.AuthMiddleware(http.HandlerFunc(Profile)))
}
