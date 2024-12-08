export interface responseData {
    status: "success" | "error";
    error: string | null;
    data: {
      code:  string;
      userPublicKey: string;
      username: string
    };
  }