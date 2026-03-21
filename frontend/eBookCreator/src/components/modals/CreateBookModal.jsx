import { useState, useRef, useEffect } from "react";
import {
    Plus,
    Sparkles,
    Trash2,
    ArrowLeft,
    BookOpen,
    Hash,
    Lightbulb,
    Palette,
} from "lucide-react";
import Modal from "../ui/Modal";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import Button from "../ui/Button";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const CreateBookModal = ({isOpen, onClose, onBookCreated}) => {
    const { user } = useAuth();

    const [step, setStep] = useState(1);
    const [bookTitle, setBookTitle] = useState("");
    const [numChapters, setNumChapters] = useState(5);
    const [aiTopic, setAiTopic] = useState("");
    const [aiStyle, setAiStyle] = useState("Informative");
    const [chapters, setChapters] = useState([]);
    const [isGeneratingOutline, setIsGeneratingOutline] = useState(false);
    const [isFinalizingBook, setIsFinalizingBook] = useState(false);
    const chaptersContainerRef = useRef(null);

    const resetModal = () => {
        setStep(1);
        setBookTitle("");
        setNumChapters(5);
        setAiTopic("");
        setAiStyle("Informative");
        setChapters([]);
        setIsGeneratingOutline(false);
        setIsFinalizingBook(false);
    };

    const handleGenerateOutline = async () => {
        if (!bookTitle || !numChapters) {
            toast.error("Please provide a book title and number of chapters.");
            return;
        }
        setIsGeneratingOutline(true);
        try {
            const response = await axiosInstance.post(API_PATHS.AI.GENERATE_OUTLINE, {
                topic: bookTitle,
                description: aiTopic || "",
                style: aiStyle,
                numChapters: numChapters,
            });
            setChapters(response.data.outline);
            setStep(2);
            toast.success("Outline generated! Review and edit chapters.");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to generate outline."
            );
        } finally {
            setIsGeneratingOutline(false);
        }
    };

    const handleChapterChange = (index, field, value) => {
        const updatedChapters = [...chapters];
        updatedChapters[index][field] = value;
        setChapters(updatedChapters);
    };

    const handleDeleteChapter = (index) => {
        if (chapters.length <= 1) return;
        setChapters(chapters.filter((_, i) => i !== index));
    };

    const handleAddChapter = () => {
        setChapters([
            ...chapters,
            { title: `Chapter ${chapters.length + 1}`, description: "" },
        ]);
    };

    const handleFinalizeBook = async () => {
        if (!bookTitle || chapters.length === 0) {
            toast.error("Book title and at least one chapter are required.");
            return;
        }
        setIsFinalizingBook(true);
        try {
            const response = await axiosInstance.post(API_PATHS.BOOKS.CREATE_BOOK, {
                title: bookTitle,
                author: user.name || "Unknown Author",
                chapters: chapters,
            });
            toast.success("eBook created successfully!");
            onBookCreated(response.data._id);
            onClose();
            resetModal();
        } catch (error) {
            console.log("TESR__", bookTitle, chapters);
            toast.error(error.response?.data?.message || "Failed to create eBook.");
        } finally {
            setIsFinalizingBook(false);
        }
    };

    useEffect(() => {
        if (step === 2 && chaptersContainerRef.current) {
            const scrollableDiv = chaptersContainerRef.current;
            scrollableDiv.scrollTo({
                top: scrollableDiv.scrollHeight,
                behavior: "smooth",
            });
        }
    }, [chapters.length, step]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => {
                onClose();
                resetModal();
            }}
            title="Create New eBook"
        >
            {step === 1 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center text-sm font-semibold">
                            1
                        </div>
                        <div className="flex-1 h-0.5 bg-violet-200"></div>
                        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-sm font-semibold">
                            2
                        </div>
                    </div>
                    <InputField
                        icon={BookOpen}
                        label="Book Title"
                        placeholder="Enter your book title..."
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                    />
                    <InputField
                        icon={Hash}
                        label="Number of Chapters"
                        type="number"
                        placeholder="5"
                        value={numChapters}
                        onChange={(e) => setNumChapters(parseInt(e.target.value) || 1)}
                        min="1"
                        max="20"
                    />
                    <InputField
                        icon={Lightbulb}
                        label="Topic (Optional)"
                        placeholder="Specific topic for AI generation..."
                        value={aiTopic}
                        onChange={(e) => setAiTopic(e.target.value)}
                    />
                    <SelectField
                        icon={Palette}
                        label="Writing Style"
                        value={aiStyle}
                        onChange={(e) => setAiStyle(e.target.value)}
                        options={[
                            "Informative",
                            "Storytelling",
                            "Casual",
                            "Professional",
                            "Humorous",
                        ]}
                    />
                    <div className="flex justify-end pt-4">
                        <Button
                            onClick={handleGenerateOutline}
                            isLoading={isGeneratingOutline}
                            icon={Sparkles}
                        >
                            Generate Outline with AI
                        </Button>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                            ✓
                        </div>
                        <div className="flex-1 h-0.5 bg-violet-600"></div>
                        <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                            2
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-semibold text-slate-900">
                            Review Chapters
                        </h3>
                        <span className="text-sm text-slate-500">
                            {chapters.length} chapters
                        </span>
                    </div>

                    <div
                        ref={chaptersContainerRef}
                        className="space-y-3 max-h-96 overflow-y-auto pr-1"
                    >
                        {chapters.length === 0 ? (
                            <div className="text-center py-12 px-4 bg-gray-50 rounded-xl">
                                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500 text-sm">
                                    No chapters yet. Add one to get started.
                                </p>
                            </div>
                        ) : (
                            chapters.map((chapter, index) => (
                                // ✅ Updated chapter card
                                <div
                                    key={index}
                                    className="group p-4 border border-slate-200 rounded-xl space-y-2 hover:border-violet-200 transition-colors bg-white"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="w-7 h-7 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        <button
                                            onClick={() => handleDeleteChapter(index)}
                                            className="text-slate-300 hover:text-red-500 transition-colors p-1 opacity-0 group-hover:opacity-100"
                                            title="Delete Chapter"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        value={chapter.title || ""}
                                        onChange={(e) => handleChapterChange(index, "title", e.target.value)}
                                        placeholder="Chapter Title"
                                        className="w-full text-sm font-semibold text-slate-800 border-0 border-b border-slate-200 pb-1 focus:outline-none focus:border-violet-400 bg-transparent"
                                    />
                                    <p className="text-sm text-slate-500 leading-relaxed">
                                        {chapter.description}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <Button variant="ghost" onClick={() => setStep(1)} icon={ArrowLeft}>
                            Back
                        </Button>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="secondary"
                                onClick={handleAddChapter}
                                icon={Plus}
                            >
                                Add Chapter
                            </Button>
                            <Button
                                onClick={handleFinalizeBook}
                                isLoading={isFinalizingBook}
                            >
                                Create eBook
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Modal>
    )
}

export default CreateBookModal