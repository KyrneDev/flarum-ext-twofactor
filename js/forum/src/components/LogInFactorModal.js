import app from 'flarum/app';
import Alert from 'flarum/components/Alert';
import { extend } from 'flarum/extend';
import Modal from 'flarum/components/Modal';
import Model from 'flarum/Model';
import Switch from 'flarum/components/Switch';
import Button from 'flarum/components/Button';
import User from 'flarum/models/User';

import GetVars from 'issyrocks12/twofactor/components/GetVars';

export default class LogInFactorModal extends Modal {
	init() {
    super.init();
		this.identification = this.props.data.identification;
		
		this.password = this.props.data.password;
    
    this.remember = this.props.data.remember;
		
		this.twoFactorCode = m.prop('');
		
		
  }

  className() {
    return 'TwoFactorModal Modal--small';
  }

  title() {
    return app.translator.trans('issyrocks12-twofactor.forum.modal.login_title');
  }

  content(user) {
    return (
      <div className="Modal-body">
       {app.translator.trans('issyrocks12-twofactor.forum.modal.2fa_help')}
        <div className="Form">
			 <div className="Form-group">
          <div className="TwoFactor-input">
          	<input type="text"
          	oninput={m.withAttr('value', this.twoFactorCode)}
          	className="FormControl"
          	placeholder={app.translator.trans('issyrocks12-twofactor.forum.modal.placeholder')} />
          </div>
	            <Button className="Button Button--primary TwoFactor-button" loading={this.loading} type="submit">
              {app.translator.trans('issyrocks12-twofactor.forum.modal.button')}
            </Button>
          </div>
        </div>
      </div>
    );
  }
	
    onsubmit(e) {
    e.preventDefault();

    if (this.loading) return;
    
    this.loading = true;
		
    
  app.request({
      url: app.forum.attribute('apiUrl') + '/issyrocks12/twofactor/login',
      method: 'POST',
      data: {			  
				"identification": this.identification,
        "password": this.password,
        "remember": this.remember,
        "twofactor": this.twoFactorCode()},
      errorHandler: this.onerror.bind(this)
    }).then(
        () => window.location.reload(),
        this.loaded.bind(this)
      );
   }

  onerror(error) {
    if (error.status === 404) {
      error.alert.props.children = app.translator.trans('issyrocks12-twofactor.forum.incorrect_2fa');
			this.loading = false;
    }

    super.onerror(error);
  }
}