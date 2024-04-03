'use client';

import { useState, useEffect, ChangeEvent } from 'react';

import { PromptClient, isUserPopulated } from '@models/shared';
import PromptCardList from './prompt/prompt-card-list';


export default function Feed() {
    const [allPrompts, setAllPrompts] = useState<PromptClient[]>([]);

    // Search states
    const [searchText, setSearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
    const [searchedResults, setSearchedResults] = useState<PromptClient[]>([]);

    const fetchPrompts = async () => {
        const response = await fetch('/api/prompt');
        const data = await response.json();

        setAllPrompts(data);
    };

    useEffect(() => {
        fetchPrompts();
    }, []);

    const filterPrompts = (searchtext: string) => {
        const regex = new RegExp(searchtext, 'i'); // 'i' flag for case-insensitive search
        return allPrompts.filter(item =>
            (isUserPopulated(item.creator) && regex.test(item.creator.username)) ||
            regex.test(item.tag) ||
            regex.test(item.text)
        );
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (searchTimeout) clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        // debounce method
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPrompts(e.target.value);
                setSearchedResults(searchResult);
            }, 500)
        );
    };

    const handleTagClick = (tagName: string) => {
        setSearchText(tagName);
        const searchResult = filterPrompts(tagName);
        setSearchedResults(searchResult);
    };

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type='text'
                    placeholder='Search for a tag or a username'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />
            </form>

            <div className='mt-16'><PromptCardList prompts={searchText ? searchedResults : allPrompts} handleTagClick={handleTagClick} /></div>
        </section>
    );
};