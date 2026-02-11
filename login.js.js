export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { phone, otp, pin } = req.body;

  console.log("Login attempt:", phone, "OTP:", otp, "PIN:", pin);

  if (!phone || !otp || !pin) {
    return res.status(400).json({ message: "Missing phone, OTP, or PIN" });
  }

  const otpPattern = /^\d{6}$/; // exactly 6 digits
  const pinPattern = /^\d{4}$/; // exactly 4 digits

  if (!otpPattern.test(otp)) {
    return res.status(400).json({ success: false, message: "OTP must be 6 digits" });
  }

  if (!pinPattern.test(pin)) {
    return res.status(400).json({ success: false, message: "PIN must be 4 digits" });
  }

  return res.status(200).json({
    success: true,
    message: `Login successful for phone ${phone} with OTP ${otp} and PIN ${pin}`,
  });
}