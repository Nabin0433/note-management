import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Button from './Button';

interface CreateNoteModalProps {
    onClose: () => void;
    onAddNote: (title: string, content: string) => void;
}

const CreateNoteModal = ({ onClose, onAddNote }: CreateNoteModalProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: any) => {
        const { title, content } = data;
        onAddNote(title, content);
        toast.success('Note added successfully!');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-20">
            <div className="bg-white text-black rounded-lg p-6 w-96">
                <h2 className="text-lg text-center mb-4">Create New Note</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            {...register('title', {
                                required: 'Title is required',
                                maxLength: { value: 50, message: 'Title cannot be longer than 50 characters' }
                            })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Note Title"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{(errors.title as any).message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Content</label>
                        <textarea
                            {...register('content', {
                                required: 'Content is required',
                                maxLength: { value: 200, message: 'Content cannot be longer than 200 characters' }
                            })}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Note Content"
                        />
                        {errors.content && <p className="text-red-500 text-sm">{(errors.content as any).message}</p>}
                    </div>
                    <div className="flex justify-end gap-4">
                        <Button title='Cancel' type='button' onClick={onClose} buttonStyle='Cancel' />
                        <Button title='Add Note' type='submit' />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNoteModal;
