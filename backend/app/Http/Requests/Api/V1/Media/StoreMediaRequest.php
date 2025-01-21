<?php

namespace App\Http\Requests\Api\V1\Media;

use Illuminate\Foundation\Http\FormRequest;

class StoreMediaRequest extends FormRequest
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
            'file' => ['required', 'file', 'mimes:jpeg,png,jpg,gif', 'max:10240'],
            'name' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'service_id.required' => 'サービスIDは必須です',
            'service_id.uuid' => 'サービスIDは有効なUUIDである必要があります',
            'service_id.exists' => '指定されたサービスが存在しません',
            'file.required' => 'ファイルは必須です',
            'file.file' => '有効なファイルを指定してください',
            'file.mimes' => '許可されているファイル形式は jpeg, png, jpg, gif です',
            'file.max' => 'ファイルサイズは10MB以下である必要があります',
            'name.string' => 'ファイル名は文字列である必要があります',
            'name.max' => 'ファイル名は255文字以内である必要があります',
        ];
    }
}
