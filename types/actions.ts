export type ServerActionErrors<T> = {
  [k in keyof T]?: { _errors: string[] };
};

export type ServerActionResponse<InputT, ResultT> =
  | {
      success: true;
      result: ResultT;
    }
  | {
      success: false;
      errors?: ServerActionErrors<InputT>;
      error: string;
    };
