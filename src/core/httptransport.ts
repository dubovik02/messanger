import { METHODS } from '../constants/httpmethods';

export default class HTTPTransport {

  constructor() {
  }

  get = (url : string, options : { [key: string]: any } = {}) => {
    return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  };

  post = (url : string, options : { [key: string]: any } = {}) => {
    return this.request(url, {...options, method: METHODS.POST}, options.timeout);
  };

  put = (url : string, options : { [key: string]: any } = {}) => {
    return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
  };

  delete = (url : string, options : { [key: string]: any } = {}) => {
    return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
  };

  request = (url : string, options : { [key: string]: any } = {}, timeout = 5000) => {
    const {headers = {}, method, data} = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;
      const params = this.queryStringify(data);

      xhr.open(
        method,
        isGet && !!data
        ? `${url}${ params }`
        : url,
      );

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      xhr.withCredentials = true;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };

  queryStringify = (data : object) => {
    if (typeof data !== 'object') {
        return '';
      }

    let result = '?';
    Object.keys(data).forEach((item, index) => {
      result = result + ((!index) ? '' : '&' ) + `${item}` + '=' + encodeURIComponent(`${data[item as keyof object]}`);
    })
    return result;
  }

}
