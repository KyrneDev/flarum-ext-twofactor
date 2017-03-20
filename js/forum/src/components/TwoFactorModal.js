import app from 'flarum/app';
import Alert from 'flarum/components/Alert';
import { extend } from 'flarum/extend';
import Modal from 'flarum/components/Modal';
import Model from 'flarum/Model';
import Switch from 'flarum/components/Switch';
import Button from 'flarum/components/Button';
import User from 'flarum/models/User';

import QRModal from 'issyrocks12/twofactor/components/QRModal';
import GetVars from 'issyrocks12/twofactor/components/GetVars';
import RecoveryModal from 'issyrocks12/twofactor/components/RecoveryModal';

export default class TwoFactorModal extends Modal {
	init() {
    super.init();
		this.model = new GetVars(app.session.user);
		
		const enabled = this.model.getEnabled();
		this.enabled = m.prop(enabled);
		  
		const url = this.model.getUrl();
    this.url = m.prop(url);
    
    const secret = this.model.getSecret();
    this.secret = m.prop(secret);
    
    const twoFactorCode = null;
    this.twoFactorCode = m.prop(twoFactorCode);
		
		
  }

  className() {
    return 'TwoFactorModal Modal--small';
  }

  title() {
    return app.translator.trans('issyrocks12-twofactor.forum.modal.twofactor_title');
  }

  content(user) {
    return (
      <div className="Modal-body">
        <div className="Form">
       {this.enabled() == 2 ? (
			 <div className="Form-group">
				<h2>{app.translator.trans('issyrocks12-twofactor.forum.modal.QRheading')}</h2>
            <div className="helpText">
              {app.translator.trans('issyrocks12-twofactor.forum.modal.help')}
            </div>
              <div className="TwoFactor-img">
                <img src={this.url()} />
                <h3>{this.secret()}</h3>
              </div>
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
        ) : ''}
				{this.enabled() != 2 ? (
          <div className="Form-group">
            <label>{app.translator.trans('issyrocks12-twofactor.forum.modal.heading')}</label>
            <div>
             	{Switch.component({
                state: this.enabled(),
                children: app.translator.trans('issyrocks12-twofactor.forum.modal.switch'),
								className: 'TwoFactor-switch',
                onchange: (value, user) => {
							   		app.request({
      					 		url: app.forum.attribute('apiUrl') + '/issyrocks12/twofactor/createcode',
      					 		method: 'POST',
     						 		data: {"enabled":value},
      							errorHandler: this.onerror.bind(this)
       				 })
							if (value == 1)
								{
							 window.alert(app.translator.trans('issyrocks12-twofactor.forum.reloadmsg'));
							 window.location.reload();
								} else {
									window.alert(app.translator.trans('issyrocks12-twofactor.forum.2fa_disabled'));
									window.location.reload();
								}
							 }
              })}
            </div>
          </div>
				  ) : ''}
        </div>
      </div>
    );
  }
	
    onsubmit(e) {
    e.preventDefault();

    if (this.loading) return;
    
    this.loading = true;
    
  app.request({
      url: app.forum.attribute('apiUrl') + '/issyrocks12/twofactor/createcode',
      method: 'POST',
      data: {"twofactor":this.twoFactorCode()},
      errorHandler: this.onerror.bind(this)
    }).then(this.success.bind(this));
  this.loading = false;
  
   }
  success(response) {
		app.alerts.show(this.successAlert = new Alert({
    type: 'success',
    children: app.translator.trans('issyrocks12-twofactor.forum.2fa_enabled')
    }));
		app.modal.show(new RecoveryModal());
  }
  onerror(error) {
    if (error.status === 500) {
      error.alert.props.children = app.translator.trans('issyrocks12-twofactor.forum.incorrect_2fa');
    }

    super.onerror(error);
  }
}