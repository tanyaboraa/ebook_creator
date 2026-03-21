import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { UploadCloud } from "lucide-react";
import { BASE_URL } from "../../utils/apiPaths";

const BookDetailsTab = ({
  book,
  onBookChange,
  onCoverUpload,
  isUploading,
  fileInputRef,
}) => {
  const coverImageUrl = book.coverImage?.startsWith("http")
    ? book.coverImage
    : `${BASE_URL}/backend${book.coverImage}`.replace(/\\/g, "/");

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-8 space-y-6">

      {/* Book Details Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <h3 className="text-xl font-semibold text-slate-800 mb-6">Book Details</h3>

        {/* Title + Author side by side */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <InputField
            label="Title"
            name="title"
            value={book.title || ""}
            onChange={onBookChange}
          />
          <InputField
            label="Author"
            name="author"
            value={book.author || ""}
            onChange={onBookChange}
          />
        </div>

        {/* Subtitle full width */}
        <InputField
          label="Subtitle"
          name="subtitle"
          value={book.subtitle || ""}
          onChange={onBookChange}
        />
      </div>

      {/* Cover Image Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <h3 className="text-xl font-semibold text-slate-800 mb-6">Cover Image</h3>

        <div className="flex items-start gap-6">
          {/* Cover preview */}
          <div className="w-32 h-44 rounded-lg border border-slate-200 overflow-hidden shrink-0 bg-slate-50">
            <img
              src={coverImageUrl}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Upload area */}
          <div className="flex flex-col gap-3 pt-1">
            <p className="text-sm text-slate-500">
              Upload a new cover image. Recommended size: 600x800px.
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={onCoverUpload}
              className="hidden"
              accept="image/*"
            />
            <Button
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
              isLoading={isUploading}
              className="flex items-center gap-2 w-fit"
            >
              <UploadCloud className="w-4 h-4" />
              Upload Image
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default BookDetailsTab;