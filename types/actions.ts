export type ServerActionErrors<T> = {
  [k in keyof T]?: { _errors: string[] };
};

export type ServerActionResponse<T> =
  | {
      success: true;
      message: string;
    }
  | {
      success: false;
      errors: ServerActionErrors<T>;
    };
