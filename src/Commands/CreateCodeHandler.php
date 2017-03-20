<?php 

namespace issyrocks12\twofactor\Commands;

use Flarum\Settings\SettingsRepositoryInterface;
use issyrocks12\twofactor\Exceptions\IncorrectTwoFactorException;
use issyrocks12\twofactor\TwoFactor;
use Zend\Diactoros\Response\JsonResponse;

class CreateCodeHandler
{
    
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    /**
     * @var TwoFactor
     */
    private $twoFactor;

    /**
     * @param TwoFactor $twoFactor
     * @param SettingsRepositoryInterface $settings
     */
    public function __construct(TwoFactor $twoFactor, SettingsRepositoryInterface $settings)
    {
        $this->twoFactor = $twoFactor;
        $this->settings = $settings;
    }
    
    /**  
     * @throws IncorrectTwoFactorException
     */
    public function handle(CreateCode $command)
    {
      if (isset($command->twofactor))
      {
        if ($this->twoFactor->verifyCode($command->actor, $command->twofactor) == true)
        {
          $this->twoFactor->enable2Factor($command->actor);		
        } else {
        throw new IncorrectTwoFactorException;
        }
      } elseif ($command->enabled == 1) {
       $this->twoFactor->prepare2Factor($command->actor);
      } elseif ($command->enabled == 0) {
       $this->twoFactor->disable2Factor($command->actor);
      }
    }
}