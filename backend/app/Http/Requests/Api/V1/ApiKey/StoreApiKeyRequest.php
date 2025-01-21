<?php

namespace App\Http\Requests\Api\V1\ApiKey;

use Illuminate\Foundation\Http\FormRequest;

class StoreApiKeyRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'service_id.required' => 'サービスIDは必須です',
            'service_id.uuid' => 'サービスIDは有効なUUIDである必要があります',
            'service_id.exists' => '指定されたサービスが存在しません',
            'name.required' => 'APIキー名は必須です',
            'name.string' => 'APIキー名は文字列である必要があります',
            'name.max' => 'APIキー名は255文字以内である必要があります',
        ];
    }
}
