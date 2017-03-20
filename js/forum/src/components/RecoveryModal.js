import app from 'flarum/app';
import Alert from 'flarum/components/Alert';
import { extend } from 'flarum/extend';
import Modal from 'flarum/components/Modal';
import Model from 'flarum/Model';
import Switch from 'flarum/components/Switch';
import Button from 'flarum/components/Button';
import User from 'flarum/models/User';

import GetVars from 'issyrocks12/twofactor/components/GetVars';

export default class RecoveryModal extends Modal {
	init() {
    super.init();
    
    this.model = new GetVars(app.session.user)
    
		const recovery1 = this.model.getRecovery1();
    this.recovery1 = m.prop(recovery1);
    
    const recovery2 = this.model.getRecovery2();
    this.recovery2 = m.prop(recovery2);
    
    const recovery3 = this.model.getRecovery3();
    this.recovery3 = m.prop(recovery3);
		
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
			 <div className="Form-group">
         <div className="TwoFactor-codes">
           <h3>{app.translator.trans('issyrocks12-twofactor.forum.modal.recov_help1')}</h3>
           <h4>{app.translator.trans('issyrocks12-twofactor.forum.modal.recov_help2')}</h4>
           <br />
           <h3>{this.recovery1()}</h3>
           <br />
           <h3>{this.recovery2()}</h3>
           <br />
           <h3>{this.recovery3()}</h3>
          </div>
         <Button className="Button Button--primary TwoFactor-button" loading={this.loading} type="submit">
              {app.translator.trans('issyrocks12-twofactor.forum.modal.close')}
         </Button>
          </div>
        </div>
      </div>
    );
  }
	
    onsubmit(e) {
    app.modal.close();
    }
}