<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ExecuteMassiveSending implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $templates;

    public function __construct($templates)
    {
        $this->templates = $templates;
    }

    public function handle()
    {
        dump('Empezando...');
        sleep(65);
        dump($this->templates);
        return true;
    }
}
