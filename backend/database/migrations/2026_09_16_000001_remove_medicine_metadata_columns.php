<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration { public function up(): void { Schema::table('medicines', function (Blueprint $table) { foreach (['unit', 'manufacturer', 'description'] as $column) { if (Schema::hasColumn('medicines', $column)) $table->dropColumn($column); } }); } public function down(): void { Schema::table('medicines', function (Blueprint $table) { if (!Schema::hasColumn('medicines', 'unit')) $table->string('unit', 30)->nullable(); if (!Schema::hasColumn('medicines', 'manufacturer')) $table->string('manufacturer', 120)->nullable(); if (!Schema::hasColumn('medicines', 'description')) $table->text('description')->nullable(); }); } };