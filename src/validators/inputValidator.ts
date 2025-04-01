export default class InputValidator {

  static checkInputData = (val : string, pattern : string | RegExp) => {
    if (pattern instanceof RegExp) {
      return new RegExp(pattern).test(val);
    }
    else {
      return (val == pattern);
    }
  }

}
