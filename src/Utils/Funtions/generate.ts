export const generatePastelColor = () => {
  const r = Math.floor(Math.random() * 127 + 127);
  const g = Math.floor(Math.random() * 127 + 127);
  const b = Math.floor(Math.random() * 127 + 127);
  return `rgba(${r}, ${g}, ${b}, 0.4)`;
};
export const generateDate = (date: string) => {
  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
};
export const generateDateTime = (date: string) => {
  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export const generateTime = (date: string) => {
  const dateObj = new Date(date);
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}
export const generateStatusText = (status: string) => {
  switch (status) {
    case "NOT_STARTED":
      return "Mới";
    case "IN_PROGRESS":
      return "Đang thực hiện";
    case "COMPLETED":
      return "Đã hoàn thành";
    default:
      return "Không xác định";
  }
};
