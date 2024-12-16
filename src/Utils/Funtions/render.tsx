export const renderErrorMessageResponse = (
  responseString: string | string[]
) => {
  if (
    (Array.isArray(responseString) &&
      "name must be longer than or equal to 2 characters" in responseString) ||
    responseString === "name must be longer than or equal to 2 characters"
  ) {
    return "Tên phải dài hơn hoặc bằng 2 ký tự";
  } else if (responseString === "Email already exists") {
    return "Email đã tồn tại";
  } else if (responseString === "email must be an email") {
    return "Email không hợp lệ";
  } else if (responseString === "password is not strong enough") {
    return "Mật khẩu không đủ mạnh";
  } else if (responseString === "Invalid verification code") {
    return "Mã xác thực không tồn tại";
  } else if (
    Array.isArray(responseString) &&
    responseString.every(
      (msg, index) =>
        [
          "property code should not exist",
          "name must be shorter than or equal to 50 characters",
          "name must be longer than or equal to 2 characters",
          "name must be a string",
          "password is not strong enough",
        ][index] === msg
    )
  ) {
    return "Mã xác thực không tồn tại";
  } else if (responseString === "Email already verified") {
    return "Email đã được xác thực. Vui lòng đăng nhập~ ";
  } else if (responseString === "User not found") {
    return "Người dùng hoặc email không tồn tại! Hãy kiểm tra lại~";
  } else if (responseString === "Unauthorized") {
    return "Truy cập không hợp lệ. Vui lòng kiểm tra lại thông tin đăng nhập và thử lại ~";
  } else if (responseString === "Invalid reset attempt") {
    return "Dường như đã có lỗi xảy ra, vui lòng thử lại~";
  } else if (responseString === "Invalid or expired reset code") {
    return "Mã xác thực đã hết hạn hoặc không tồn tại ~ Vui lòng thử lại.";
  } else if (responseString === "newPassword is not strong enough") {
    return "Mật khẩu mới không đủ mạnh. Hãy nhập mật khẩu khác~";
  } else if (responseString === "Password is incorrect") {
    return "Nhập sai mật khẩu hiện tại";
  } else if (
    (Array.isArray(responseString) &&
      "password must be longer than or equal to 8 characters" in responseString) ||
    responseString === "password must be longer than or equal to 8 characters"
  ) {
    return "Mật khẩu phải tối thiểu 8 ký tự";
  } else if (
    (Array.isArray(responseString) &&
      "newPassword is not strong enough" in responseString) ||
    responseString === "newPassword is not strong enough"
  ) {
    return "Mật khẩu mới không đủ mạnh";
  } else {
    return "Đã xảy ra lỗi, vui lòng thử lại!";
  }
};

export const renderSuccessMessageResponse = (responseString = "Tác vụ thành công 🔥🌸!") => {
  if (
    responseString ===
    "User registered successfully. Please check your email for verification code."
  ) {
    return "Đăng ký thành công! Kiểm tra email của bạn nhé 🔥🌸";
  } else if (responseString === "Email verified successfully") {
    return "Email xác thực thành công 🔥🌸!";
  } else if (responseString === "Verification code sent successfully 🔥🌸") {
    return "Chúng tôi đã gửi lại mã xác thực email. Hãy kiểm tra bạn nhé 🔥🌸";
  } else if (
    responseString ===
    "If your email is registered, you will receive a password reset code."
  ) {
    return "Nếu không nhận được mã xác thực, hãy kiểm tra email đã nhập!";
  }
  else if (responseString === "Password reset successful")
  {
    return "Mật khẩu đã được thay đổi 🔥🌸"
  }
  
  else {
    return responseString;
  }
};
