'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { PromptClient, isUserPopulated } from '@models/shared';

type PromptCardProps = Readonly<{ prompt: PromptClient, handleEdit?: (id: string) => void, handleDelete?: (id: string) => void, handleTagClick?: (tag: string) => void }>;

const PromptCard = ({ prompt, handleEdit, handleDelete, handleTagClick }: PromptCardProps) => {
    const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter();

    const [copied, setCopied] = useState('');

    const handleProfileClick = () => {
        if (!isUserPopulated(prompt.creator)) return;

        if (prompt.creator?._id === session?.user.id) return router.push('/profile');

        router.push(`/profile/${prompt.creator?._id}?name=${prompt.creator?.username}`);
    };

    const handleCopy = () => {
        setCopied(prompt.text);
        navigator.clipboard.writeText(prompt.text);
        setTimeout(() => setCopied(''), 3000);
    };

    return (
        isUserPopulated(prompt.creator) ? (
            <div className='prompt_card'>
                <div className='flex justify-between items-start gap-5'>
                    <div
                        className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
                        onClick={handleProfileClick} >
                        <Image
                            src={prompt.creator?.image || '/assets/images/logo.svg'}
                            alt='user_image'
                            width={40}
                            height={40}
                            className='rounded-full object-contain' />

                        <div className='flex flex-col'>
                            <h3 className='font-satoshi font-semibold text-gray-900'>
                                {prompt.creator.username}
                            </h3>
                            <p className='font-inter text-sm text-gray-500'>
                                {prompt.creator.email}
                            </p>
                        </div>
                    </div>

                    <div className='copy_btn' onClick={handleCopy}>
                        <Image
                            src={copied === prompt.text ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
                            alt={copied === prompt.text ? 'tick_icon' : 'copy_icon'}
                            width={12}
                            height={12}
                        />
                    </div>
                </div>

                <p className='my-4 font-satoshi text-sm text-gray-700'>{prompt.text}</p>
                <p className='font-inter text-sm blue_gradient cursor-pointer' onClick={() => handleTagClick && handleTagClick(prompt.tag)}>
                    #{prompt.tag}
                </p>

                {session?.user.id === prompt.creator._id && pathName === '/profile' && (
                    <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
                        <p className='font-inter text-sm green_gradient cursor-pointer' onClick={() => prompt._id && handleEdit && handleEdit(prompt._id)}>
                            Edit
                        </p>
                        <p className='font-inter text-sm orange_gradient cursor-pointer' onClick={() => prompt._id && handleDelete && handleDelete(prompt._id)}>
                            Delete
                        </p>
                    </div>
                )}
            </div>
        ) : null

    );
};

export default PromptCard;