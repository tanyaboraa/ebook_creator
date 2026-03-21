import { BookOpen, ChevronLeft } from "lucide-react";

const ViewChapterSidebar = ({
  book,
  selectedChapterIndex,
  onSelectChapter,
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:relative left-0 top-0 h-full w-80 bg-white border-r border-gray-100
          transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="">
          <div className="">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-semibold text-slate-700">
                  Chapters
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 lg:hidden"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Chapter List */}
            <div className="overflow-y-auto">
              {book.chapters.map((chapter, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onSelectChapter(index);
                    onClose();
                  }}
                  className={`
                    w-full text-left p-4 hover:bg-gray-50 transition-colors border-b border-gray-100
                    ${selectedChapterIndex === index
                      ? "bg-violet-50 border-l-4 border-l-violet-500"
                      : "border-l-4 border-l-transparent"
                    }
                  `}
                >
                  <div
                    className={`font-medium text-sm truncate ${
                      selectedChapterIndex === index
                        ? "text-violet-900"
                        : "text-gray-900"
                    }`}
                  >
                    {chapter.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Chapter {index + 1}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewChapterSidebar;