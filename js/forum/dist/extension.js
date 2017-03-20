'use strict';

System.register('issyrocks12/twofactor/components/GetVars', ['flarum/Model', 'flarum/models/User'], function (_export, _context) {
    "use strict";

    var Model, User, GetVars;
    return {
        setters: [function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumModelsUser) {
            User = _flarumModelsUser.default;
        }],
        execute: function () {
            GetVars = function () {
                function GetVars(userSession) {
                    babelHelpers.classCallCheck(this, GetVars);

                    User.prototype.enabled = Model.attribute('enabled');
                    User.prototype.url = Model.attribute('url');
                    User.prototype.secret = Model.attribute('secret');
                    User.prototype.recovery1 = Model.attribute('recovery1');
                    User.prototype.recovery2 = Model.attribute('recovery2');
                    User.prototype.recovery3 = Model.attribute('recovery3');
                    this._userdata = userSession;
                }

                babelHelpers.createClass(GetVars, [{
                    key: 'getEnabled',
                    value: function getEnabled() {
                        return this._userdata.attribute('enabled');
                    }
                }, {
                    key: 'getUrl',
                    value: function getUrl() {
                        return this._userdata.attribute('url');
                    }
                }, {
                    key: 'getSecret',
                    value: function getSecret() {
                        return this._userdata.attribute('secret');
                    }
                }, {
                    key: 'getRecovery1',
                    value: function getRecovery1() {
                        return this._userdata.attribute('recovery1');
                    }
                }, {
                    key: 'getRecovery2',
                    value: function getRecovery2() {
                        return this._userdata.attribute('recovery2');
                    }
                }, {
                    key: 'getRecovery3',
                    value: function getRecovery3() {
                        return this._userdata.attribute('recovery3');
                    }
                }]);
                return GetVars;
            }();

            _export('default', GetVars);
        }
    };
});;
'use strict';

System.register('issyrocks12/twofactor/components/LogInFactorModal', ['flarum/app', 'flarum/components/Alert', 'flarum/extend', 'flarum/components/Modal', 'flarum/Model', 'flarum/components/Switch', 'flarum/components/Button', 'flarum/models/User', 'issyrocks12/twofactor/components/GetVars'], function (_export, _context) {
  "use strict";

  var app, Alert, extend, Modal, Model, Switch, Button, User, GetVars, LogInFactorModal;
  return {
    setters: [function (_flarumApp) {
      app = _flarumApp.default;
    }, function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert.default;
    }, function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal.default;
    }, function (_flarumModel) {
      Model = _flarumModel.default;
    }, function (_flarumComponentsSwitch) {
      Switch = _flarumComponentsSwitch.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumModelsUser) {
      User = _flarumModelsUser.default;
    }, function (_issyrocks12TwofactorComponentsGetVars) {
      GetVars = _issyrocks12TwofactorComponentsGetVars.default;
    }],
    execute: function () {
      LogInFactorModal = function (_Modal) {
        babelHelpers.inherits(LogInFactorModal, _Modal);

        function LogInFactorModal() {
          babelHelpers.classCallCheck(this, LogInFactorModal);
          return babelHelpers.possibleConstructorReturn(this, (LogInFactorModal.__proto__ || Object.getPrototypeOf(LogInFactorModal)).apply(this, arguments));
        }

        babelHelpers.createClass(LogInFactorModal, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(LogInFactorModal.prototype.__proto__ || Object.getPrototypeOf(LogInFactorModal.prototype), 'init', this).call(this);
            this.identification = this.props.data.identification;

            this.password = this.props.data.password;

            this.remember = this.props.data.remember;

            this.twoFactorCode = m.prop('');
          }
        }, {
          key: 'className',
          value: function className() {
            return 'TwoFactorModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return app.translator.trans('issyrocks12-twofactor.forum.modal.login_title');
          }
        }, {
          key: 'content',
          value: function content(user) {
            return m(
              'div',
              { className: 'Modal-body' },
              app.translator.trans('issyrocks12-twofactor.forum.modal.2fa_help'),
              m(
                'div',
                { className: 'Form' },
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'div',
                    { className: 'TwoFactor-input' },
                    m('input', { type: 'text',
                      oninput: m.withAttr('value', this.twoFactorCode),
                      className: 'FormControl',
                      placeholder: app.translator.trans('issyrocks12-twofactor.forum.modal.placeholder') })
                  ),
                  m(
                    Button,
                    { className: 'Button Button--primary TwoFactor-button', loading: this.loading, type: 'submit' },
                    app.translator.trans('issyrocks12-twofactor.forum.modal.button')
                  )
                )
              )
            );
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
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
                "twofactor": this.twoFactorCode() },
              errorHandler: this.onerror.bind(this)
            }).then(function () {
              return window.location.reload();
            }, this.loaded.bind(this));
          }
        }, {
          key: 'onerror',
          value: function onerror(error) {
            if (error.status === 404) {
              error.alert.props.children = app.translator.trans('issyrocks12-twofactor.forum.incorrect_2fa');
              this.loading = false;
            }

            babelHelpers.get(LogInFactorModal.prototype.__proto__ || Object.getPrototypeOf(LogInFactorModal.prototype), 'onerror', this).call(this, error);
          }
        }]);
        return LogInFactorModal;
      }(Modal);

      _export('default', LogInFactorModal);
    }
  };
});;
'use strict';

System.register('issyrocks12/twofactor/components/RecoveryModal', ['flarum/app', 'flarum/components/Alert', 'flarum/extend', 'flarum/components/Modal', 'flarum/Model', 'flarum/components/Switch', 'flarum/components/Button', 'flarum/models/User', 'issyrocks12/twofactor/components/GetVars'], function (_export, _context) {
  "use strict";

  var app, Alert, extend, Modal, Model, Switch, Button, User, GetVars, RecoveryModal;
  return {
    setters: [function (_flarumApp) {
      app = _flarumApp.default;
    }, function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert.default;
    }, function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal.default;
    }, function (_flarumModel) {
      Model = _flarumModel.default;
    }, function (_flarumComponentsSwitch) {
      Switch = _flarumComponentsSwitch.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumModelsUser) {
      User = _flarumModelsUser.default;
    }, function (_issyrocks12TwofactorComponentsGetVars) {
      GetVars = _issyrocks12TwofactorComponentsGetVars.default;
    }],
    execute: function () {
      RecoveryModal = function (_Modal) {
        babelHelpers.inherits(RecoveryModal, _Modal);

        function RecoveryModal() {
          babelHelpers.classCallCheck(this, RecoveryModal);
          return babelHelpers.possibleConstructorReturn(this, (RecoveryModal.__proto__ || Object.getPrototypeOf(RecoveryModal)).apply(this, arguments));
        }

        babelHelpers.createClass(RecoveryModal, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(RecoveryModal.prototype.__proto__ || Object.getPrototypeOf(RecoveryModal.prototype), 'init', this).call(this);

            this.model = new GetVars(app.session.user);

            var recovery1 = this.model.getRecovery1();
            this.recovery1 = m.prop(recovery1);

            var recovery2 = this.model.getRecovery2();
            this.recovery2 = m.prop(recovery2);

            var recovery3 = this.model.getRecovery3();
            this.recovery3 = m.prop(recovery3);
          }
        }, {
          key: 'className',
          value: function className() {
            return 'TwoFactorModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return app.translator.trans('issyrocks12-twofactor.forum.modal.twofactor_title');
          }
        }, {
          key: 'content',
          value: function content(user) {
            return m(
              'div',
              { className: 'Modal-body' },
              m(
                'div',
                { className: 'Form' },
                m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'div',
                    { className: 'TwoFactor-codes' },
                    m(
                      'h3',
                      null,
                      app.translator.trans('issyrocks12-twofactor.forum.modal.recov_help1')
                    ),
                    m(
                      'h4',
                      null,
                      app.translator.trans('issyrocks12-twofactor.forum.modal.recov_help2')
                    ),
                    m('br', null),
                    m(
                      'h3',
                      null,
                      this.recovery1()
                    ),
                    m('br', null),
                    m(
                      'h3',
                      null,
                      this.recovery2()
                    ),
                    m('br', null),
                    m(
                      'h3',
                      null,
                      this.recovery3()
                    )
                  ),
                  m(
                    Button,
                    { className: 'Button Button--primary TwoFactor-button', loading: this.loading, type: 'submit' },
                    app.translator.trans('issyrocks12-twofactor.forum.modal.close')
                  )
                )
              )
            );
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            app.modal.close();
          }
        }]);
        return RecoveryModal;
      }(Modal);

      _export('default', RecoveryModal);
    }
  };
});;
'use strict';

System.register('issyrocks12/twofactor/components/TwoFactorModal', ['flarum/app', 'flarum/components/Alert', 'flarum/extend', 'flarum/components/Modal', 'flarum/Model', 'flarum/components/Switch', 'flarum/components/Button', 'flarum/models/User', 'issyrocks12/twofactor/components/QRModal', 'issyrocks12/twofactor/components/GetVars', 'issyrocks12/twofactor/components/RecoveryModal'], function (_export, _context) {
  "use strict";

  var app, Alert, extend, Modal, Model, Switch, Button, User, QRModal, GetVars, RecoveryModal, TwoFactorModal;
  return {
    setters: [function (_flarumApp) {
      app = _flarumApp.default;
    }, function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert.default;
    }, function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal.default;
    }, function (_flarumModel) {
      Model = _flarumModel.default;
    }, function (_flarumComponentsSwitch) {
      Switch = _flarumComponentsSwitch.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumModelsUser) {
      User = _flarumModelsUser.default;
    }, function (_issyrocks12TwofactorComponentsQRModal) {
      QRModal = _issyrocks12TwofactorComponentsQRModal.default;
    }, function (_issyrocks12TwofactorComponentsGetVars) {
      GetVars = _issyrocks12TwofactorComponentsGetVars.default;
    }, function (_issyrocks12TwofactorComponentsRecoveryModal) {
      RecoveryModal = _issyrocks12TwofactorComponentsRecoveryModal.default;
    }],
    execute: function () {
      TwoFactorModal = function (_Modal) {
        babelHelpers.inherits(TwoFactorModal, _Modal);

        function TwoFactorModal() {
          babelHelpers.classCallCheck(this, TwoFactorModal);
          return babelHelpers.possibleConstructorReturn(this, (TwoFactorModal.__proto__ || Object.getPrototypeOf(TwoFactorModal)).apply(this, arguments));
        }

        babelHelpers.createClass(TwoFactorModal, [{
          key: 'init',
          value: function init() {
            babelHelpers.get(TwoFactorModal.prototype.__proto__ || Object.getPrototypeOf(TwoFactorModal.prototype), 'init', this).call(this);
            this.model = new GetVars(app.session.user);

            var enabled = this.model.getEnabled();
            this.enabled = m.prop(enabled);

            var url = this.model.getUrl();
            this.url = m.prop(url);

            var secret = this.model.getSecret();
            this.secret = m.prop(secret);

            var twoFactorCode = null;
            this.twoFactorCode = m.prop(twoFactorCode);
          }
        }, {
          key: 'className',
          value: function className() {
            return 'TwoFactorModal Modal--small';
          }
        }, {
          key: 'title',
          value: function title() {
            return app.translator.trans('issyrocks12-twofactor.forum.modal.twofactor_title');
          }
        }, {
          key: 'content',
          value: function content(user) {
            var _this2 = this;

            return m(
              'div',
              { className: 'Modal-body' },
              m(
                'div',
                { className: 'Form' },
                this.enabled() == 2 ? m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'h2',
                    null,
                    app.translator.trans('issyrocks12-twofactor.forum.modal.QRheading')
                  ),
                  m(
                    'div',
                    { className: 'helpText' },
                    app.translator.trans('issyrocks12-twofactor.forum.modal.help')
                  ),
                  m(
                    'div',
                    { className: 'TwoFactor-img' },
                    m('img', { src: this.url() }),
                    m(
                      'h3',
                      null,
                      this.secret()
                    )
                  ),
                  m(
                    'div',
                    { className: 'TwoFactor-input' },
                    m('input', { type: 'text',
                      oninput: m.withAttr('value', this.twoFactorCode),
                      className: 'FormControl',
                      placeholder: app.translator.trans('issyrocks12-twofactor.forum.modal.placeholder') })
                  ),
                  m(
                    Button,
                    { className: 'Button Button--primary TwoFactor-button', loading: this.loading, type: 'submit' },
                    app.translator.trans('issyrocks12-twofactor.forum.modal.button')
                  )
                ) : '',
                this.enabled() != 2 ? m(
                  'div',
                  { className: 'Form-group' },
                  m(
                    'label',
                    null,
                    app.translator.trans('issyrocks12-twofactor.forum.modal.heading')
                  ),
                  m(
                    'div',
                    null,
                    Switch.component({
                      state: this.enabled(),
                      children: app.translator.trans('issyrocks12-twofactor.forum.modal.switch'),
                      className: 'TwoFactor-switch',
                      onchange: function onchange(value, user) {
                        app.request({
                          url: app.forum.attribute('apiUrl') + '/issyrocks12/twofactor/createcode',
                          method: 'POST',
                          data: { "enabled": value },
                          errorHandler: _this2.onerror.bind(_this2)
                        });
                        if (value == 1) {
                          window.alert(app.translator.trans('issyrocks12-twofactor.forum.reloadmsg'));
                          window.location.reload();
                        } else {
                          window.alert(app.translator.trans('issyrocks12-twofactor.forum.2fa_disabled'));
                          window.location.reload();
                        }
                      }
                    })
                  )
                ) : ''
              )
            );
          }
        }, {
          key: 'onsubmit',
          value: function onsubmit(e) {
            e.preventDefault();

            if (this.loading) return;

            this.loading = true;

            app.request({
              url: app.forum.attribute('apiUrl') + '/issyrocks12/twofactor/createcode',
              method: 'POST',
              data: { "twofactor": this.twoFactorCode() },
              errorHandler: this.onerror.bind(this)
            }).then(this.success.bind(this));
            this.loading = false;
          }
        }, {
          key: 'success',
          value: function success(response) {
            app.alerts.show(this.successAlert = new Alert({
              type: 'success',
              children: app.translator.trans('issyrocks12-twofactor.forum.2fa_enabled')
            }));
            app.modal.show(new RecoveryModal());
          }
        }, {
          key: 'onerror',
          value: function onerror(error) {
            if (error.status === 500) {
              error.alert.props.children = app.translator.trans('issyrocks12-twofactor.forum.incorrect_2fa');
            }

            babelHelpers.get(TwoFactorModal.prototype.__proto__ || Object.getPrototypeOf(TwoFactorModal.prototype), 'onerror', this).call(this, error);
          }
        }]);
        return TwoFactorModal;
      }(Modal);

      _export('default', TwoFactorModal);
    }
  };
});;
'use strict';

