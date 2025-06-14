import Image from "next/image";

export default function AuthImageSection() {
  return (
    <div className="lg:w-1/2 w-full relative lg:h-auto">
      <Image
        src="/signup.jpg"
        alt="Team working"
        fill
        className="object-cover rounded-lg"
        priority
      />
      <div className="absolute p-6 bottom-0 left-0 bg-black/40 text-white w-full">
        <h2 className="text-2xl font-semibold mb-2">Welcome to WORKHIVE!</h2>
        <ul className="text-sm space-y-1 list-disc list-inside">
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
