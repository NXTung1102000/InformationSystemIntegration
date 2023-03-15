export interface IState {
  value: string;
  isError: boolean;
  message: string;
}

export const messageOfFieldIsNotEmpty = (name: string) => {
  return `${name} is not empty`;
};

export const handleChangeState = (state: IState, setState: (state: IState) => void, value: string, regex: RegExp) => {
  setState({ ...state, value: value, isError: !regex.test(value) });
};

export const validateState = (state: IState, setState: (state: IState) => void, regex: RegExp) => {
  setState({ ...state, isError: !regex.test(state.value) });
  return !regex.test(state.value);
};

export const messageOfPhoneNumber = "phone number in Vietnamese format, example: 09xxxxxxx  or  849xxxxxxxx";
export const messageOfEmail = "invalid Email";
export const messageOfPassword = "Password must be at least 6 characters and contain both letters and numbers";
export const messageOfConfirmPassword = "Password and ConfirmPassword must be the same";
export const messageOfPercentNumber = "Percent is between 1% and 100%";
export const messageOfPositiveNumber = "The value is greater than 0";
