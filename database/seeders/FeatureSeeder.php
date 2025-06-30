<?php

namespace Database\Seeders;

use App\Models\Feature;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $features = [
            [
                'id' => 'b23a2c5f-7d2a-4c0b-9013-1fd207eb731e',
                'name' => 'Almacenamiento',
                'alias' => '*{}* de almacenamiento',
            ],
            [
                'id' => 'f1b1a5f6-3e2b-4c0e-98b5-2aa9c7bead1a',
                'name' => 'Transferencia mensual',
                'alias' => '*{}* de transferencia mensual',
                'after_feature' => 'b23a2c5f-7d2a-4c0b-9013-1fd207eb731e'
            ],
            [
                'id' => '9e2fc15a-182c-4e4c-9a26-56b452a71f2a',
                'name' => 'Cuentas de correo (POP/IMAP)',
                'alias' => '*{}* cuentas de correo (POP/IMAP)',
                'after_feature' => 'f1b1a5f6-3e2b-4c0e-98b5-2aa9c7bead1a'
            ],
            [
                'id' => '2dd41c25-947f-43b6-8410-81cb2a12b1df',
                'name' => 'Panel de control en Español',
                'after_feature' => '9e2fc15a-182c-4e4c-9a26-56b452a71f2a'
            ],
            [
                'id' => '19c3ad7e-3db2-498e-b21e-88d567e3e5a5',
                'name' => 'Base de datos MySQL/Postgres',
                'alias' => '*{}* base de datos MySQL/Postgres',
                'after_feature' => '2dd41c25-947f-43b6-8410-81cb2a12b1df'
            ],
            [
                'id' => 'b95b0a41-6f35-4989-a2d0-18781ed7e3a1',
                'name' => 'Cuentas FTP',
                'alias' => '*{}* cuentas FTP',
                'after_feature' => '19c3ad7e-3db2-498e-b21e-88d567e3e5a5'
            ],
            [
                'id' => 'cb8f19dc-1a57-4f7d-b86e-6a4c8481c369',
                'name' => 'Subdominios ilimitados',
                'after_feature' => 'b95b0a41-6f35-4989-a2d0-18781ed7e3a1'
            ],
            [
                'id' => 'a2d2f3f7-439e-4a70-9f87-f68d2d71a6fc',
                'name' => 'Certificado SSL Gratuito',
                'after_feature' => 'cb8f19dc-1a57-4f7d-b86e-6a4c8481c369'
            ],
            [
                'id' => 'e26f3923-3544-4c9f-95cd-43a7e4d346ed',
                'name' => 'Soporte 24/7',
                'after_feature' => 'a2d2f3f7-439e-4a70-9f87-f68d2d71a6fc'
            ],
        ];

        foreach ($features as $feature) {
            Feature::updateOrCreate([
                'id' => $feature['id']
            ], $feature);
        }
    }
}
