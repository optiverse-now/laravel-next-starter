<?php

namespace App\Http\Requests\Api\V1\Post;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'status' => ['required', 'string', 'in:draft,published'],
            'category_ids' => ['nullable', 'array'],
            'category_ids.*' => ['required', 'uuid', 'exists:categories,id'],
            'eyecatch_media_id' => ['nullable', 'uuid', 'exists:media,id'],
            'published_at' => ['nullable', 'date', 'after_or_equal:now'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'タイトルを入力してください。',
            'title.max' => 'タイトルは255文字以内で入力してください。',
            'content.required' => '本文を入力してください。',
            'status.required' => 'ステータスを指定してください。',
            'status.in' => '無効なステータスです。',
            'category_ids.array' => 'カテゴリは配列で指定してください。',
            'category_ids.*.required' => 'カテゴリIDを指定してください。',
            'category_ids.*.uuid' => '無効なカテゴリIDです。',
            'category_ids.*.exists' => '指定されたカテゴリが存在しません。',
            'eyecatch_media_id.uuid' => '無効なメディアIDです。',
            'eyecatch_media_id.exists' => '指定されたメディアが存在しません。',
            'published_at.date' => '無効な日時形式です。',
            'published_at.after_or_equal' => '公開日時は現在以降を指定してください。',
        ];
    }
}
