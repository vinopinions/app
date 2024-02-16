type ApiResponseState<T> =
  | {
      status: 'idle' | 'loading' | 'succeeded';
      data: T;
    }
  | {
      status: 'failed';
      error: string;
    };

export default ApiResponseState;
