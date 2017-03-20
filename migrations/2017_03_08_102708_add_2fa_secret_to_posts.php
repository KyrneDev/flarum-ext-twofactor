<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up'   => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->boolean('twofa_enabled')->default(0);
            $table->string('google2fa_secret');
            $table->string('recovery_codes')->nullable;
        });
    },
  'down' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->dropColumn('google2fa_secret');
            $table->dropColumn('twofa_enabled');
            $table->dropColumn('recovery_codes');                               
        });
      } 
  ];