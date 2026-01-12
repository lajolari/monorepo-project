<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Security;
use App\Models\SecurityType;
use App\Models\SecurityPrice;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        if (!User::where('email', 'test@example.com')->exists()) {
            User::factory()->create([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => Hash::make('password'),
            ]);
        }

        $stockType = SecurityType::firstOrCreate(
            ['slug' => 'stock'],
            ['name' => 'Stock / Equities']
        );

        $cryptoType = SecurityType::firstOrCreate(
            ['slug' => 'crypto'],
            ['name' => 'Cryptocurrency']
        );

        $securities = [
            ['symbol' => 'AAPL', 'name' => 'Apple Inc.', 'type_id' => $stockType->id],
            ['symbol' => 'TSLA', 'name' => 'Tesla, Inc.', 'type_id' => $stockType->id],
            ['symbol' => 'BTC', 'name' => 'Bitcoin', 'type_id' => $cryptoType->id],
            ['symbol' => 'ETH', 'name' => 'Ethereum', 'type_id' => $cryptoType->id],
        ];

        foreach ($securities as $data) {
            $security = Security::firstOrCreate(
                ['symbol' => $data['symbol']],
                [
                    'name' => $data['name'],
                    'security_type_id' => $data['type_id']
                ]
            );

            SecurityPrice::create([
                'security_id' => $security->id,
                'last_price' => rand(100, 50000),
                'as_of_date' => now(),
            ]);
        }
        
        $this->command->info('¡Datos sembrados respetando la estructura original! 🚀');
    }
}