<?php

namespace Database\Seeders;

use App\Models\Aboutus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AboutusSeederMesage extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Aboutus::create([
            'correlative' => 'wa-message',
            'name' => 'WhatsApp Mensaje',
            'description' => '¡Hola! Quiero personalizar mi fórmula.',
        ]);
    }
}
