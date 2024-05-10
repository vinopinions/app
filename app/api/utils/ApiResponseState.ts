type ApiResponseState<T> =
  | {
      status: 'idle' | 'loading' | 'succeeded';
      data: T;
    }
  | {
      status: 'failed';
      data: T;
      error: string;
    };

export default ApiResponseState;
