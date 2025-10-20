import api from "./api";

export const uploadDocuments = async (files) => {
  const formData = new FormData();
  for (const file of files) formData.append("files", file);
  const res = await api.post("/documents/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};
