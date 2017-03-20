<?php

namespace issyrocks12\twofactor;

use PragmaRX\Google2FA\Google2FA;
use Flarum\Core\User;
use Flarum\Settings\SettingsRepositoryInterface;

class TwoFactor
{ 
  /**
   * @var SettingsRepositoryInterface
   */
  protected $settings;
  
  /**
   * @var Google2FA
   */
  protected $google2fa;
  
  /**
   * @param SettingsRepositoryInterface $settings
   * @param Google2FA $google2fa
   */
  public function __construct(SettingsRepositoryInterface $settings, Google2FA $google2fa)
    {
        $this->settings = $settings;
        $this->google2fa = $google2fa;
    }
  
  public function prepare2Factor($user) 
  {
    $user->twofa_enabled = 2;
    $user->google2fa_secret = $this->google2fa->generateSecretKey(16);
    $user->recovery_codes = $this->generateRecovery() . ',' . $this->generateRecovery() . ',' . $this->generateRecovery();
    $user->save();
  }
  
  public function enable2Factor($user) 
  {
    $user->twofa_enabled = 1;
    $user->save();
  }
  
  public function disable2Factor($user) 
  {
    $user->google2fa_secret = '';
    $user->twofa_enabled = 0;
    $user->recovery_codes = null;
    $user->save();
  }
  
  public function getURL($user)
  {
    return $this->google2fa->getQRCodeGoogleUrl(
    urlencode($this->settings->get('forum_title')),
    $user->username,
    $user->google2fa_secret
    );
  }
  
  public function generateRecovery()
  {
    $chars = array(
        '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
        'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        );
    for ($rand = 0; $rand <=6 ; $rand++) {
        $random = rand(0, count($chars) - 1);
        if ($rand == 3) {
          $randstr .= "-";
        } else {
        $randstr .= $chars[$random];
        }
    }
    return $randstr;
  }
  
  public function doRecovery($code, $user)
  {
    $code = strtoupper($code);
    $codes = explode(',', $user->recovery_codes);
    if (in_array($code, $codes))
    {
      if (($key = array_search($code, $codes)) !== false) {
         unset($codes[$key]);
      }
      $user->recovery_codes = implode(',', $codes);
      $user->save();
      return true;
    } else {
      return false;
    }
  }
  
  public function verifyCode($user, $input)
  {
    return $this->google2fa->verifyKey($user->google2fa_secret, $input);
  }
}