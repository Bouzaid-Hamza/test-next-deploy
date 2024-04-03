'use client';

import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';

import Profile from '@app/profile/profile';
import { UserClient } from '@models/shared';

const UserProfile = ({ params }: { params: { id: string } }) => {
    // const searchParams = useSearchParams();
    // const name = searchParams.get('name');

    const [userName, setUserName] = useState('');
    const [userPrompts, setUserPrompts] = useState([]);

    useEffect(() => {
        const fetchUserPrompts = async () => {
            const response = await fetch(`/api/user/${params?.id}/prompts`);
            const data = await response.json();

            setUserPrompts(data);
        };

        const fetchUser = async () => {
            const response = await fetch(`/api/user/${params?.id}`);
            const data: UserClient = await response.json();

            setUserName(data.username);
        };

        if (params?.id) {
            fetchUser();
            fetchUserPrompts();
        }
    }, [params.id]);

    return (
        <Profile
            name={userName}
            desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
            prompts={userPrompts} />
    );
};

export default UserProfile;