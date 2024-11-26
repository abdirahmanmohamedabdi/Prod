"use client";

import { useRouter } from "next/navigation"; // Import from next/navigation
import { useEffect, useState } from "react";

// Sample student data
const sampleStudents = [
  { id: 1, name: "Alice Johnson", dob: "2005-06-15", dateJoined: "2020-09-01", graduated: false },
  { id: 2, name: "Ethan Brown", dob: "2007-04-20", dateJoined: "2021-03-15", graduated: false },
  { id: 3, name: "Sophia Davis", dob: "2006-11-30", dateJoined: "2019-01-10", graduated: true },
  { id: 4, name: "Liam Wilson", dob: "2008-02-25", dateJoined: "2022-05-20", graduated: false },
  { id: 5, name: "Olivia Martinez", dob: "2005-08-12", dateJoined: "2020-07-14", graduated: true },
  { id: 6, name: "Noah Anderson", dob: "2006-09-05", dateJoined: "2019-11-22", graduated: false },
  { id: 7, name: "Isabella Thomas", dob: "2007-12-18", dateJoined: "2021-06-30", graduated: false },
  { id: 8, name: "Mason Jackson", dob: "2008-03-10", dateJoined: "2022-08-25", graduated: false },
  { id: 9, name: "Mia White", dob: "2005-10-22", dateJoined: "2020-02-17", graduated: true },
  { id: 10, name: "James Harris", dob: "2006-07-08", dateJoined: "2019-04-05", graduated: false },
  { id: 11, name: "Ava Clark", dob: "2007-01-14", dateJoined: "2021-09-12", graduated: false },
  { id: 12, name: "Lucas Lewis", dob: "2008-05-19", dateJoined: "2022-11-03", graduated: false },
  { id: 13, name: "Amelia Robinson", dob: "2005-11-27", dateJoined: "2020-06-21", graduated: true },
  { id: 14, name: "Benjamin Walker", dob: "2006-03-03", dateJoined: "2019-08-09", graduated: false },
  { id: 15, name: "Charlotte Hall", dob: "2007-09-29", dateJoined: "2021-12-15", graduated: false },
];

export default function StudentDetailsPage({ params }) {
  const { id } = params;  // Accessing the `id` directly from params
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch student details based on `id`
  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        // Simulate an API call to fetch student details
        const fetchedStudent = sampleStudents.find((s) => s.id === parseInt(id));
        if (fetchedStudent) {
          setStudent(fetchedStudent);
        } else {
          throw new Error("Student not found");
        }
      } catch (error) {
        console.error("Error fetching student details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!student) {
    return <div>Student not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Student Details</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Name</h2>
            <p className="text-gray-900">{student.name}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Date of Birth</h2>
            <p className="text-gray-900">{student.dob}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Date Joined</h2>
            <p className="text-gray-900">{student.dateJoined}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Graduated</h2>
            <p className="text-gray-900">{student.graduated ? "Yes" : "No"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
