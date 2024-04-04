'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Profile from '@app/profile/profile';
import { PromptClient } from '@models/shared';

export default function MyProfile() {
    const router = useRouter();
    const { data: session } = useSession();
    const [myPrompts, setMyPrompts] = useState<PromptClient[]>([]);

    console.log('sdf');

    useEffect(() => {
        const fetchPrompts = async () => {
            const response = await fetch(`/api/user/${session?.user.id}/prompts`);
            const data = await response.json();

            setMyPrompts(data);
        };

        if (session?.user.id) fetchPrompts();
    }, [session?.user.id]);

    const handleEdit = (id: string) => {
        router.push(`/update-prompt/${id}`);
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/prompt/${id}`, { method: 'DELETE' });

            if (response.ok) {
                const filteredPrompts = myPrompts.filter(item => item._id !== id);
                setMyPrompts(filteredPrompts);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Profile
            name='My'
            desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
            prompts={myPrompts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};
