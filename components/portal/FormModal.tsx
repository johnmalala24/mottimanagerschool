"use client";

import { useState } from "react";
import AssignmentForm from "./forms/AssignmentForm";
import ExamForm from "./forms/ExamForm";

type FormModalProps = {
  table: "assignment" | "exam";
  type: "create" | "update" | "delete";
  data?: any;
  classes: any[];
  subjects: any[];
  id?: string;
};

export default function FormModal({ table, type, data, classes, subjects }: FormModalProps) {
  const [open, setOpen] = useState(false);

  const getButtonClass = () => {
    if (type === "create") {
      return "w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white hover:opacity-90";
    }
    if (type === "delete") {
      return "w-7 h-7 flex items-center justify-center rounded-full bg-error text-white hover:opacity-90";
    }
    return "w-7 h-7 flex items-center justify-center rounded-full bg-secondary text-white hover:opacity-90";
  };

  const getButtonText = () => {
    if (type === "create") {
      return <span className="material-symbols-outlined text-[18px]">add</span>;
    }
    if (type === "delete") {
      return <span className="material-symbols-outlined text-[16px]">delete</span>;
    }
    return <span className="material-symbols-outlined text-[16px]">edit</span>;
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className={getButtonClass()}>
        {getButtonText()}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-surface tonal-card rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl relative border border-outline-variant">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-secondary hover:text-primary"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="p-lg pt-xl">
              {table === "assignment" && (
                <AssignmentForm
                  type={type}
                  data={data}
                  classes={classes}
                  subjects={subjects}
                  onClose={() => setOpen(false)}
                />
              )}
              {table === "exam" && (
                <ExamForm
                  type={type}
                  data={data}
                  classes={classes}
                  subjects={subjects}
                  onClose={() => setOpen(false)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
