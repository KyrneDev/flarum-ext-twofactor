# Two Factor

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/issyrocks12/flarum-ext-twofactor/blob/master/LICENSE) [![Latest Stable Version](https://img.shields.io/packagist/v/issyrocks12/flarum-ext-twofactor.svg)](https://github.com/issyrocks12/flarum-ext-twofactor) [![Donate](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://paypal.me/CDK2020)

##### Please read the install guide!

A [Flarum](http://flarum.org) extension that increases security by adding TOTP two factor authentication

### Goals

- To increase forum security

### Usage

- As a user, go to your account settings page and follow the prompts to setup twofactor
- No admin options to configure

### Installation

This extension requires a bit more setup. These steps are optional but will greatly increase the security of this plugin.

First install it with composer:

```bash
composer require issyrocks12/flarum-ext-twofactor
```

Then login and enable the extension.

#### !!Make sure to undo this if you ever uninstall this extension!!

If you have Apache, add these lines right after the "RewriteEngine on"

```
  RewriteCond %{REQUEST_URI} ^/login
  RewriteRule ^(.*)$ - [F,L]
```

If you have Nginx add these lines to your server block:

```
  location ~ ^/login {
                deny all;
  }
```

Q: What does this do?
A: This extension uses a custom login handler and therefore a different url to send the login request to. If someone changes the url back to the default they could bypass the twof factor auth.
### To Do

- Requests?

### Issues

- None known


### Links

- [on github](https://github.com/issyrocks12/flarum-ext-twofactor)
- [on packagist](https://packagist.org/packages/issyrocks12/flarum-ext-twofactor)
- [issues](https://github.com/issyrocks12/flarum-ext-twofactor/issues)
