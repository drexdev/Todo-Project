import { useState } from "react";

interface TaskFormProps {
  title?: string;
  description?: string;
  onSubmit: (title: string, description: string) => void;
}

export const TaskForm = ({ title, description, onSubmit }: TaskFormProps) => {
  const [titleValue, setTitleValue] = useState<string>(title || "");
  const [descriptionValue, setDescriptionValue] = useState<string>(description || "");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(titleValue, descriptionValue);
  };

  return (
    <form className="mt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label className="text-sm font-medium">Titulo da Tarefa:</label>
        <input
          type="text"
          minLength={3}
          maxLength={30}
          value={titleValue}
          onChange={(event) => setTitleValue(event.target.value)}
          placeholder="Ex.: Estudar React"
          className="w-full border border-slate-300 rounded-md py-3 px-4 text-sm"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium">Descricão da Tarefa:</label>
        <input
          type="text"
          minLength={3}
          maxLength={50}
          value={descriptionValue}
          onChange={(event) => setDescriptionValue(event.target.value)}
          placeholder="Ex.: Estudar programação."
          className="w-full border border-slate-300 rounded-md py-3 px-4 text-sm"
          required
        />
      </div>

      <button
        type="submit"
        disabled={!titleValue || !descriptionValue}
        className="py-3 px-4 bg-indigo-600 text-white font-medium rounded-md cursor-pointer transition-opacity hover:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Criar Tarefa
      </button>
    </form>
  );
};
