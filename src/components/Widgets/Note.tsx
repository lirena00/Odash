import { useSettings } from "@/contexts/SettingsContext";
import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { PlusIcon } from "@/components/Icons/PlusIcon";
import { MinusIcon } from "@/components/Icons/MinusIcon";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const NoteDimensions = {
  x: 0,
  y: 0,
  w: 5,
  h: 12,
  minW: 4,
  minH: 2,
  maxW: 7,
  maxH: 13,
};

interface NoteProps {
  title: string;
  description: string;
  id: string;
  onUpdate: (id: string, title: string, description: string) => void;
}

const Note: React.FC<NoteProps> = ({ title, description, id, onUpdate }) => {
  const { settings } = useSettings();
  const theme = settings.theme;

  const [noteContent, setNoteContent] = useState(description);
  const [noteTitle, setNotetitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Create a debounced version of the onUpdate function
    const debouncedUpdate = debounce((id, title, description) => {
      onUpdate(id, title, description);
    }, 500); // Adjust the debounce delay as needed

    debouncedUpdate(id, noteTitle, noteContent);

    // Cleanup function to cancel debounced calls on unmount
    return () => {
      debouncedUpdate.cancel();
    };
  }, [noteTitle, noteContent, id, onUpdate]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotetitle(event.target.value);
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNoteContent(event.target.value);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div
      className={`widget w-full h-full max-h-96 overflow-y-auto space-y-2 rounded-md p-2 ${
        theme === "dark"
          ? "dark"
          : theme === "light"
          ? "light"
          : "bg-accent text-solid-text"
      } `}
    >
      <div className="flex justify-between items-center">
        <input
          defaultValue={noteTitle}
          onChange={handleTitleChange}
          className="text-2xl w-fit bg-transparent outline-none border-none max-w-[85%]"
        />
        <button onClick={toggleEditMode} className="bg-white/50 rounded-md p-2">
          {isEditing ? <MinusIcon /> : <PlusIcon />}
        </button>
      </div>

      <div className="flex flex-col gap-2 h-[85%]  overflow-y-auto">
        {isEditing ? (
          <textarea
            value={noteContent}
            placeholder="Add a note (supports markdown)"
            onChange={handleContentChange}
            className="w-full h-full p-2 bg-transparent outline-none border border-white/50 rounded-md"
          />
        ) : (
          <Markdown
            remarkPlugins={[remarkGfm]}
            className="prose text-white h-[85%]"
          >
            {noteContent}
          </Markdown>
        )}
      </div>
    </div>
  );
};

export default Note;
