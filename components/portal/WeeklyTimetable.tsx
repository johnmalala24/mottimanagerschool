"use client";

type TimetableEntry = {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  room: string | null;
  class: { name: string };
  subject: { name: string };
};

export default function WeeklyTimetable({ data }: { data: TimetableEntry[] }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Sort entries by startTime
  const sortedData = [...data].sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="tonal-card rounded-2xl p-lg border border-outline-variant shadow-sm bg-surface">
      <h3 className="text-title-md font-bold mb-md flex items-center gap-xs">
        <span className="material-symbols-outlined text-primary">calendar_month</span>
        Weekly Class Schedule
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-md">
        {days.map((day) => {
          const dayLessons = sortedData.filter(
            (item) => item.dayOfWeek.toLowerCase() === day.toLowerCase()
          );

          return (
            <div key={day} className="space-y-sm bg-surface-container-low p-sm rounded-xl border border-outline-variant/50">
              <h4 className="font-bold text-label-md text-secondary border-b border-outline-variant pb-xs text-center uppercase tracking-wider">
                {day}
              </h4>
              {dayLessons.length === 0 ? (
                <p className="text-xs text-secondary/60 text-center py-md italic">No lessons</p>
              ) : (
                dayLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="p-sm bg-primary/5 hover:bg-primary/10 rounded-lg border border-primary/10 transition-colors"
                  >
                    <p className="font-semibold text-body-medium text-primary">{lesson.subject.name}</p>
                    <p className="text-xs text-secondary font-medium mt-xs">{lesson.class.name}</p>
                    <div className="flex justify-between items-center mt-sm text-[11px] text-secondary/70">
                      <span className="flex items-center gap-[2px]">
                        <span className="material-symbols-outlined text-[12px]">schedule</span>
                        {lesson.startTime} - {lesson.endTime}
                      </span>
                      {lesson.room && (
                        <span className="flex items-center gap-[2px]">
                          <span className="material-symbols-outlined text-[12px]">room</span>
                          {lesson.room}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
