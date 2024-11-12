const jwt = require('jsonwebtoken');
const SECRET_KEY = "your_secret_key";

// Fungsi untuk mendekode token
function decodeToken(token) {
  try {
    // Verifikasi dan dekode token
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded; // Mengembalikan data payload, misalnya { username: 'user' }
  } catch (err) {
    console.error("Token tidak valid:", err.message);
    return null;
  }
}

// Contoh penggunaan
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzMxNDA5NzU4LCJleHAiOjE3MzE0MTMzNTgsIm5iZiI6MTczMTQwOTc1OCwianRpIjoiZ1NOcDJxV0E5S05RMjlndyIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.kcOrjP3x0dHXEy8AB-G4tPmke1bbwGPx57IeYMcm2WE";  // Token JWT yang dihasilkan
const userData = decodeToken(token);

if (userData) {
  console.log("Data yang didapat dari token:", userData);  // Output: { username: 'user', iat: ..., exp: ... }
} else {
  console.log("Token tidak valid atau telah kedaluwarsa.");
}