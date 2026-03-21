import { useMemo, useState } from "react";
import { Sparkles, Type, Eye, Maximize2 } from "lucide-react";
import Button from "../ui/Button";
import InputField from "../ui/InputField";
import SimpleMDEditor from "./SimpleMDEditor";

const ChapterEditorTab = ({
  book = {
    title: "Untitled",
    chapters: [{ title: "Chapter 1", content: "-" }],
  },
  selectedChapterIndex = 0,
  onChapterChange = () => {},
  onGenerateChapterContent = () => {},
  isGenerating,
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Simple markdown parser
  const formatMarkdown = (content) => {
    if (!content) return "";
    return content
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      .replace(/\n/gim, "<br/>");
  };

  const mdeOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      toolbar: [
        "bold", "italic", "heading", "|",
        "quote", "unordered-list", "ordered-list", "|",
        "link", "image", "|",
        "preview", "side-by-side", "fullscreen",
      ],
    };
  }, []);

  if (selectedChapterIndex === null || !book.chapters[selectedChapterIndex]) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Type className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-slate-700 font-medium">Select a chapter to start editing</p>
          <p className="text-gray-400 text-sm mt-1">Choose from the sidebar to begin writing</p>
        </div>
      </div>
    );
  }

  const currentChapter = book.chapters[selectedChapterIndex];

  return (
    <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-white" : "flex-1"} flex flex-col`}>

      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 bg-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Chapter Editor</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Editing: {currentChapter.title || `Chapter ${selectedChapterIndex + 1}`}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Edit / Preview Toggle */}
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setIsPreviewMode(false)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${
                  !isPreviewMode
                    ? "bg-violet-50 text-violet-700 border-r border-violet-200"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Edit
              </button>
              <button
                onClick={() => setIsPreviewMode(true)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${
                  isPreviewMode
                    ? "bg-violet-50 text-violet-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Preview
              </button>
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Toggle Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Generate with AI */}
            <Button
              onClick={() => onGenerateChapterContent(selectedChapterIndex)}
              isLoading={isGenerating === selectedChapterIndex}
              icon={Sparkles}
              size="sm"
              className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Generate with AI
            </Button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-4">

          {/* Chapter Title */}
          <div>
            <InputField
              label="Chapter Title"
              name="title"
              value={currentChapter.title || ""}
              onChange={onChapterChange}
              placeholder="Enter chapter title..."
              className="text-xl font-semibold"
            />
          </div>

          {/* Editor / Preview Area */}
          <div className="">
            {isPreviewMode ? (
              <div className="">
                {/* Preview Mode Header */}
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-t-xl border-b-0">
                  <Eye className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-600 font-medium">Preview Mode</span>
                </div>
                {/* Preview Content */}
                <div className="border border-slate-200 rounded-b-xl p-8 bg-white min-h-[50vh]">
                  <h1 className="text-3xl font-bold text-slate-800 mb-6">
                    {currentChapter.title || "Untitled Chapter"}
                  </h1>
                  <div
                    className="prose prose-slate max-w-none"
                    style={{
                      fontFamily: "Charter, Georgia, 'Times New Roman', serif",
                      lineHeight: 1.7,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: currentChapter.content
                        ? formatMarkdown(currentChapter.content)
                        : "<p style='color:#94a3b8; font-style:italic'>No content yet. Start writing to see the preview.</p>",
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="">
                <SimpleMDEditor
                  value={currentChapter.content || ""}
                  onChange={(value) =>
                    onChapterChange({ target: { name: "content", value } })
                  }
                  options={mdeOptions}
                />
              </div>
            )}
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between py-2 px-1">
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400">
                Words: {currentChapter.content
                  ? currentChapter.content.split(/\s+/).filter(Boolean).length
                  : 0}
              </span>
              <span className="text-sm text-slate-400">
                Characters: {currentChapter.content
                  ? currentChapter.content.length
                  : 0}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-sm text-slate-400">Auto-saved</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ChapterEditorTab;