System.register('issyrocks12/twofactor/main', ['flarum/extend', 'flarum/app', 'flarum/components/Alert', 'flarum/components/Button', 'flarum/components/Badge', 'flarum/utils/extractText', 'flarum/components/ForgotPasswordModal', 'flarum/components/LogInButtons', 'issyrocks12/twofactor/components/LogInFactorModal', 'flarum/components/LogInModal', 'flarum/components/Modal', 'flarum/Model', 'flarum/components/SettingsPage', 'flarum/components/SignUpModal', 'flarum/components/Switch', 'issyrocks12/twofactor/components/TwoFactorModal', 'flarum/models/User', 'flarum/utils/UserControls'], function (_export, _context) {
  "use strict";

  var extend, app, Alert, Button, Badge, extractText, ForgotPasswordModal, LogInButtons, LogInFactorModal, LogInModal, Modal, Model, SettingsPage, SignUpModal, Switch, TwoFactorModal, User, UserControls;
  return {
    setters: [function (_flarumExtend) {
      extend = _flarumExtend.extend;
    }, function (_flarumApp) {
      app = _flarumApp.default;
    }, function (_flarumComponentsAlert) {
      Alert = _flarumComponentsAlert.default;
    }, function (_flarumComponentsButton) {
      Button = _flarumComponentsButton.default;
    }, function (_flarumComponentsBadge) {
      Badge = _flarumComponentsBadge.default;
    }, function (_flarumUtilsExtractText) {
      extractText = _flarumUtilsExtractText.default;
    }, function (_flarumComponentsForgotPasswordModal) {
      ForgotPasswordModal = _flarumComponentsForgotPasswordModal.default;
    }, function (_flarumComponentsLogInButtons) {
      LogInButtons = _flarumComponentsLogInButtons.default;
    }, function (_issyrocks12TwofactorComponentsLogInFactorModal) {
      LogInFactorModal = _issyrocks12TwofactorComponentsLogInFactorModal.default;
    }, function (_flarumComponentsLogInModal) {
      LogInModal = _flarumComponentsLogInModal.default;
    }, function (_flarumComponentsModal) {
      Modal = _flarumComponentsModal.default;
    }, function (_flarumModel) {
      Model = _flarumModel.default;
    }, function (_flarumComponentsSettingsPage) {
      SettingsPage = _flarumComponentsSettingsPage.default;
    }, function (_flarumComponentsSignUpModal) {
      SignUpModal = _flarumComponentsSignUpModal.default;
    }, function (_flarumComponentsSwitch) {
      Switch = _flarumComponentsSwitch.default;
    }, function (_issyrocks12TwofactorComponentsTwoFactorModal) {
      TwoFactorModal = _issyrocks12TwofactorComponentsTwoFactorModal.default;
    }, function (_flarumModelsUser) {
      User = _flarumModelsUser.default;
    }, function (_flarumUtilsUserControls) {
      UserControls = _flarumUtilsUserControls.default;
    }],
    execute: function () {

      app.initializers.add('issyrocks12-twofactor', function () {

        LogInModal.prototype.init = function () {

          this.identification = m.prop(this.props.identification || '');

          this.password = m.prop(this.props.password || '');

          this.remember = m.prop(this.props.remember && true);
        };
        LogInModal.prototype.content = function () {
          return [m(
            'div',
            { className: 'Modal-body' },
            m(LogInButtons, null),
            m(
              'div',
              { className: 'Form Form--centered' },
              m(
                'div',
                { className: 'Form-group' },
                m('input', { className: 'FormControl', name: 'identification', type: 'text', placeholder: extractText(app.translator.trans('core.forum.log_in.username_or_email_placeholder')),
                  bidi: this.identification,
                  disabled: this.loading })
              ),
              m(
                'div',
                { className: 'Form-group' },
                m('input', { className: 'FormControl', name: 'password', type: 'password', placeholder: extractText(app.translator.trans('core.forum.log_in.password_placeholder')),
                  bidi: this.password,
                  disabled: this.loading })
              ),
              m(
                'label',
                { className: 'checkbox' },
                m('input', { name: 'remember', type: 'checkbox', bidi: this.remember, disabled: this.loading }),
                app.translator.trans('issyrocks12-twofactor.forum.remember_me_label')
              ),
              m(
                'div',
                { className: 'Form-group' },
                Button.component({
                  className: 'Button Button--primary Button--block',
                  type: 'submit',
                  loading: this.loading,
                  children: app.translator.trans('core.forum.log_in.submit_button')
                })
              )
            )
          ), m(
            'div',
            { className: 'Modal-footer' },
            m(
              'p',
              { className: 'LogInModal-forgotPassword' },
              m(
                'a',
                { onclick: this.forgotPassword.bind(this) },
                app.translator.trans('core.forum.log_in.forgot_password_link')
              )
            ),
            app.forum.attribute('allowSignUp') ? m(
              'p',
              { className: 'LogInModal-signUp' },
              app.translator.trans('core.forum.log_in.sign_up_text', { a: m('a', { onclick: this.signUp.bind(this) }) })
            ) : ''
          )];
        };
        LogInModal.prototype.forgotPassword = function () {
          var email = this.identification();
          var props = email.indexOf('@') !== -1 ? { email: email } : undefined;

          app.modal.show(new ForgotPasswordModal(props));
        };

        LogInModal.prototype.signUp = function () {
          var props = { password: this.password() };
          var identification = this.identification();
          props[identification.indexOf('@') !== -1 ? 'email' : 'username'] = identification;

          app.modal.show(new SignUpModal(props));
        };

        LogInModal.prototype.onready = function () {
          this.$('[name=' + (this.identification() ? 'password' : 'identification') + ']').select();
        };

        LogInModal.prototype.onsubmit = function (e) {
          e.preventDefault();

          this.loading = true;

          var identification = this.identification();
          var password = this.password();
          var remember = this.remember();

          app.request({
            url: app.forum.attribute('apiUrl') + '/issyrocks12/twofactor/login',
            method: 'POST',
            data: { identification: identification, password: password, remember: remember },
            errorHandler: this.failure.bind(this)
          }).then(function () {
            return window.location.reload();
          }, this.loaded.bind(this));
        };
        LogInModal.prototype.failure = function (response, identification, password, remember) {
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
            };
            app.modal.show(new LogInFactorModal({ data: data }));
          }
        };

        extend(SettingsPage.prototype, 'accountItems', function (items, user) {
          items.add('2 Factor', Button.component({
            className: "Button",
            onclick: function onclick() {
              app.modal.show(new TwoFactorModal({ user: user }));
            } }, [app.translator.trans('issyrocks12-twofactor.forum.accountlabel')]), 1);
        });
      });
    }
  };
});