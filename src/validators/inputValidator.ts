export default class InputValidator {

  static checkInputData = (val : string, pattern : string | RegExp) => {
    const result = new RegExp(pattern).test(val);
    return result;
  }

}
