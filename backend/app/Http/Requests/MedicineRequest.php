<?php
namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
class MedicineRequest extends FormRequest { public function authorize(): bool { return true; } public function rules(): array { return ['brand_name'=>['required','string','max:120'],'category'=>['required','string','max:100'],'dosage_quantity'=>['required','numeric','gt:0']]; } protected function prepareForValidation(): void { $this->merge(collect($this->only(['brand_name','category']))->map(fn ($value) => is_string($value) ? trim($value) : $value)->all()); } }