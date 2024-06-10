import React, { useState, useRef } from "react";
import { useSettings } from "@/contexts/SettingsContext";
import { useWidgets } from "@/contexts/WidgetsContext";

const BackupSection = () => {
  const { settings, updateSettings } = useSettings();
  const { widgets, setWidgets } = useWidgets();
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const exportData = () => {
    const data = {
      settings,
      widgets,
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "backup.json";
    link.click();
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const json = e.target?.result;
      if (typeof json === "string") {
        const data = JSON.parse(json);
        if (data.settings && data.widgets) {
          updateSettings(data.settings);
          setWidgets(data.widgets);
          setImportMessage("Items imported successfully!");
        }
      }
    };
    reader.readAsText(file);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <button
          onClick={exportData}
          className="rounded-md bg-transparent w-full px-2 py-1.5 outline-none border-gray-300 border hover:bg-gray-600/30 transition-all duration-300 "
        >
          Export Settings
        </button>
        <button
          onClick={triggerFileInput}
          className="rounded-md bg-transparent w-full px-2 py-1.5 outline-none border-gray-300 border hover:bg-gray-600/30 transition-all duration-300 "
        >
          Import Settings
        </button>
        <input
          type="file"
          accept=".json"
          onChange={importData}
          className="hidden"
          ref={fileInputRef}
        />
        {importMessage && (
          <p className="text-green-500 text-sm">{importMessage}</p>
        )}
      </div>
    </div>
  );
};

export default BackupSection;
