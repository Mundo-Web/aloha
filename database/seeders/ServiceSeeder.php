<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'id' => 'ea2d5c4f-9a8b-4f7a-b1e1-41a9f8c33f77',
                'name' => 'Básico',
                'description' => 'Para principiantes y emprendedores que quieren tener un sitio web',
                'price' => 350.00,
                'price_first_year' => 300.00
            ],
            [
                'id' =>  '58b3a7d2-3c2a-4823-a37e-fb7984bda9e2',
                'name' => 'Avanzado',
                'description' => 'Para emprendedores que quieren tener un sitio web más avanzado',
                'price' => 390.00,
                'price_first_year' => 350.00
            ],
            [
                'id' => 'c19e6b99-8e8b-45aa-a2cd-2147f8b9e01f',
                'name' => 'Profesional',
                'description' => 'Para emprendedores que quieren tener un sitio web aún más avanzado',
                'price' => 468.00,
                'price_first_year' => 420.00
            ]
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(['id' => $service['id']], $service);
        }
    }
}
