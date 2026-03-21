import { Type } from "lucide-react";
import MDEditor, { commands } from "@uiw/react-md-editor";

const SimpleMDEditor = ({ value, onChange, options }) => {
  return (
    <div
      className="border border-slate-200 rounded-xl overflow-hidden"
      data-color-mode="light"
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-white border-b border-slate-200">
        <Type className="w-4 h-4 text-slate-500" />
        <span className="text-sm text-slate-600 font-medium">Markdown Editor</span>
      </div>

      {/* Editor */}
      <div className="w-full">
        <MDEditor
          value={value}
          onChange={onChange}
          height={400}
          preview="live"
          commands={[
            commands.bold,
            commands.italic,
            commands.strikethrough,
            commands.hr,
            commands.title,
            commands.divider,
            commands.link,
            commands.code,
            commands.image,
            commands.unorderedListCommand,
            commands.orderedListCommand,
            commands.checkedListCommand,
          ]}
          hideMenu={true}
          style={{
            borderRadius: 0,
            border: "none",
            boxShadow: "none",
          }}
        />
      </div>
    </div>
  );
};

export default SimpleMDEditor;