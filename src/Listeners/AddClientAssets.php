<?php

namespace issyrocks12\twofactor\Listeners;

use DirectoryIterator;
use Flarum\Event\ConfigureWebApp;
use Flarum\Event\ConfigureLocales;
use Illuminate\Contracts\Events\Dispatcher;

class AddClientAssets
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureWebApp::class, [$this, 'addAssets']);
        $events->listen(ConfigureLocales::class, [$this, 'configLocales']);
    }
    /**
     * @param ConfigureClientView $event
     */
    public function addAssets(ConfigureWebApp $event)
    {
        if ($event->isForum()) {
            $event->addAssets([
                __DIR__.'/../../js/forum/dist/extension.js',
                __DIR__.'/../../less/forums/TwoFactor.less'
            ]);
            $event->addBootstrapper('issyrocks12/twofactor/main');
        }
    }
   public function configLocales(ConfigureLocales $event)
    {
        foreach (new DirectoryIterator(__DIR__ .'/../../locale') as $file) {
            if ($file->isFile() && in_array($file->getExtension(), ['yml', 'yaml'], false)) {
                $event->locales->addTranslations($file->getBasename('.' . $file->getExtension()), $file->getPathname());
            }
        }
    }
}
