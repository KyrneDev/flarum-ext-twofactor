<?php

namespace issyrocks12\twofactor\Api\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;

class CreateCodeSerializer extends AbstractSerializer
{
    protected $type = 'user';

    protected function getDefaultAttributes($user)
    {
        return [
            'enabled'            => (bool) $user->enabled,
        ];
    }
}
