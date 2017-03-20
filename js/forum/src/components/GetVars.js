import Model from 'flarum/Model';
import User from 'flarum/models/User';

export default class GetVars {
    constructor(userSession) {
        User.prototype.enabled = Model.attribute('enabled');
        User.prototype.url = Model.attribute('url');
        User.prototype.secret = Model.attribute('secret');
        User.prototype.recovery1 = Model.attribute('recovery1');
        User.prototype.recovery2 = Model.attribute('recovery2');
        User.prototype.recovery3 = Model.attribute('recovery3');
        this._userdata = userSession;
    }

    getEnabled() {
        return this._userdata.attribute('enabled');
    }
    getUrl() {
        return this._userdata.attribute('url');
    }
    getSecret() {
        return this._userdata.attribute('secret');
    }
    getRecovery1() {
        return this._userdata.attribute('recovery1');
    }
    getRecovery2() {
        return this._userdata.attribute('recovery2');
    }
    getRecovery3() {
        return this._userdata.attribute('recovery3');
    }
}