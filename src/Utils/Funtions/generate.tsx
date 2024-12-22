export const generatePastelColor = () => {
  const r = Math.floor(Math.random() * 127 + 127);
  const g = Math.floor(Math.random() * 127 + 127);
  const b = Math.floor(Math.random() * 127 + 127);
  return `rgba(${r}, ${g}, ${b}, 0.4)`;
};
export const generateDate = (date: string) => {
  const dateObj = date.split("-");
  return `${dateObj[2]}/${dateObj[1]}/${dateObj[0]}`;
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
}