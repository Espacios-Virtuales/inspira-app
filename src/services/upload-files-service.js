import http from "@/utils/http-common";
import authHeader from "@/services/auth-header";

class UploadFilesService {
  upload(productId, file, onUploadProgress) {
    const formData = new FormData();
    formData.append("file", file);

    return http.post(`/uploads/products/${productId}`, formData, {
      headers: {
        ...authHeader(),
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles(productId) {
    return http.get(`/uploads/products/${productId}`, { headers: authHeader() });
  }
}

export default new UploadFilesService();
