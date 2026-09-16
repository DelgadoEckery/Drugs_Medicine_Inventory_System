<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Medicine extends Model { protected $fillable = ['brand_name', 'category', 'dosage_quantity', 'unit', 'manufacturer', 'description']; protected $casts = ['dosage_quantity' => 'decimal:2']; }