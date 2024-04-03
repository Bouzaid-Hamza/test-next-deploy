'use client';

import { FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import PromptForm from '../../components/prompt/prompt-form';
import { PromptClient } from '@models/shared';

export default function CreatePrompt() {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setIsSubmitting] = useState(false);
    const [prompt, setPrompt] = useState<PromptClient>({ text: '', tag: '' });

    const createPrompt = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);

        try {
            const newPrompt: PromptClient = {
                text: prompt.text,
                creator: session?.user.id,
                tag: prompt.tag,
            };

            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify(newPrompt),
            });

            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <PromptForm
            type='Create'
            prompt={prompt}
            setPrompt={setPrompt}
            submitting={submitting}
            handleSubmit={createPrompt} />
    );
};