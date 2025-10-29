package Auth
import (
	"net/http"
	"context"
)
type context_para string 
const lara context_para="clims"
func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("auth_token")
		if err != nil {
			http.Error(w, "Unauthorized: missing token", http.StatusUnauthorized)
			return
		}

		claims, err := ValidateToken(cookie.Value)
		if err != nil {
			http.Error(w, "Unauthorized: "+err.Error(), http.StatusUnauthorized)
			return
		}
		// Set claims in request context for downstream handlers
		ctx := context.WithValue(r.Context(), lara, claims)
		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}
// Helper to get claims in handlers
func GetClaims(r *http.Request) *Claims {
	if claims, ok := r.Context().Value(lara).(*Claims); ok {
		return claims
	}
	return nil
}