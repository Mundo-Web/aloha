<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UsersSeeder::class,
            SliderSeeder::class,
            IndicatorSeeder::class,
            AboutusSeeder::class,
            AboutusSeederMesage::class,
            TestimonySeeder::class,
            CategorySeeder::class,
            StrengthSeeder::class,
            SocialSeeder::class,
            GeneralSeeder::class,
            ItemSeeder::class,
            SupplySeeder::class,
            FormulaSeeder::class,
            FormulaHasSupplySeeder::class,
            ColorSeeder::class,
            FaqSeeder::class,
            FragranceSeeder::class,
            AdSeeder::class,
            RenewalSeeder::class,
            BundleSeeder::class,
            CouponSeeder::class,
            StatusSeeder::class,
        ]);
    }
}
