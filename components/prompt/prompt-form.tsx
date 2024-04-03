import { PromptClient } from '@models/shared';
import Link from 'next/link';
import { FormEvent } from 'react';

type FormProps = { type: string, prompt: PromptClient, setPrompt: (prompt: PromptClient) => void, submitting: boolean, handleSubmit: (e: FormEvent<HTMLFormElement>) => void };

export default function PromptForm({ type, prompt, setPrompt, submitting, handleSubmit } : FormProps) {
    return (
        <section className='w-full max-w-full flex-start flex-col'>
            <h1 className='head_text text-left'>
                <span className='blue_gradient'>{type} Prompt</span>
            </h1>
            <p className='desc text-left max-w-md'>
                {type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform
            </p>

            <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism' >
                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>Your AI Prompt</span>
                    <textarea
                        value={prompt.text}
                        onChange={(e) => setPrompt({ ...prompt, text: e.target.value })}
                        placeholder='Write your prompt here'
                        required
                        className='form_textarea'/>
                </label>

                <label>
                    <span className='font-satoshi font-semibold text-base text-gray-700'>
                        Field of Prompt{' '}
                        <span className='font-normal'>(#product, #webdevelopment, #idea, etc.)</span>
                    </span>
                    <input
                        value={prompt.tag}
                        onChange={(e) => setPrompt({ ...prompt, tag: e.target.value })}
                        type='text'
                        placeholder='#Tag'
                        required
                        className='form_input'/>
                </label>

                <div className='flex-end mx-3 mb-5 gap-4'>
                    <Link href='/' className='text-gray-500 text-sm'>Cancel</Link>
                    <button type='submit' disabled={submitting} className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
                        {submitting ? `${type}ing...` : type}
                    </button>
                </div>
            </form>
        </section>
    );
};
