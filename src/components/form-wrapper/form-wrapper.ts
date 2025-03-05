import Block from "../../core/block";
import { FormProps } from "../../types/formProps";
import InputValidator from "../../validators/inputValidator";
import ErrMessages from "../../constants/errmessages";
import RegExpression from "../../constants/regexp";

export default class FormWrapper extends Block {

  constructor(props: FormProps, childrens: Record<string, Block | Block[]>) {

    super(
      'form',
      props,
      childrens
    );
  }

  checkInputValidity(property : string, block : Block | HTMLInputElement, pattern : string | RegExp, errBlock : Block, errMsg : string) {
    let val = '';
    if (block instanceof HTMLInputElement) {
      val = block.value;
    }
    else {
      val = (block.element as HTMLInputElement).value;
    }
    const result = InputValidator.checkInputData(val, pattern);
    this.setProps({
      formState: {
          ...(this.getProperties() as FormProps).formState,
          [property]: val
      }
    });
    if (!result) {
      errBlock.setProps( {labelText : errMsg});
      this.setProps({
        ...this.getProperties(),
        error: errMsg,
      });
    }
    else {
      errBlock.setProps( {labelText : ''});
      this.setProps({
        ...this.getProperties(),
        error: ''
      });
    }
    return result;
  }

  checkValidityBeforeSubmit() {
    return true;
  }

  checkLoginInput(elem : HTMLInputElement | undefined = undefined) {
    return this.checkInputValidity(
      'login',
      elem instanceof HTMLInputElement ? elem : this.getChildrens()['inputLogin'] as Block,
      RegExpression.login,
      this.getChildrens()['errorLabelLogin'] as Block,
      ErrMessages.LOGIN_ERR
    );
  }

  checkPasswordInput(elem : HTMLInputElement | undefined = undefined) {
    return this.checkInputValidity(
      'password',
      elem instanceof HTMLInputElement ? elem : this.getChildrens()['inputPass'] as Block,
      RegExpression.password,
      this.getChildrens()['errorLabelPass'] as Block,
      ErrMessages.PASSWORD_ERR
    );
  }

  checkOldPasswordInput(elem : HTMLInputElement | undefined = undefined) {
    return this.checkInputValidity(
      'oldPassword',
      elem instanceof HTMLInputElement ? elem : this.getChildrens()['inputOldPass'] as Block,
      RegExpression.password,
      this.getChildrens()['errorLabelOldPass'] as Block,
      ErrMessages.PASSWORD_ERR
    );
  }

  checkNewPasswordInput(elem : HTMLInputElement | undefined = undefined) {
    return this.checkInputValidity(
      'newPassword',
      elem instanceof HTMLInputElement ? elem : this.getChildrens()['inputOldPass'] as Block,
      RegExpression.password,
      this.getChildrens()['errorLabelNewPass'] as Block,
      ErrMessages.PASSWORD_ERR
    );
  }

  checkEmailInput(elem : HTMLInputElement | undefined = undefined) {
    return this.checkInputValidity(
      'email',
      elem instanceof HTMLInputElement ? elem : this.getChildrens()['inputEmail'] as Block,
      RegExpression.email,
      this.getChildrens()['errorLabelEmail'] as Block,
      ErrMessages.EMAIL_ERR
    );
  }

  checkFirstNameInput(elem : HTMLInputElement | undefined = undefined) {
    return this.checkInputValidity(
      'first_name',
      elem instanceof HTMLInputElement ? elem : this.getChildrens()['inputFirstName'] as Block,
      RegExpression.first_name,
      this.getChildrens()['errorLabelFirstName'] as Block,
      ErrMessages.FIRST_SECOND_NAME_ERR
    );
  };

  checkSecondNameInput(elem : HTMLInputElement | undefined = undefined) {
    return this.checkInputValidity(
      'second_name',
      elem instanceof HTMLInputElement ? elem : this.getChildrens()['inputSecondName'] as Block,
      RegExpression.second_name,
      this.getChildrens()['errorLabelSecondName'] as Block,
      ErrMessages.FIRST_SECOND_NAME_ERR
    );
  };

  checkPhoneInput(elem : HTMLInputElement | undefined = undefined) {
    return this.checkInputValidity(
      'phone',
      elem instanceof HTMLInputElement ? elem : this.getChildrens()['inputPhone'] as Block,
      RegExpression.phone,
      this.getChildrens()['errorLabelPhone'] as Block,
      ErrMessages.PHONE_ERR
    );
  };

  checkMessage(elem : HTMLInputElement | undefined = undefined) {

    const el = elem instanceof HTMLInputElement ? elem : this.getChildrens()['messageInput'] as Block;
    let val = '';
    if (el instanceof HTMLInputElement) {
      val = el.value;
    }
    else {
      val = (el.element as HTMLInputElement).value;
    }
    this.setProps({
      formState: {
          ...(this.getProperties() as FormProps).formState,
          message: val
      }
    });
    return InputValidator.checkInputData(val, RegExpression.message);

  }
}
