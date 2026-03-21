import { useState } from "react";
import { ChevronLeft, Menu } from "lucide-react";
import ViewChapterSidebar from "./ViewChapterSidebar";

const ViewBook = ({ book }) => {
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fontSize, setFontSize] = useState(18);

  const selectedChapter = book.chapters[selectedChapterIndex];

  const formatContent = (content) => {
    return content
      .split("\n\n")
      .filter((paragraph) => paragraph.trim())
      .map((paragraph) => paragraph.trim())
      .map((paragraph) => {
        paragraph = paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        paragraph = paragraph.replace(
          /(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g,
          "<em>$1</em>"
        );
        return `<p>${paragraph}</p>`;
      })
      .join("");
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <ViewChapterSidebar
        book={book}
        selectedChapterIndex={selectedChapterIndex}
        onSelectChapter={setSelectedChapterIndex}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-semibold text-slate-800">
                {book.title}
              </h1>
              <p className="text-sm text-slate-500">by {book.author}</p>
            </div>
          </div>

          {/* Font Size Controls */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5">
              <button
                onClick={() => setFontSize(Math.max(14, fontSize - 2))}
                className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors"
              >
                A-
              </button>
              <span className="text-sm text-slate-500 min-w-[40px] text-center">
                {fontSize}px
              </span>
              <button
                onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                className="text-sm font-medium text-slate-600 hover:text-violet-600 transition-colors"
              >
                A+
              </button>
            </div>
          </div>
        </header>

        {/* Reading Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-8 py-10">
            {/* Chapter Title */}
            <h1 className="text-2xl font-bold text-slate-900 mb-8">
              {selectedChapter.title}
            </h1>

            {/* Chapter Content */}
            <div
              className="reading-content text-slate-800"
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: 1.7,
                fontFamily: "Charter, Georgia, 'Times New Roman', serif",
              }}
              dangerouslySetInnerHTML={{
                __html: formatContent(selectedChapter.content),
              }}
            />

            {/* Navigation */}
            <div className="flex items-center justify-between mt-16 pt-8 border-t border-slate-200">
              <button
                onClick={() =>
                  setSelectedChapterIndex(Math.max(0, selectedChapterIndex - 1))
                }
                disabled={selectedChapterIndex === 0}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-violet-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Chapter
              </button>

              <span className="text-sm text-slate-400">
                {selectedChapterIndex + 1} of {book.chapters.length}
              </span>

              <button
                onClick={() =>
                  setSelectedChapterIndex(
                    Math.min(book.chapters.length - 1, selectedChapterIndex + 1)
                  )
                }
                disabled={selectedChapterIndex === book.chapters.length - 1}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-violet-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next Chapter
                <ChevronLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .reading-content p {
          margin-bottom: 1.5em;
          text-align: justify;
          hyphens: auto;
        }
        .reading-content p:first-child {
          margin-top: 0;
        }
        .reading-content p:last-child {
          margin-bottom: 0;
        }
        .reading-content strong {
          font-weight: 600;
          color: #1f2937;
        }
        .reading-content em {
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default ViewBook;