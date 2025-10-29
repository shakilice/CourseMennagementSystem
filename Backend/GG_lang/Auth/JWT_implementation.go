package Auth

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"errors"
	"strings"
	"time"
	"net/http"
)

// JWT secret key
var jwtSecret = []byte("********123")

// Claims struct
type Claims struct {
	Username string `json:"user_id"`
	Role   string `json:"role"`
	Exp    int64  `json:"exp"` // expiration timestamp
	Iat    int64  `json:"iat"` // issued at timestamp
}

// helper: base64 encode without padding
func base64Encode(data []byte) string {
	s := base64.URLEncoding.EncodeToString(data)
	return strings.TrimRight(s, "=")
}

// helper: base64 decode
func base64Decode(data string) ([]byte, error) {
	// Add padding if missing
	if m := len(data) % 4; m != 0 {
		data += strings.Repeat("=", 4-m)
	}
	return base64.URLEncoding.DecodeString(data)
}

// GenerateToken creates a JWT token
func GenerateToken(username, role string, duration time.Duration) (string, error) {
	header := map[string]string{
		"alg": "HS256",
		"typ": "JWT",
	}
	headerJSON, _ := json.Marshal(header)
	headerEncoded := base64Encode(headerJSON)

	now := time.Now()
	claims := Claims{
		Username: username,
		Role:   role,
		Iat:    now.Unix(),
		Exp:    now.Add(duration).Unix(),
	}
	claimsJSON, _ := json.Marshal(claims)
	payloadEncoded := base64Encode(claimsJSON)

	unsignedToken := headerEncoded + "." + payloadEncoded

	// Sign with HMAC SHA256
	h := hmac.New(sha256.New, jwtSecret)
	h.Write([]byte(unsignedToken))
	signature := base64Encode(h.Sum(nil))

	token := unsignedToken + "." + signature
	return token, nil
}

// ValidateToken parses and validates a JWT token
func ValidateToken(token string) (*Claims, error) {
	parts := strings.Split(token, ".")
	if len(parts) != 3 {
		return nil, errors.New("invalid token format")
	}
	headerEncoded, payloadEncoded, signature := parts[0], parts[1], parts[2]

	// Verify signature
	Token := headerEncoded + "." + payloadEncoded
	h := hmac.New(sha256.New, jwtSecret)
	h.Write([]byte(Token))
	expectedSig := base64Encode(h.Sum(nil))

	if !hmac.Equal([]byte(expectedSig), []byte(signature)) {
		return nil, errors.New("invalid signature")
	}

	// Decode payload
	payloadBytes, err := base64Decode(payloadEncoded)
	if err != nil {
		return nil, err
	}

	var claims Claims
	if err := json.Unmarshal(payloadBytes, &claims); err != nil {
		return nil, err
	}
	// Check expiration
	if time.Now().Unix() > claims.Exp {
		return nil, errors.New("token expired you have to login again")
	}
	return &claims, nil
}
func Setcridential(username , role string ,w http.ResponseWriter){
     	token, err := GenerateToken(username, role, time.Hour*12)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}
	// Set token in secure HTTP cookie
	http.SetCookie(w, &http.Cookie{
		Name:     "auth_token",
		Value:    token,
		Path:     "/",            
		Expires:  time.Now().Add(time.Hour * 1),
	})
	// Optional JSON response
	//just varifiacation with the postman or api testing that this work well
	// resp := map[string]string{
	// 	"status":  "successful",
	// 	"message": "Credentials set in cookie",
	// }

	// w.Header().Set("Content-Type", "application/json")
	// w.WriteHeader(http.StatusOK)
	// json.NewEncoder(w).Encode(resp)
}