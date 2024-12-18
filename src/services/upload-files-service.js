import http from "../http-common";

class UploadFilesService {
  
    upload(id, file, onUploadProgress) {
    let user = JSON.parse(localStorage.getItem('user'));
    let formData = new FormData();
    formData.append("file", file);
    return http.post("/uploads/products/copy/" + id, formData, {
      headers: {
        "Authorization": 'Bearer ' + user.token,
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress
    });
  }
  
  getFiles(id) {
    return http.get("/load/" + id);
  }
}
export default new UploadFilesService();