import { observable, action } from 'mobx';

class Store {
  @observable Token = null;
  @observable IsLog = false;
  @observable TypeUser = false;
  @observable AppId = false;

  @action setToken(param) {
    this.Token = param;
  }

  @action setIsLog(param) {
    this.IsLog = param;
  }

  @action setTypeUser(param) {
    this.TypeUser = param;
  }

  @action setAppId(param) {
    this.AppId = param;
  }
}

const singleton = new Store();
export default singleton;
