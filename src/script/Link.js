export default class Link {
  constructor(name, path, options) {
    this.name = name !== undefined ? name : "Link";
    this.path = path !== undefined ? path : "/";
    this.options = options;
  }
}
