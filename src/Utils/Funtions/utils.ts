export const getFileTypeColor = (mimeType: string) => {
  switch (mimeType) {
    case "application/pdf":
      return "bg-[#F0463C]";
    case "application/txt":
      return "bg-[#454140]";
    default:
      return "bg-[#5991F8]";
  }
};

export const getFileTypeLabel = (mimeType: string) => {
  switch (mimeType) {
    case "application/pdf":
      return "pdf";
    case "application/txt":
      return "txt";
    default:
      return "docs";
  }
};

export const getMimeType = (filename: string) => {
    const extension = filename.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return "application/pdf";
      case "doc":
        return "application/msword";
      case "docx":
        return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      case "txt":
        return "text/plain";
      default:
        return "application/octet-stream";
    }
  };