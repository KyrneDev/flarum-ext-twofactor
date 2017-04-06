<?php

namespace issyrocks12\twofactor\Listeners;

use Flarum\Api\Serializer\UserSerializer;
use Flarum\Event\ConfigureApiRoutes;
use Flarum\Event\PrepareApiAttributes;
use Illuminate\Contracts\Events\Dispatcher;
use issyrocks12\twofactor\Api\Controllers\CreateCodeController;
use issyrocks12\twofactor\Api\Controllers\LogInController;
use issyrocks12\twofactor\TwoFactor;

class AddApiAttributes
{
    /**
     * @var TwoFactor
     */
    private $twoFactor;

    /**
     * @param twofactor $twofactor
     */
    public function __construct(TwoFactor $twoFactor)
    {
        $this->TwoFactor = $twoFactor;
    }

    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureApiRoutes::class, [$this, 'configureApiRoutes']);
        $events->listen(PrepareApiAttributes::class, [$this, 'addAttributes']);
        $events->listen(ConfigureLocales::class, [$this, 'configLocales']);
    }

    /**
     * @param ConfigureApiRoutes $event
     */
    public function configureApiRoutes(ConfigureApiRoutes $event)
    {
        $event->post('/issyrocks12/twofactor/createcode', 'issyrocks12.twofactor.createcode', CreateCodeController::class);
        $event->post('/issyrocks12/twofactor/login', 'issyrocks12.twofactor.login', LogInController::class);
    }

     /**
      * @param PrepareApiAttributes $event
      */
     public function addAttributes(PrepareApiAttributes $event)
     {
         if ($event->isSerializer(UserSerializer::class)) {
             $codes = explode(',', $event->model->recovery_codes);
             $url = $this->TwoFactor->getURL($event->actor);
             $event->attributes['url'] = $url;
             $event->attributes['enabled'] = $event->model->twofa_enabled;
             $event->attributes['secret'] = chunk_split($event->model->google2fa_secret, 4, ' ');
             $event->attributes['recovery1'] = $codes[0];
             $event->attributes['recovery2'] = $codes[1];
             $event->attributes['recovery3'] = $codes[2];
         }
     }

    public function configLocales(ConfigureLocales $event)
    {
        foreach (new DirectoryIterator(__DIR__.'/../../locale') as $file) {
            if ($file->isFile() && in_array($file->getExtension(), ['yml', 'yaml'], false)) {
                $event->locales->addTranslations($file->getBasename('.'.$file->getExtension()), $file->getPathname());
            }
        }
    }
}
