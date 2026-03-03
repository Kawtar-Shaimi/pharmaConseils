<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Category;
use App\Models\Post;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Users
        $admin = User::create([
            'name' => 'Admin Pharmacien',
            'email' => 'admin@pharmaconseils.ma',
            'password' => Hash::make('password'),
            'role' => 'admin'
        ]);

        $user = User::create([
            'name' => 'Jean Martin',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'role' => 'user'
        ]);

        // Categories
        $cats = [
            ['name' => 'Vidéos Conseils', 'slug' => 'videos-conseils', 'icon' => 'video'],
            ['name' => 'Guides Santé', 'slug' => 'guides-sante', 'icon' => 'book'],
            ['name' => 'Médicaments', 'slug' => 'medicaments', 'icon' => 'pill'],
            ['name' => 'Prévention', 'slug' => 'prevention', 'icon' => 'shield'],
            ['name' => 'Nutrition', 'slug' => 'nutrition', 'icon' => 'apple'],
            ['name' => 'Bien-être', 'slug' => 'bien-etre', 'icon' => 'sun'],
        ];

        foreach ($cats as $c) {
            Category::create($c);
        }

        // Posts
        $categories = Category::all();

        // Featured Posts
        Post::create([
            'user_id' => $admin->id,
            'category_id' => $categories->where('slug', 'medicaments')->first()->id,
            'title' => 'Comment bien prendre ses médicaments',
            'slug' => 'comment-bien-prendre-ses-medicaments',
            'content' => "Prendre ses médicaments correctement est essentiel pour garantir leur efficacité et éviter les effets indésirables...",
            'image' => 'https://images.unsplash.com/photo-1576091160550-217358c7db81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
            'is_published' => true,
            'published_at' => now(),
        ]);

        Post::create([
            'user_id' => $admin->id,
            'category_id' => $categories->where('slug', 'prevention')->first()->id,
            'title' => 'Gérer la fièvre chez l\'enfant',
            'slug' => 'gerer-la-fievre-enfant',
            'content' => "La fièvre est une réaction naturelle de l'organisme...",
            'image' => 'https://images.unsplash.com/photo-1516574187841-693083f69382?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
            'is_published' => true,
            'published_at' => now(),
        ]);

        Post::create([
            'user_id' => $admin->id,
            'category_id' => $categories->where('slug', 'nutrition')->first()->id,
            'title' => 'Les vitamines essentielles en hiver',
            'slug' => 'vitamines-hiver',
            'content' => "L'hiver met notre système immunitaire à rude épreuve...",
            'image' => 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
            'is_published' => true,
            'published_at' => now(),
        ]);
        
        // More posts...
    }
}
