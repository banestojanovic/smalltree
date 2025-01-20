<?php

namespace App\Console\Commands;

use App\Imports\ContentImport;
use Illuminate\Console\Command;
use Maatwebsite\Excel\Facades\Excel;

class ImportContent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:import-content';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import smalltree content';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Excel::import(new ContentImport, storage_path('app/public/import/content.xlsx'));
    }
}
