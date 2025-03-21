export type Note = {
    id: string;
    title: string;
    content: string;
    createdTime: string;
  };

  interface FieldError {
    type: string;
    message: string;
  }