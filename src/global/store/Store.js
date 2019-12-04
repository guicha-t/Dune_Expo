import { observable, action } from 'mobx';

class Store {
  @observable Token = null;
  @observable IsLog = false;
  @observable TypeUser = false;
  @observable AppId = false;
  @observable Flog = '0';

  @observable DarkEnable = false;

  @observable Back = "#fff";

  @observable Text1 = "#161616";
  @observable Text2 = "#2A5E85";



  BWhite = "#FFF";
  BBlue = "#2A5E85";
  BRose = "#f6c6d2";
  BBlack = "#161616";

  TWhite = "#FFF";
  TBlue = "#2A5E85";
  TRose = "#f6c6d2";
  TBlack = "#161616";

  BShadow = "#31343f";


  @action EnableDarkTheme(param) {
    this.DarkEnable = param;

    if (param == true) {
      this.Back = this.BShadow;
      this.Text1 = this.TWhite;
      this.Text2 = this.TWhite;
    } else if (param == false) {
      this.Back = this.BWhite;
      this.Text1 = this.TBlack;
      this.Text2 = this.TBlue;
    }
  }

  @action setFirstLog(param){
    this.Flog = param;
  }

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
