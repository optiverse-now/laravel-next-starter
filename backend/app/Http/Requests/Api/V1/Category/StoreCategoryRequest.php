<?php

namespace App\Http\Requests\Api\V1\Category;

use Illuminate\Foundation\Http\FormRequest;

class StoreCategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'service_id' => ['required', 'uuid', 'exists:services,id'],
            'name' => ['required', 'string', 'max:20'],
        ];
    }

    public function messages(): array
    {
        return [
            'service_id.required' => 'サービスIDを指定してください。',
            'service_id.uuid' => '無効なサービスIDです。',
            'service_id.exists' => '指定されたサービスが存在しません。',
            'name.required' => 'カテゴリ名を入力してください。',
            'name.max' => 'カテゴリ名は20文字以内で入力してください。',
        ];
    }
}
