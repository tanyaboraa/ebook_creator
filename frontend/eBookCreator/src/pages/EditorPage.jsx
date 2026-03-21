import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    Sparkles,
    FileDown,
    Save,
    Menu,
    X,
    Edit,
    NotebookText,
    ChevronDown,
    FileText,
} from "lucide-react";
import { arrayMove } from "@dnd-kit/sortable";

import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import Dropdown, { DropdownItem } from "../components/ui/Dropdown";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import SelectField from "../components/ui/SelectField";
import ChapterSidebar from "../components/editor/ChapterSidebar";
import ChapterEditorTab from "../components/editor/ChapterEditorTab";
import BookDetailsTab from "../components/editor/BookDetailsTab";

const EditorPage = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
    const [activeTab, setActiveTab] = useState("editor");
    const fileInputRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // AI Modal State
    const [isOutlineModalOpen, setIsOutlineModalOpen] = useState(false);
    const [aiTopic, setAiTopic] = useState("");
    const [aiStyle, setAiStyle] = useState("Informative");
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axiosInstance.get(
                    `${API_PATHS.BOOKS.GET_BOOK_BY_ID}/${bookId}`
                );
                setBook(response.data);
            } catch (error) {
                toast.error("Failed to load book details.");
                navigate("/dashboard");
            } finally {
                setIsLoading(false);
            }
        };
        fetchBook();
    }, [bookId, navigate]);

    const handleBookChange = (e) => {
        const { name, value } = e.target;
        setBook((prev) => ({ ...prev, [name]: value }));
    };

    const handleChapterChange = (e) => {
        const { name, value } = e.target;
        const updatedChapters = [...book.chapters];
        updatedChapters[selectedChapterIndex][name] = value;
        setBook((prev) => ({ ...prev, chapters: updatedChapters }));
    };

    const handleAddChapter = () => {
        const newChapter = {
            title: `Chapter ${book.chapters.length + 1}`,
            content: "",
        };
        const updatedChapters = [...book.chapters, newChapter];
        setBook((prev) => ({ ...prev, chapters: updatedChapters }));
        setSelectedChapterIndex(updatedChapters.length - 1);
    };

    const handleDeleteChapter = (index) => {
        if (book.chapters.length <= 1) {
            toast.error("A book must have at least one chapter.");
            return;
        }
        const updatedChapters = book.chapters.filter((_, i) => i !== index);
        setBook((prev) => ({ ...prev, chapters: updatedChapters }));
        setSelectedChapterIndex((prevIndex) =>
            prevIndex >= index ? Math.max(0, prevIndex - 1) : prevIndex
        );
    };

    const handleReorderChapters = (oldIndex, newIndex) => {
        setBook((prev) => ({
            ...prev,
            chapters: arrayMove(prev.chapters, oldIndex, newIndex),
        }));
        setSelectedChapterIndex(newIndex);
    };

    const handleSaveChanges = async (bookToSave = book, showToast = true) => {
        setIsSaving(true);
        try {
            await axiosInstance.put(
                `${API_PATHS.BOOKS.UPDATE_BOOK}/${bookId}`,
                bookToSave
            );
            if (showToast) {
                toast.success("Changes saved successfully!");
            }
        } catch (error) {
            console.log("ERRrR", error);
            toast.error("Failed to save changes.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCoverImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("coverImage", file);
        setIsUploading(true);

        try {
            const response = await axiosInstance.put(
                `${API_PATHS.BOOKS.UPDATE_COVER}/${bookId}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            setBook(response.data);
            toast.success("Cover image updated!");
        } catch (error) {
            toast.error("Failed to upload cover image.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleGenerateOutline = async () => {
        if (!aiTopic.trim()) {
            toast.error("Please enter a topic to generate an outline.");
            return;
        }
        setIsGenerating(true);
        try {
            const response = await axiosInstance.post(
                API_PATHS.AI.GENERATE_OUTLINE,
                {
                    bookId,
                    topic: aiTopic,
                    style: aiStyle,
                }
            );
            const updatedBook = {
                ...book,
                chapters: response.data.chapters,
            };
            setBook(updatedBook);
            await handleSaveChanges(updatedBook, false);
            setIsOutlineModalOpen(false);
            setAiTopic("");
            toast.success("Outline generated successfully!");
        } catch (error) {
            toast.error("Failed to generate outline.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleGenerateChapterContent = async (index) => {
        const chapter = book.chapters[index];
        if (!chapter || !chapter.title) {
            toast.error("Chapter title is required to generate content.");
            return;
        }

        setIsGenerating(index);
        try {
            const response = await axiosInstance.post(
                API_PATHS.AI.GENERATE_CHAPTER_CONTENT,
                {
                    chapterTitle: chapter.title,
                    chapterDescription: chapter.description || "",
                    style: aiStyle,
                }
            );
            const updatedChapters = [...book.chapters];
            updatedChapters[index].content = response.data.content;

            const updatedBook = { ...book, chapters: updatedChapters };
            setBook(updatedBook);
            toast.success(`Content for "${chapter.title}" generated!`);

            await handleSaveChanges(updatedBook, false);
        } catch (error) {
            toast.error("Failed to generate chapter content.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleExportPDF = async () => {
        toast.loading("Generating PDF...");
        try {
            const response = await axiosInstance.get(
                `${API_PATHS.EXPORT.PDF}/${bookId}/pdf`,
                { responseType: "blob" }
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${book.title}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.dismiss();
            toast.success("PDF export started!");
        } catch (error) {
            toast.dismiss();
            toast.error("Failed to export PDF.");
        }
    };

    const handleExportDoc = async () => {
        toast.loading("Generating Document...");
        try {
            const response = await axiosInstance.get(
                `${API_PATHS.EXPORT.DOC}/${bookId}/doc`,
                { responseType: "blob" }
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${book.title}.docx`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.dismiss();
            toast.success("Document export started!");
        } catch (error) {
            toast.dismiss();
            toast.error("Failed to export document.");
        }
    };

    if (isLoading || !book) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <p className="text-slate-500 animate-pulse">Loading Editor...</p>
            </div>
        );
    }

    return (
        <>
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-50 flex md:hidden">
                    <div
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                    <div className="relative flex flex-col w-72 bg-white shadow-xl">
                        <div className="flex items-center justify-end p-4">
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="p-1 rounded-md text-slate-400 hover:text-slate-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <ChapterSidebar
                            book={book}
                            selectedChapterIndex={selectedChapterIndex}
                            onSelectChapter={(index) => {
                                setSelectedChapterIndex(index);
                                setIsSidebarOpen(false);
                            }}
                            onAddChapter={handleAddChapter}
                            onDeleteChapter={handleDeleteChapter}
                            onGenerateChapterContent={handleGenerateChapterContent}
                            isGenerating={isGenerating}
                            onReorderChapters={handleReorderChapters}
                        />
                    </div>
                </div>
            )}

            <div className="flex bg-slate-50 font-sans relative min-h-screen">
                {/* Desktop Sidebar */}
                <div className="hidden md:flex md:flex-shrink-0 sticky top-0 h-screen">
                    <ChapterSidebar
                        book={book}
                        selectedChapterIndex={selectedChapterIndex}
                        onSelectChapter={setSelectedChapterIndex}
                        onAddChapter={handleAddChapter}
                        onDeleteChapter={handleDeleteChapter}
                        onGenerateChapterContent={handleGenerateChapterContent}
                        isGenerating={isGenerating}
                        onReorderChapters={handleReorderChapters}
                    />
                </div>

                {/* Main Content */}
                <main className="flex-1 h-full flex flex-col">
                    {/* Header */}
                    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="md:hidden p-1.5 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                            >
                                <Menu className="w-5 h-5" />
                            </button>

                            <div className="flex items-center bg-slate-100 rounded-lg p-1 gap-1">
                                <button
                                    onClick={() => setActiveTab("editor")}
                                    className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                                        activeTab === "editor"
                                            ? "bg-white text-slate-800 shadow-sm"
                                            : "text-slate-500 hover:text-slate-700"
                                    }`}
                                >
                                    <Edit className="w-3.5 h-3.5" />
                                    Editor
                                </button>
                                <button
                                    onClick={() => setActiveTab("details")}
                                    className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                                        activeTab === "details"
                                            ? "bg-white text-slate-800 shadow-sm"
                                            : "text-slate-500 hover:text-slate-700"
                                    }`}
                                >
                                    <NotebookText className="w-3.5 h-3.5" />
                                    Book Details
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* AI Outline Button */}
                            <button
                                onClick={() => setIsOutlineModalOpen(true)}
                                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-violet-600 hover:text-violet-700 hover:bg-violet-50 rounded-lg transition-colors"
                            >
                                <Sparkles className="w-4 h-4" />
                                AI Outline
                            </button>

                            {/* Export Dropdown */}
                            <Dropdown
                                trigger={
                                    <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                                        <FileDown className="w-4 h-4" />
                                        Export
                                        <ChevronDown className="w-3.5 h-3.5" />
                                    </button>
                                }
                            >
                                <DropdownItem onClick={handleExportPDF}>
                                    <FileText className="w-4 h-4 text-slate-500" />
                                    Export as PDF
                                </DropdownItem>
                                <DropdownItem onClick={handleExportDoc}>
                                    <FileText className="w-4 h-4 text-slate-500" />
                                    Export as Document
                                </DropdownItem>
                            </Dropdown>

                            {/* Save Button */}
                            <Button
                                onClick={() => handleSaveChanges()}
                                isLoading={isSaving}
                                className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                <Save className="w-4 h-4" />
                                Save Changes
                            </Button>
                        </div>
                    </header>

                    {/* Tab Content */}
                    <div className="w-full">
                        {activeTab === "editor" ? (
                            <ChapterEditorTab
                                book={book}
                                selectedChapterIndex={selectedChapterIndex}
                                onChapterChange={handleChapterChange}
                                onGenerateChapterContent={handleGenerateChapterContent}
                                isGenerating={isGenerating}
                            />
                        ) : (
                            <BookDetailsTab
                                book={book}
                                onBookChange={handleBookChange}
                                onCoverUpload={handleCoverImageUpload}
                                isUploading={isUploading}
                                fileInputRef={fileInputRef}
                            />
                        )}
                    </div>
                </main>
            </div>

            {/* AI Outline Modal */}
            <Modal
                isOpen={isOutlineModalOpen}
                onClose={() => setIsOutlineModalOpen(false)}
                title="Generate AI Outline"
            >
                <div className="space-y-4 p-4">
                    <InputField
                        label="Topic"
                        value={aiTopic}
                        onChange={(e) => setAiTopic(e.target.value)}
                        placeholder="e.g. Plant-Based Diet for Beginners"
                    />
                    <SelectField
                        label="Writing Style"
                        value={aiStyle}
                        onChange={(e) => setAiStyle(e.target.value)}
                        options={[
                            { value: "Informative", label: "Informative" },
                            { value: "Narrative", label: "Narrative" },
                            { value: "Academic", label: "Academic" },
                            { value: "Conversational", label: "Conversational" },
                        ]}
                    />
                    <Button
                        className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white py-2 rounded-lg"
                        onClick={handleGenerateOutline}
                        isLoading={isGenerating === true}
                    >
                        <Sparkles className="w-4 h-4" />
                        Generate Outline
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default EditorPage;