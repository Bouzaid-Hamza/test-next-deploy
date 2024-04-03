import { PromptClient } from '@models/shared';
import PromptCardList from '../../components/prompt/prompt-card-list';

type ProfilProps = { name: string, desc: string, prompts: PromptClient[], handleEdit?: (id: string) => void, handleDelete?: (id: string) => void };

export default function Profile({ name, desc, prompts, handleEdit, handleDelete }: ProfilProps) {
    return (
        <section className='w-full'>
            <h1 className='head_text text-left'>
                <span className='blue_gradient'>{name} Profile</span>
            </h1>
            <p className='desc text-left'>{desc}</p>

            <div className='mt-10'><PromptCardList prompts={prompts} handleEdit={handleEdit} handleDelete={handleDelete} /></div>
        </section>
    );
};