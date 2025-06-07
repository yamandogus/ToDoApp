import rateLimit from "express-rate-limit";

// Global rate limiter
export const globalLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 dakika
  max: 1000, // IP başına maksimum istek sayısı artırıldı
  message: {
    status: "error",
    message: "Çok fazla istek gönderdiniz, lütfen daha sonra tekrar deneyin.",
  },
  standardHeaders: true, // RateLimit-* header'larını döndür
  legacyHeaders: false, // X-RateLimit-* header'larını döndürme
});

// Auth rate limiter (login/register için)
export const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 dakika
  max: 50, // IP başına maksimum istek sayısı artırıldı
  message: {
    status: "error",
    message:
      "Çok fazla giriş isteği gönderdiniz, lütfen 5 dakika sonra tekrar deneyin veya yöneticiyle iletişime geçin.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
