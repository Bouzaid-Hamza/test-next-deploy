import { PromptClient } from '@models/shared';
import PromptCard from './prompt-card';

type CardListProps = Readonly<{ prompts: PromptClient[], handleTagClick?: (tag: string) => void, handleEdit?: (id: string) => void, handleDelete?: (id: string) => void }>;

export default function PromptCardList({ prompts, handleTagClick, handleEdit, handleDelete }: CardListProps) {
    return (
        <div className='prompt_layout'>
            {prompts.map(prompt => (
                <PromptCard
                    key={prompt._id?.toString()}
                    prompt={prompt}
                    handleTagClick={handleTagClick}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}/>
            ))}
        </div>
    );
};