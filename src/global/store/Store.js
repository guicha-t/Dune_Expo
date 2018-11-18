import { observable, action } from 'mobx';

class Store {
  @observable Token = null;
  @observable IdUser = null;
  @observable IsLog = false;
  @observable TypeUser = false;

  @action setToken(param) {
    this.Token = param;
  }

  @action setIdUser(param) {
    this.IdUser = param;
  }

  @action setIsLog(param) {
    this.IsLog = param;
  }

  @action setTypeUser(param) {
    this.TypeUser = param;
  }
}

const singleton = new Store();
export default singleton;
