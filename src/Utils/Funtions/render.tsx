import Csv from "assets/documentType/csv";
import Defaulticon from "assets/documentType/defaulticon";
import Doc from "assets/documentType/doc";
import Jpg from "assets/documentType/jpg";
import Pdf from "assets/documentType/pdf";
import Png from "assets/documentType/png";
import Ppt from "assets/documentType/ppt";
import Xls from "assets/documentType/xls";
import Zip from "assets/documentType/zip";
import { Text } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const renderErrorMessageResponse = (
  responseString: string | string[]
) => {
  const regex = /^Groups \d+ are already associated with other projects$/;
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
  } else if (
    Array.isArray(responseString) &&
    responseString.every(
      (msg, index) =>
        [
          "property groups should not exist",
          "name must be longer than or equal to 3 characters",
          "each value in groupIds must be a number conforming to the specified constraints",
          "groupIds must be an array",
        ][index] === msg
    )
  ) {
    return "Tên dự án phải dài hơn hoặc bằng 3 ký tự";
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
      "password must be longer than or equal to 8 characters" in
        responseString) ||
    responseString === "password must be longer than or equal to 8 characters"
  ) {
    return "Mật khẩu phải tối thiểu 8 ký tự";
  } else if (
    (Array.isArray(responseString) &&
      "newPassword is not strong enough" in responseString) ||
    responseString === "newPassword is not strong enough"
  ) {
    return "Mật khẩu mới không đủ mạnh";
  } else if (responseString === "At least one group must be specified") {
    return "Hãy chọn ít nhất một nhóm để thêm vào dự án bạn nhé!";
  } else if (typeof responseString === "string" && regex.test(responseString)) {
    return "Một trong các nhóm được chọn đã được gán cho dự án khác!";
  } else if (
    responseString ===
    "You must be a leader in at least one of the specified groups"
  ) {
    return "Hãy tạo nhóm mới trước khi tạo dự án bạn nhé!";
  } else {
    return "Đã xảy ra lỗi, vui lòng thử lại!";
  }
};

export const renderSuccessMessageResponse = (
  responseString = "Tác vụ thành công 🔥🌸!"
) => {
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
  } else if (responseString === "Password reset successful") {
    return "Mật khẩu đã được thay đổi 🔥🌸";
  } else {
    return responseString;
  }
};

export const renderStatusLabel = (status: string) => {
  if (status === "COMPLETED") {
    return (
      <Text className="text-caption-bold font-medium text-neutral-500 bg-primary-100 px-2 py-1 rounded-full">
        Hoàn thành
      </Text>
    );
  } else if (status === "IN_PROGRESS") {
    return (
      <Text className="text-caption-bold font-medium text-neutral-500 bg-secondary-200 px-2 py-1 rounded-full">
        Đang thực hiện
      </Text>
    );
  } else {
    return (
      <Text className="text-caption-bold font-medium text-neutral-500 bg-warning-100 px-2 py-1 rounded-full">
        Mới
      </Text>
    );
  }
};

export const renderDocumentTypeIcon = (
  type: string,
  width: number = 40,
  height: number = 40
) => {
  if (type === "pdf") {
    return <Pdf width={width} height={height} />;
  } else if (type === "doc" || type === "docx") {
    return <Doc width={width} height={height} />;
  } else if (type === "xls" || type === "xlsx") {
    return <Xls width={width} height={height} />;
  } else if (type === "ppt" || type === "pptx") {
    return <Ppt width={width} height={height} />;
  } else if (type === "png") {
    return <Png width={width} height={height} />;
  } else if (type === "zip") {
    return <Zip width={width} height={height} />;
  } else if (type === "csv") {
    return <Csv width={width} height={height} />;
  } else if (type === "jpg") {
    return <Jpg width={width} height={height} />;
  } else {
    return <Defaulticon width={width} height={height} />;
  }
};

export const renderPriorityIcon = (priority: string) => {
  if (priority === "High") {
    return (
      <MaterialIcons name="keyboard-double-arrow-up" size={25} color="red" />
    );
  }
  if (priority === "Medium") {
    return <MaterialIcons name="keyboard-arrow-up" size={25} color="red" />;
  }
  if (priority === "Low") {
    return <MaterialIcons name="arrow-drop-up" size={25} color="green" />;
  }
};
