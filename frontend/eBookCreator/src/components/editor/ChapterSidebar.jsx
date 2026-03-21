import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Trash2, Plus, GripVertical } from "lucide-react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Button from "../ui/Button";

const GeminiIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 192 192"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="geminiGrad" x1="0" y1="0" x2="192" y2="192" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4285F4" />
        <stop offset="50%" stopColor="#9B72CB" />
        <stop offset="100%" stopColor="#D96570" />
      </linearGradient>
    </defs>
    <path
      fill="url(#geminiGrad)"
      d="M96 8C96 8 76 76 8 96C76 116 96 184 96 184C96 184 116 116 184 96C116 76 96 8 96 8Z"
    />
  </svg>
);

// SortableItem Component
const SortableItem = ({
  chapter,
  index,
  selectedChapterIndex,
  onSelectChapter,
  onDeleteChapter,
  onGenerateChapterContent,
  isGenerating,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: chapter._id || `new-${index}`,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="group flex items-center bg-white rounded-lg mb-1">
      <button
        className={`flex-1 flex items-center p-3 text-sm rounded-l-lg text-left transition-all
          ${selectedChapterIndex === index
            ? "bg-violet-50/50 text-violet-800 font-semibold border-l-4 border-violet-500"
            : "text-slate-600 hover:bg-slate-100 border-l-4 border-transparent"
          }`}
        onClick={() => onSelectChapter(index)}
      >
        <GripVertical
          className="w-4 h-4 text-slate-400 mr-2 cursor-grab shrink-0"
          {...listeners}
          {...attributes}
        />
        <span className="truncate">{chapter.title}</span>
      </button>

      <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <button
          className="p-1.5 rounded-md hover:bg-violet-50 hover:text-violet-600 text-slate-400 transition-colors"
          onClick={() => onGenerateChapterContent(index)}
          title="Generate with AI"
        >
          {isGenerating === index ? (
            <Sparkles className="w-4 h-4 animate-spin text-violet-500" />
          ) : (
            <GeminiIcon />
          )}
        </button>
        <button
          className="p-1.5 rounded-md hover:bg-red-50 hover:text-red-500 text-slate-400 transition-colors mr-1"
          onClick={() => onDeleteChapter(index)}
          title="Delete chapter"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const ChapterSidebar = ({
  book,
  selectedChapterIndex,
  onSelectChapter,
  onAddChapter,
  onDeleteChapter,
  onGenerateChapterContent,
  isGenerating,
  onReorderChapters,
}) => {
  const navigate = useNavigate();

  const chapterIds = book.chapters.map(
    (chapter, index) => String(chapter._id || `new-${index}`)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = chapterIds.indexOf(active.id);
      const newIndex = chapterIds.indexOf(over.id);
      onReorderChapters(oldIndex, newIndex);
    }
  };

  return (
    <aside className="flex flex-col h-full bg-slate-50 border-r border-slate-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
        <h2
          className="font-semibold text-slate-800 truncate text-sm"
          title={book.title}
        >
          {book.title}
        </h2>
      </div>

      {/* Chapter List */}
      <div className="flex-1 overflow-y-auto p-2">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={chapterIds}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-0.5">
              {book.chapters.map((chapter, index) => (
                <SortableItem
                  key={String(chapter._id || `new-${index}`)}
                  chapter={chapter}
                  index={index}
                  selectedChapterIndex={selectedChapterIndex}
                  onSelectChapter={onSelectChapter}
                  onDeleteChapter={onDeleteChapter}
                  onGenerateChapterContent={onGenerateChapterContent}
                  isGenerating={isGenerating}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200">
        <button
          onClick={onAddChapter}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium text-violet-600 bg-violet-50 hover:bg-violet-100 rounded-lg transition-colors border border-violet-200"
        >
          <Plus className="w-4 h-4" />
          New Chapter
        </button>
      </div>
    </aside>
  );
};

export default ChapterSidebar;