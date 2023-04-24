import * as yup from "yup";

const EMAIL_VALIDATION_MESSAGE = {
  required: "이메일을 입력해주세요.",
  notMatched: "이메일 주소를 다시 확인해주세요.",
};

const PASSWORD_VALIDATION_MESSAGE = {
  requied: "비밀번호를 입력해주세요.",
  notMatched: "비밀번호는 영문자, 숫자, 특수문자 조합을 입력해야 합니다.",
  notConfirmed: "비밀번호를 다시 확인해주세요.",
};

const NICKNAME_VALIDATION_MESSAGE = {
  require: "닉네임을 입력해주세요.",
  notMatched: "사용할 수 없는 닉네임입니다.",
  existed: "이미 사용중인 닉네임입니다.",
};

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*d)(?=.*[$@$!%*#?&])[A-Za-zd$@$!%*#?&]{8,}$/;

// const nicknameRegex = /^/;

export const schema = yup.object({
  email: yup
    .string()
    .email(EMAIL_VALIDATION_MESSAGE.notMatched)
    .required(EMAIL_VALIDATION_MESSAGE.required),
  password: yup
    .string()
    .required(PASSWORD_VALIDATION_MESSAGE.requied)
    .matches(passwordRegex, PASSWORD_VALIDATION_MESSAGE.notMatched),
  passwordConfirmation: yup
    .string()
    .required(PASSWORD_VALIDATION_MESSAGE.requied)
    .oneOf([yup.ref("password")], PASSWORD_VALIDATION_MESSAGE.notConfirmed),
  nickname: yup.string().required(NICKNAME_VALIDATION_MESSAGE.require),
  // .matches(nicknameRegex, NICKNAME_VALIDATION_MESSAGE.notMatched),
});
