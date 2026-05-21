class ApiResponse {
  constructor(statusCode, message, data) {
    ((this.statusCode = statusCode || 200),
      (this.message = message),
      (this.data = data),
      (this.success = statusCode < 400));
  }
}

export default ApiResponse;
