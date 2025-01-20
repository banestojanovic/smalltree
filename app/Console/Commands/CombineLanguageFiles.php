<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class CombineLanguageFiles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:i18n';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Combine language files into one';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $langDir = resource_path('lang');
        $outputDir = resource_path('lang');
        $outputFile = $outputDir.'/locales.json';

        if (! File::exists($langDir)) {
            $this->error("Language directory not found: $langDir");

            return 1;
        }

        if (! File::exists($outputDir)) {
            File::makeDirectory($outputDir, 0755, true);
        }

        $combined = [];

        foreach (File::files($langDir) as $file) {
            if ($file->getExtension() === 'json') {
                $key = $file->getFilenameWithoutExtension();
                if ($key !== 'locales') {
                    $combined[$key] = [
                        'translation' => json_decode($file->getContents(), true),
                    ];
                }
            }
        }

        File::put($outputFile, json_encode($combined, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

        $this->info("Combined language files into: $outputFile");

        return 0;
    }
}
