import { extend } from 'flarum/extend';
import app from 'flarum/app';
import Alert from "flarum/components/Alert";
import Button from 'flarum/components/Button';
import Badge from 'flarum/components/Badge';
import extractText from 'flarum/utils/extractText';
import ForgotPasswordModal from 'flarum/components/ForgotPasswordModal';
import LogInButtons from 'flarum/components/LogInButtons';
import LogInFactorModal from 'issyrocks12/twofactor/components/LogInFactorModal';
import LogInModal from 'flarum/components/LogInModal';
import Modal from 'flarum/components/Modal';
import Model from 'flarum/Model';
import SettingsPage from 'flarum/components/SettingsPage';
import SignUpModal from 'flarum/components/SignUpModal';
import Switch from 'flarum/components/Switch';
import TwoFactorModal from 'issyrocks12/twofactor/components/TwoFactorModal';
import User from 'flarum/models/User';
import UserControls from 'flarum/utils/UserControls';

app.initializers.add('issyrocks12-twofactor', () => {
  
  
  
  LogInModal.prototype.init = function() {

    this.identification = m.prop(this.props.identification || '');

    this.password = m.prop(this.props.password || '');

    this.remember = m.prop(this.props.remember && true);
  }
  LogInModal.prototype.content = function() {
    return [
      <div className="Modal-body">
        <LogInButtons/>

        <div className="Form Form--centered">
          <div className="Form-group">
            <input className="FormControl" name="identification" type="text" placeholder={extractText(app.translator.trans('core.forum.log_in.username_or_email_placeholder'))}
              bidi={this.identification}
              disabled={this.loading} />
          </div>

          <div className="Form-group">
            <input className="FormControl" name="password" type="password" placeholder={extractText(app.translator.trans('core.forum.log_in.password_placeholder'))}
              bidi={this.password}
              disabled={this.loading} />
          </div>

          <label className="checkbox">
            <input name="remember" type="checkbox" bidi={this.remember} disabled={this.loading} />
            {app.translator.trans('issyrocks12-twofactor.forum.remember_me_label')}
          </label>

          <div className="Form-group">
            {Button.component({
              className: 'Button Button--primary Button--block',
              type: 'submit',
              loading: this.loading,
              children: app.translator.trans('core.forum.log_in.submit_button')
            })}
          </div>
        </div>
      </div>,
      <div className="Modal-footer">
        <p className="LogInModal-forgotPassword">
          <a onclick={this.forgotPassword.bind(this)}>{app.translator.trans('core.forum.log_in.forgot_password_link')}</a>
        </p>

        {app.forum.attribute('allowSignUp') ? (
          <p className="LogInModal-signUp">
            {app.translator.trans('core.forum.log_in.sign_up_text', {a: <a onclick={this.signUp.bind(this)}/>})}
          </p>
        ) : ''}
      </div>
    ];
  }
  LogInModal.prototype.forgotPassword = function() {
    const email = this.identification();
    const props = email.indexOf('@') !== -1 ? {email} : undefined;

    app.modal.show(new ForgotPasswordModal(props));
  }
  
  LogInModal.prototype.signUp = function() {
    const props = {password: this.password()};
    const identification = this.identification();
    props[identification.indexOf('@') !== -1 ? 'email' : 'username'] = identification;

    app.modal.show(new SignUpModal(props));
  }
  
  LogInModal.prototype.onready = function() {
    this.$('[name=' + (this.identification() ? 'password' : 'identification') + ']').select();
  }
  
  LogInModal.prototype.onsubmit = function(e) {
    e.preventDefault();

    this.loading = true;

    const identification = this.identification();
    const password = this.password();
    const remember = this.remember();

    app.request({
      url: app.forum.attribute('apiUrl') + '/issyrocks12/twofactor/login',
      method: 'POST',
      data: {identification, password, remember},
      errorHandler: this.failure.bind(this)
    }).then(
        () => window.location.reload(),
        this.loaded.bind(this)
      );
  };
LogInModal.prototype.failure = function(response, identification, password, remember) {
  if (response.status == 401) {
     app.alerts.show(this.successAlert = new Alert({
      type: 'error',
      children: app.translator.trans('core.forum.log_in.invalid_login_message')
       }));
    this.loading = false;
  }
    if (response.status == 404) {
      var data = {
        identification: this.identification(),
        password: this.password(),
        remember: this.remember()
      }
      app.modal.show(new LogInFactorModal({data}));
    }
}
  
  
extend(SettingsPage.prototype, 'accountItems', (items, user) => {
  items.add('2 Factor',
      Button.component({
        className: "Button", 
        onclick: () => {app.modal.show(new TwoFactorModal({user}))}}, 
        [app.translator.trans('issyrocks12-twofactor.forum.accountlabel')])
    ,1);
  }
);
})