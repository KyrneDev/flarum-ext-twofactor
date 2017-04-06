<?php

/*
 * This file is based on Flarum's Api/Controller/TokenController.php
 *
 * (c) Toby Zerner <toby.zerner@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace issyrocks12\twofactor\Api\Controllers;

use Flarum\Core\Exception\PermissionDeniedException;
use Flarum\Core\Repository\UserRepository;
use Flarum\Http\AccessToken;
use Flarum\Http\Controller\ControllerInterface;
use Illuminate\Contracts\Bus\Dispatcher as BusDispatcher;
use Illuminate\Contracts\Events\Dispatcher as EventDispatcher;
use issyrocks12\twofactor\TwoFactor;
use Psr\Http\Message\ServerRequestInterface;
use Zend\Diactoros\Response\JsonResponse;

class TokenController implements ControllerInterface
{
    /**
     * @var UserRepository
     */
    protected $users;

    /**
     * @var BusDispatcher
     */
    protected $bus;

    /**
     * @var EventDispatcher
     */
    protected $events;

    /**
     * @var TwoFactor
     */
    private $twoFactor;

    /**
     * @param UserRepository  $users
     * @param BusDispatcher   $bus
     * @param EventDispatcher $events
     * @param TwoFactor       $twoFactor
     */
    public function __construct(UserRepository $users, BusDispatcher $bus, EventDispatcher $events, TwoFactor $twoFactor)
    {
        $this->users = $users;
        $this->bus = $bus;
        $this->events = $events;
        $this->twoFactor = $twoFactor;
    }

    /**
     * {@inheritdoc}
     */
    public function handle(ServerRequestInterface $request)
    {
        $body = $request->getParsedBody();

        $identification = array_get($body, 'identification');
        $password = array_get($body, 'password');
        $lifetime = array_get($body, 'lifetime', 3600);
        $twofactor = array_get($body, 'twofactor');

        if ($twofactor == null) {
            $twofactor = '0';
        }

        $user = $this->users->findByIdentification($identification);
        if (!$user || !$user->checkPassword($password)) {
            throw new PermissionDeniedException();
        }

        if ($user->twofa_enabled == 1) {
            if ($this->twoFactor->verifyCode($user, $twofactor) == true || $this->twoFactor->doRecovery($twofactor, $user) == true) {
                $token = AccessToken::generate($user->id, $lifetime);
                $token->save();

                return new JsonResponse([
                            'token'  => $token->id,
                            'userId' => $user->id,
                        ]);
            } else {
                return new JsonResponse([
                            'code' => '404',
                        ]);
            }
        } else {
            $token = AccessToken::generate($user->id, $lifetime);
            $token->save();

            return new JsonResponse([
                    'token'  => $token->id,
                    'userId' => $user->id,
                ]);
        }
    }
}
