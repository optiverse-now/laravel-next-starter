<?php

namespace App\Http\Requests\Api\V1\Service;

use Illuminate\Foundation\Http\FormRequest;

class UpdateServiceRequest extends FormRequest
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
        if ($this->routeIs('*.services.update')) {
            return [
                'name' => ['required', 'string', 'max:20'],
            ];
        }

        if ($this->routeIs('*.services.updateOrder')) {
            return [
                'order' => ['required', 'array'],
                'order.*' => ['required', 'uuid', 'exists:services,id'],
            ];
        }

        return [];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'サービス名を入力してください。',
            'name.max' => 'サービス名は20文字以内で入力してください。',
            'order.required' => '並び順を指定してください。',
            'order.array' => '並び順は配列で指定してください。',
            'order.*.required' => 'サービスIDを指定してください。',
            'order.*.uuid' => '無効なサービスIDです。',
            'order.*.exists' => '指定されたサービスが存在しません。',
        ];
    }
}
