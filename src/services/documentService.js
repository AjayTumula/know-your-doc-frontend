import api from "./api"; // This should be your axios instance

export const documentService = {
  async uploadDocuments(files) {
    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }

    const response = await api.post("/documents/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  async getDocuments() {
    const response = await api.get("/documents");
    return response.data;
  },

  async deleteDocument(docId) {
    const response = await api.delete(`/documents/${docId}`);
    return response.data;
  },
};
