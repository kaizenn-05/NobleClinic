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
       Schema::create('audit_logs', function (Blueprint $table) {
        $table->id();

        $table->foreignId('user_id')
            ->nullable()
            ->constrained('users')
            ->restrictOnDelete();

        $table->string('action', 100);
        $table->string('entity_type', 100);
        $table->unsignedBigInteger('entity_id');
        $table->text('summary');
        $table->dateTime('occurred_at');
        $table->timestamps();

        $table->index(['entity_type', 'entity_id', 'occurred_at']);
        $table->index(['user_id', 'occurred_at']);
     });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
    }
};
