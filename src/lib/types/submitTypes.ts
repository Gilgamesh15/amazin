export type SignInStateType = {
  errors: {
    email?: string[];
    password?: string[];
    name?: string[];
  };
  message: string | undefined;
};

export type SignUpStateType = {
  errors: {
    email?: string[];
    password?: string[];
    name?: string[];
  };
  message: string | undefined;
};

export type ContactStateType = {
  errors: {
    name?: string[];
    email?: string[];
    phone?: string[];
    body?: string[];
  };
  message: string | undefined;
};

export type ProductStateType = {
  errors: {
    quantity?: string[];
    variants?: string[];
  };
  message: string | undefined;
};
