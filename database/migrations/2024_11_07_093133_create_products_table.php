<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->longText('name');
            $table->string('slug')->index()->unique();
            $table->string('sku')->index()->nullable();
            $table->foreignId('product_type_id')->nullable()->constrained('product_types')->nullOnDelete();
            $table->unsignedBigInteger('price')->index()->nullable();
            $table->unsignedBigInteger('base_price')->default(0)->index();
            $table->integer('stock')->nullable();
            $table->integer('stock_status')->default(1);
            $table->integer('status')->default(1);
            $table->longText('description')->nullable();
            $table->bigInteger('order_column')->index()->nullable();
            $table->longText('data')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
