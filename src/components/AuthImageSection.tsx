import Image from "next/image";

export default function AuthImageSection() {
  return (
    <div className="relative lg:h-[944px] lg:w-[720px] w-full h-full">
      <Image
        src="/signup.jpg"
        alt="Team working"
        fill
        className="object-cover rounded-lg"
        priority
      />
      <div className="absolute lg:p-6 p-2 bottom-0 left-0 bg-black/40 text-white w-full">
        <h2 className="lg:text-2xl text-sm font-semibold mb-2">
          Welcome to WORKHIVE!
        </h2>
        <ul className="lg:text-sm text-xs space-y-1 list-disc list-inside">
          <li>
            <strong>Employee Management:</strong> View detailed profiles, track
            performance, and manage attendance.
          </li>
          <li>
            <strong>Performance Insights:</strong> Analyze team goals, progress,
            and achievements.
          </li>
          <li>
            <strong>Attendance & Leaves:</strong> Track attendance patterns and
            manage leave requests effortlessly.
          </li>
        </ul>
      </div>
    </div>
  );
}
