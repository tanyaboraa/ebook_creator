import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/apiPaths';
import { Edit, Trash2 } from 'lucide-react';

const BookCard = ({book, onDelete}) => {
    const navigate = useNavigate();

    const coverImageUrl = book.coverImage
        ? `${BASE_URL}/backend${book.coverImage}`.replace(/\\/g, "/")
        : "";

    return (
        <div
            className="relative group cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            onClick={() => navigate(`/view-book/${book._id}`)}
        >
            {/* Cover Image - zooms on hover */}
            <div className="w-full aspect-[16/25] bg-slate-100 overflow-hidden">
                <img
                    src={coverImageUrl}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" // ✅ Zoom effect
                    onError={(e) => { e.target.src = '' }}
                />
            </div>

            {/* Action Buttons - top right */}
            <div className="absolute top-2 right-2 flex gap-1.5">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/editor/${book._id}`);
                    }}
                    className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-violet-50 transition-all duration-200"
                >
                    <Edit className="w-4 h-4 text-violet-500" />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(book._id);
                    }}
                    className="w-8 h-8 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-red-50 transition-all duration-200"
                >
                    <Trash2 className="w-4 h-4 text-red-400" />
                </button>
            </div>

            {/* Title & Author - bottom overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-3">
                <h3 className="text-sm font-semibold text-white truncate">
                    {book.title}
                </h3>
                <p className="text-xs text-white/70 truncate">
                    {book.author}
                </p>
            </div>
        </div>
    )
}

export default BookCard