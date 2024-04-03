'use client';

import { FormEvent, useEffect, useState } from 'react';
// import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { PromptClient } from '@models/shared';
import PromptForm from '@components/prompt/prompt-form';

export default function UpdatePrompt({ params } : { params: { id: string }}) {
    const router = useRouter();
    // const { data: session } = useSession();
    const [prompt, setPrompt] = useState<PromptClient>({ text: '', tag: '' });
    const [submitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchPrompt = async () => {
            const response = await fetch(`/api/prompt/${params.id}`);
            const data = await response.json();

            setPrompt({ text: data.text, tag: data.tag });
        };

        if (params.id) fetchPrompt();
    }, [params.id]);

    const updatePrompt = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);

        try {
            const updatedPrompt: PromptClient = {
                text: prompt.text,
                tag: prompt.tag,
            };

            const response = await fetch(`/api/prompt/${params.id}`, {
                method: 'PATCH',
                body: JSON.stringify(updatedPrompt),
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
            type='Edit'
            prompt={prompt}
            setPrompt={setPrompt}
            submitting={submitting}
            handleSubmit={updatePrompt} />
    );
};