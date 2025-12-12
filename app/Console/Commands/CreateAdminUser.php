<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class CreateAdminUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:admin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new admin user interactively';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('--- Création d\'un nouvel Administrateur ---');

        $name = $this->ask('Nom complet');
        $email = $this->ask('Adresse Email');
        
        // Loop for password validation
        while (true) {
            $password = $this->secret('Mot de passe');
            $confirm = $this->secret('Confirmez le mot de passe');

            if ($password === $confirm && !empty($password)) {
                break;
            }
            
            $this->error('Les mots de passe ne correspondent pas ou sont vides. Réessayez.');
        }

        if (User::where('email', $email)->exists()) {
            $this->error("Erreur : L'utilisateur avec l'email [$email] existe déjà.");
            return;
        }

        User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'role' => 'admin'
        ]);

        $this->info("Succès ! L'administrateur [$name] a été créé.");
        $this->info("Vous pouvez maintenant vous connecter avec cet email.");
    }
}
