<?php

namespace Database\Seeders;

use App\Imports\ContentImport;
use App\Models\AttributeValue;
use App\Models\Category;
use App\Models\Discount;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\Product;
use App\Models\ProductType;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Settings\GeneralSettings;
use App\Settings\PromotionSettings;
use App\Support\Disk;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use Spatie\Tags\Tag;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        Storage::disk('public')->deleteDirectory('user');
        Storage::disk('public')->deleteDirectory('product');
        Storage::disk('public')->deleteDirectory('category');
        Storage::disk('public')->deleteDirectory('post');
        Storage::disk('public')->deleteDirectory('post_category');
        Storage::disk('public')->deleteDirectory('attachments');

        User::factory()->superAdmin()->create([
            'email' => 'admin@test.com',
        ]);

        (new CategorySeeder)->run();

        ProductType::factory()->count(3)
            ->state(new Sequence(fn ($sequence) => ['name' => 'Čajevi'],
                ['name' => 'Pribor'],
                ['name' => 'Med'],
            ))
            ->create();

        (new AttributeSeeder)->run();
        //        (new AttributeValueSeeder)->run();
        (new VariationSeeder)->run();
        (new VariationValueSeeder)->run();

        (new PostCategorySeeder)->run();
        $posts = Post::factory()->count(20)->gallery()->create();

        $posts->each(function ($post) {
            $post->categories()->attach(PostCategory::inRandomOrder()->first()->id);
            $post->attachTags(Tag::inRandomOrder()->limit(3)->get()->pluck('name')->toArray());
        });

        $latestPosts = Post::factory()->count(3)
            ->state(new Sequence(fn ($sequence) => [
                'name' => 'Kako klima utiče na kvalitet čaja',
                'content' => ' <h2>Nadmorska Visina i Kvalitet Čaja</h2>
    <p>Nadmorska visina predstavlja jedan od ključnih faktora koji utiču na ukus čaja. Čajevi koji se uzgajaju na većim nadmorskim visinama, posebno iznad 1.500 metara, razvijaju kompleksniji ukus zbog sporijeg rasta biljke. Niže temperature i ređi vazduh primoravaju biljku da proizvodi više amino kiselina i drugih jedinjenja koja doprinose bogatijem ukusu. Čajevi sa visokih plantaža često imaju izraženiju aromu i slađi ukus u poređenju sa čajevima koji se uzgajaju u nižim predelima.</p>

    <h2>Uticaj Padavina i Vlažnosti</h2>
    <p>Količina padavina i nivo vlažnosti vazduha direktno utiču na brzinu rasta čajnih listova i njihov hemijski sastav. Optimalna količina padavina za uzgoj čaja kreće se između 1.500 i 2.000 milimetara godišnje. Previše kiše može razvodniti ukus čaja, dok nedostatak vlage može dovesti do gorčine i oštrog ukusa. Područja sa pravilnim rasporedom padavina tokom godine, poput regiona Darjeeling u Indiji, proizvode čajeve sa balansiranim i prefinjenim ukusom.</p>

    <h2>Temperatura i Sezonske Varijacije</h2>
    <p>Temperatura igra presudnu ulogu u razvoju ukusa čaja. Hladniji periodi usporavaju rast biljke, što rezultira koncentrisanijim ukusom. Zbog toga su prolećne berbe često najcenjenije, jer listovi rastu sporije nakon zimskog perioda. Letnji čajevi, sa druge strane, često imaju blaži ukus zbog bržeg rasta u toplijim uslovima. Dnevne temperaturne varijacije takođe utiču na razvoj arome - veće razlike između dnevnih i noćnih temperatura doprinose razvoju kompleksnijih ukusa.</p>',
            ],
                ['name' => 'Otkrijte očaravajući svet indijskog čaja',
                    'content' => '<h2>1. Istorija indijskog čaja</h2>
<p>Iako čaj potiče iz Kine, Indija je danas jedan od najvećih proizvođača i izvoznika čaja na svetu. Britanci su u 19. veku započeli masovnu kultivaciju čaja u Indiji, kako bi smanjili zavisnost od kineskog izvoza. Tako su regije Assam, Darjeeling i Nilgiri postale poznate po vrhunskim čajevima koji danas osvajaju svet.</p>

<h2>2. Najpoznatije vrste indijskog čaja</h2>
<h3>Darjeeling</h3>
<p>Nazvan "šampanjcem među čajevima", Darjeeling čaj se uzgaja na visokim nadmorskim visinama Himalaja. Karakteriše ga blagi, cvetni ukus sa voćnim notama.</p>

<h3>Assam</h3>
<p>Ovaj čaj dolazi iz tropskog regiona Assama i poznat je po svom jakom, bogatom ukusu i tamnoj boji. Najčešće se koristi za pripremu jakih crnih čajeva i tradicionalnog masala čaja.</p>

<h3>Nilgiri</h3>
<p>Nilgiri čaj se uzgaja u južnoj Indiji i ističe se svojom osvežavajućom, laganom aromom. Odličan je za ledene čajeve i blendove.</p>

<h2>3. Masala čaj – indijski specijalitet</h2>
<p>Masala čaj je jedan od najpopularnijih napitaka u Indiji, pripreman od crnog čaja, mleka i mešavine začina poput kardamoma, cimeta, đumbira i bibera. Njegov bogat i topao ukus čini ga savršenim napitkom za hladne dane.</p>

<h4>Recept za masala čaj:</h4>
<ol>
    <li>Prokuvajte šolju vode sa kašičicom crnog čaja.</li>
    <li>Dodajte mleko, šećer i začine po ukusu.</li>
    <li>Kuvajte nekoliko minuta i procedite pre serviranja.</li>
</ol>

<h2>4. Zdravstvene koristi indijskog čaja</h2>
<ul>
    <li><strong>Bogat antioksidansima</strong> – pomaže u borbi protiv slobodnih radikala.</li>
    <li><strong>Poboljšava varenje</strong> – naročito masala čaj sa đumbirom i kardamomom.</li>
    <li><strong>Podstiče energiju</strong> – Assam čaj sadrži visok nivo kofeina.</li>
    <li><strong>Jača imunitet</strong> – zahvaljujući začinima u masala čaju.</li>
</ul>

<h2>5. Kako uživati u indijskom čaju</h2>
<p>Uživanje u indijskom čaju može biti pravo iskustvo ako se pripremi na pravi način. Preporučuje se korišćenje sveže prokuvane vode i listova čaja visokog kvaliteta. Možete eksperimentisati sa začinima i dodacima poput meda, limuna ili bademovog mleka kako biste pronašli svoju idealnu kombinaciju.</p>

<h2>Zaključak</h2>
<p>Indijski čaj nije samo napitak – to je kultura, tradicija i umetnost. Bilo da preferirate lagani Darjeeling, jaki Assam ili egzotični masala čaj, svaki gutljaj donosi delić Indije u vašu šolju. Otkrijte čaroliju indijskog čaja i uživajte u njegovim bogatim aromama i blagodatima za zdravlje!</p>',
                ],
                [
                    'name' => 'Domaći Kuvani Čaj: Zimska Čarolija u Šolji',
                    'content' => '<h2>Osnovni Sastojci za Savršen Kuvani Čaj</h2>
    <p>Za pripremu savršenog kuvanog čaja potrebno je nekoliko ključnih sastojaka. Kao bazu koristite crni čaj jačeg ukusa, poput Assam ili Ceylon čaja. Osnovno začinsko jezgro čine cimet u štapićima, karanfilić i đumbir. Sveža pomorandža ili limun dodaju osvežavajuću citrusnu notu, dok med ili smeđi šećer zaokružuju ukus. Opciono možete dodati kardamom, anis ili muskatni oraščić za dodatnu aromu.</p>

    <h2>Proces Pripreme Korak po Korak</h2>
    <p>Priprema počinje zagrevanjem vode do tačke ključanja. Zatim dodajte čaj i začine, smanjite temperaturu i pustite da se krčka 15-20 minuta. Važno je da mešavina ne proključa jer to može rezultirati gorkim ukusom. Nakon kuvanja, procedite čaj i dodajte zaslađivač po ukusu. Za intenzivniji ukus, začine možete prethodno blago propržiti na suvoj tavi.</p>

    <h2>Varijacije i Kreativni Dodaci</h2>
    <p>Eksperimentišite sa različitim kombinacijama za pronalaženje svog savršenog recepta. Probajte dodati sušene brusnice ili jabuke za voćniju notu. Tamna čokolada može dodati bogat, zemljani ukus. Za bezalkoholnu verziju mulled wine-a, koristite sok od grožđa kao bazu umesto čaja. Sveža nana ili ruzmarin mogu dodati osvežavajući prizvuk.</p>

    <h2>Zdravstvene Dobrobiti Kuvanog Čaja</h2>
    <p>Kuvani čaj nije samo ukusan, već nudi i brojne zdravstvene prednosti. Đumbir i cimet pomažu u jačanju imuniteta i imaju antiinflamatorna svojstva. Karanfilić je prirodni antiseptik i može pomoći kod problema sa varenjem. Citrusno voće obezbeđuje vitamin C, dok med ima antibakterijska svojstva. Topli napitak takođe pomaže u održavanju hidratacije tokom hladnih zimskih dana.</p>

    <h2>Serviranje i Prezentacija</h2>
    <p>Način serviranja kuvanog čaja može značajno uticati na celokupno iskustvo. Koristite providne staklene šolje kako biste pokazali bogatu boju napitka. Ukrasite svežim štapićem cimeta, kriškom pomorandže ili zvezdom anisa. Za posebne prilike, dodajte kandiranu koru citrusnog voća na ivicu čaše. Služite toplo, ali ne prevruće, kako bi se arome najbolje osetile.</p>'
                    ],
            ))
            ->galleryLatest()->create();

        $latestPosts->each(function ($post) {
            $post->categories()->attach(PostCategory::inRandomOrder()->first()->id);
            $post->attachTags(Tag::inRandomOrder()->limit(3)->get()->pluck('name')->toArray());
        });

        Excel::import(new ContentImport, storage_path('app/public/import/content.xlsx'));

        if (app()->environment('local', 'staging')) {
            $promoted = Product::inRandomOrder()->limit(3)->get();
            $promoted->each(function ($product) {
                Discount::create([
                    'product_id' => $product->id,
                    'price' => $product->price * 0.8,
                    'starts_at' => now()->subDays(rand(1, 10)),
                    'ends_at' => now()->addDays(rand(10, 30)),
                ]);
            });
        }

        $this->seedSettings();

        return;

        // just for testing.
        Product::factory()->count(50)->gallery()->create();

        $products = Product::all();
        $products->each(function ($product) {
            $product->categories()->attach(Category::inRandomOrder()->first()->id);
            $product->attachTags(Tag::inRandomOrder()->limit(3)->get()->pluck('name')->toArray());

            $product->attributes()->sync([
                AttributeValue::where('attribute_id', 1)->inRandomOrder()->first()->id,
                AttributeValue::where('attribute_id', 2)->inRandomOrder()->first()->id,
                AttributeValue::where('attribute_id', 3)->inRandomOrder()->first()->id,
                AttributeValue::where('attribute_id', 4)->inRandomOrder()->first()->id,
                AttributeValue::where('attribute_id', 5)->inRandomOrder()->first()->id,
            ]);
        });

        (new ProductVariationSeeder)->run();

        Discount::factory()->count(4)->create();

        (new PostCategorySeeder)->run();
        $posts = Post::factory()->count(50)->gallery()->create();

        $posts->each(function ($post) {
            $post->categories()->attach(Category::inRandomOrder()->first()->id);
            $post->attachTags(Tag::inRandomOrder()->limit(3)->get()->pluck('name')->toArray());
        });
    }

    public function seedSettings()
    {
        $settings = (new GeneralSettings);
        $promotionSettings = (new PromotionSettings);

        $heroImg = $this->copyAttachment('hero.webp');
        $settings->hero_image = [$heroImg];

        $teaOfTheMonthImg = $this->copyAttachment('tea_of_month.webp');
        $promotionSettings->tea_of_the_month_bg_image = [$teaOfTheMonthImg];
        $promotionSettings->tea_of_the_month_products = [Product::whereHas('discount')->inRandomOrder()->first()->id];

        $specialOfferImg = $this->copyAttachment('special_offer.webp');
        $promotionSettings->special_offer_bg_image = [$specialOfferImg];
        $promotionSettings->special_offer_products = [Product::inRandomOrder()->first()->id];

        $promotedPackages = [
            [
                'bg_image' => [$this->copyAttachment('promoted_1.webp')],
                'title' => ['sr' => 'Vaš MATE čaj ritual'],
                'subtitle' => ['sr' => 'Komplet set za pripremanje mate čaja'],
                'products' => [Product::where('product_type_id', 1)->inRandomOrder()->first()->id, Product::where('product_type_id', 1)->inRandomOrder()->first()->id],
            ],
            [
                'bg_image' => [$this->copyAttachment('promoted_2.webp')],
                'title' => ['sr' => 'Vaš MATCHA čaj ritual'],
                'subtitle' => ['sr' => 'Komplet set za pripremanje matcha čaja'],
                'products' => [Product::where('product_type_id', 1)->inRandomOrder()->first()->id, Product::where('product_type_id', 1)->inRandomOrder()->first()->id],
            ],
        ];

        $promotionSettings->promo_packages = $promotedPackages;

        $settings->save();
        $promotionSettings->save();
    }

    public function copyAttachment(string $sourceImg)
    {
        $sourcePath = "site/images/$sourceImg";

        $name = rand(10000000, 99999999).'.webp';
        if (Storage::disk('public')->exists($sourcePath)) {
            Storage::disk(Disk::Attachments)->put(
                $name,
                Storage::disk('public')->get($sourcePath)
            );
        }

        return $name;
    }
}
