import Button from "./Button";

export default function FilePicker({ file, setFile, readFile }) {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          type="file"
          accept="image/*"
          id="file-upload"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload Image
        </label>
        <p className="mt-2 text-gray-800 text-xs truncate">
          {file === "" ? "No file selected" : file.name}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button type="outline" onClick={() => readFile("logo", file)} className="text-xs">
          Logo
        </Button>
        <Button type="filled" onClick={() => readFile("full", file)} className="text-xs">
          Full
        </Button>
      </div>
    </div>
  );
}
