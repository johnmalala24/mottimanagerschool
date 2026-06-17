import { formatDate } from "@/lib/format";
import { computeMean } from "@/lib/server/grade-calc";
import PrintReportButton from "@/components/portal/PrintReportButton";
import type { SchoolBranding } from "@/lib/school-branding";

type ReportCardProps = {
  branding: SchoolBranding | null;
  studentName: string;
  admissionNumber: string;
  className: string;
  term: string;
  academicYear: string;
  grades: {
    subject: { name: string; code: string };
    marks: number | null;
    gradePoint: string | null;
    examName: string;
  }[];
  cbe: { learningArea: string; level: string }[];
  attendanceRate: number | null;
  totalMarks: number;
  position: number | null;
  principalName?: string | null;
};

export default function ReportCard({
  branding,
  studentName,
  admissionNumber,
  className,
  term,
  academicYear,
  grades,
  cbe,
  attendanceRate,
  totalMarks,
  position,
  principalName,
}: ReportCardProps) {
  const theme = branding?.themeColor ?? "#006b2c";
  const schoolName = branding?.schoolName ?? "School";
  const marksList = grades.map((g) => g.marks);
  const average = computeMean(marksList);

  return (
    <div className="report-card bg-white border border-outline-variant rounded-xl overflow-hidden print:shadow-none print:border-black">
      <div className="report-card-header px-lg py-md text-white flex items-center justify-between gap-md" style={{ backgroundColor: theme }}>
        <div className="flex items-center gap-md">
          {branding?.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={branding.logo} alt="" className="w-12 h-12 rounded-lg object-cover bg-white/20" />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined icon-filled">school</span>
            </div>
          )}
          <div>
            <h1 className="text-title-md font-bold">{schoolName}</h1>
            {branding?.motto && <p className="text-label-sm opacity-90">{branding.motto}</p>}
          </div>
        </div>
        <div className="text-right text-label-sm">
          <p className="font-bold">REPORT CARD</p>
          <p>{term} · {academicYear}</p>
        </div>
      </div>

      <div className="px-lg py-md grid sm:grid-cols-2 gap-md border-b border-outline-variant bg-surface-container-lowest">
        <div>
          <p className="text-label-sm text-secondary">Student Name</p>
          <p className="font-bold text-on-surface">{studentName}</p>
        </div>
        <div>
          <p className="text-label-sm text-secondary">Admission No.</p>
          <p className="font-bold">{admissionNumber}</p>
        </div>
        <div>
          <p className="text-label-sm text-secondary">Class</p>
          <p className="font-bold">{className}</p>
        </div>
        <div>
          <p className="text-label-sm text-secondary">Generated</p>
          <p className="font-bold">{formatDate(new Date())}</p>
        </div>
      </div>

      {grades.length > 0 && (
        <div className="px-lg py-md">
          <h3 className="text-label-md font-bold text-secondary uppercase mb-sm">Academic Performance</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-outline-variant">
                <th className="text-left py-2 font-bold">Subject</th>
                <th className="text-center py-2 font-bold">Exam</th>
                <th className="text-center py-2 font-bold">Marks</th>
                <th className="text-center py-2 font-bold">Grade</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g, i) => (
                <tr key={i} className="border-b border-outline-variant/50">
                  <td className="py-2 font-medium">{g.subject.name}</td>
                  <td className="py-2 text-center text-secondary">{g.examName}</td>
                  <td className="py-2 text-center font-bold">{g.marks ?? "—"}</td>
                  <td className="py-2 text-center">
                    <span className="inline-block px-2 py-0.5 rounded bg-primary/10 text-primary font-bold text-xs">
                      {g.gradePoint ?? "—"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-md flex flex-wrap gap-lg text-sm">
            <div><span className="text-secondary">Total:</span> <strong>{totalMarks}</strong></div>
            <div><span className="text-secondary">Average:</span> <strong>{average ?? "—"}</strong></div>
            {position != null && <div><span className="text-secondary">Class Position:</span> <strong>{position}</strong></div>}
            {attendanceRate != null && <div><span className="text-secondary">Attendance:</span> <strong>{attendanceRate}%</strong></div>}
          </div>
        </div>
      )}

      {cbe.length > 0 && (
        <div className="px-lg py-md border-t border-outline-variant">
          <h3 className="text-label-md font-bold text-secondary uppercase mb-sm">CBE Competencies</h3>
          <div className="grid sm:grid-cols-2 gap-sm">
            {cbe.map((c, i) => (
              <div key={i} className="flex justify-between py-1 text-sm border-b border-outline-variant/30">
                <span>{c.learningArea}</span>
                <span className="font-bold text-primary">{c.level}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="px-lg py-md border-t border-outline-variant flex justify-between items-end mt-md">
        <div>
          <div className="border-t border-on-surface w-40 pt-1 mt-8">
            <p className="text-label-sm text-secondary">Class Teacher</p>
          </div>
        </div>
        <div className="text-right">
          <div className="border-t border-on-surface w-40 pt-1 mt-8 ml-auto">
            <p className="text-label-sm text-secondary">{principalName ?? "Principal"}</p>
          </div>
        </div>
      </div>

      <div className="px-lg pb-md print:hidden">
        <PrintReportButton />
      </div>
    </div>
  );
}
