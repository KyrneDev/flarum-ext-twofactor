<?php

namespace issyrocks12\twofactor\Api\Controllers;

use Flarum\Api\Controller\AbstractResourceController;
use Illuminate\Contracts\Bus\Dispatcher;
use issyrocks12\twofactor\Api\Serializers\CreateCodeSerializer;
use issyrocks12\twofactor\Commands\CreateCode;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class CreateCodeController extends AbstractResourceController
{
    public $serializer = CreateCodeSerializer::class;

    protected $bus;

    public function __construct(Dispatcher $bus)
    {
        $this->bus = $bus;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $enabled = array_get($request->getParsedBody(), 'enabled');
        $twofactor = array_get($request->getParsedBody(), 'twofactor');

        return $this->bus->dispatch(
        new CreateCode($actor, $enabled, $twofactor)
        );
    }
}
