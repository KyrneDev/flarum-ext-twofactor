<?php

namespace issyrocks12\twofactor\Commands;

use Flarum\Core\User;
use Psr\Http\Message\UploadedFileInterface;

class CreateCode
{
  
    public $actor;
  
    public $enabled;
  
    public $twofactor;
  
    public function __construct(User $actor, $enabled, $twofactor)
    {
        $this->actor = $actor;
        $this->enabled = $enabled;
        $this->twofactor = $twofactor;
    }
}