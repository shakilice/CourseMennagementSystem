package Mainrouter
import (
	"encoding/json"
	"net/http"
	"frist/model"
)
type CourseInfo struct {
		ChannelName string  `json:"channel_name"`
		Title       string  `json:"title"`
		TotalValue  float64 `json:"total_value"`
	}

func browseCourse(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	var courses []CourseInfo
	result := model.Db.Raw("SELECT channel_name, title, total_value FROM channels").Scan(&courses)
	if result.Error != nil {
		http.Error(w, "Database query failed", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(courses)
}
func BrowseCourse() {
	Mux.Handle("GET /browser/course", http.HandlerFunc(browseCourse))
}
