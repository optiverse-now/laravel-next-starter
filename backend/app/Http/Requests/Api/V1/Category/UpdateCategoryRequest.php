<?php

namespace App\Http\Requests\Api\V1\Category;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCategoryRequest extends FormRequest
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
        if ($this->routeIs('*.categories.update')) {
            return [
                'name' => ['required', 'string', 'max:20'],
            ];
        }

        if ($this->routeIs('*.categories.updateOrder')) {
            return [
                'order' => ['required', 'array'],
                'order.*' => ['required', 'uuid', 'exists:categories,id'],
            ];
        }

        return [];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'カテゴリ名を入力してください。',
            'name.max' => 'カテゴリ名は20文字以内で入力してください。',
            'order.required' => '並び順を指定してください。',
            'order.array' => '並び順は配列で指定してください。',
            'order.*.required' => 'カテゴリIDを指定してください。',
            'order.*.uuid' => '無効なカテゴリIDです。',
            'order.*.exists' => '指定されたカテゴリが存在しません。',
        ];
    }
}
