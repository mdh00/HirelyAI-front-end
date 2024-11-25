import { useEffect, useState } from 'react';  
import { getJobApplicationById } from '@/lib/api/jobApplication';
import { useParams } from 'react-router-dom';

function AdminJobApplicationPage() {
  const [jobApplication, setJobApplication] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const params = useParams();

  useEffect(() => {
    if (!params.jobApplicationId) {
      return;
    }
    getJobApplicationById(params.jobApplicationId)
      .then((jobApplication) => {
        setJobApplication(jobApplication || null);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
        setError(err);
      })
      .finally(() => setIsLoading(false));
  }, [params.jobApplicationId]);

  if (isLoading) {
    return (
      <section className="py-8">
        <div className="py-8 flex items-center justify-center">
          <div className="py-8">
            <div className="flex justify-center items-center">
              <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            </div>
            <p className="text-white mt-4">Loading, please wait...</p>
          </div>
        </div>
      </section>
    );
  }
  
  const getRatingColor = (rating) => {
    switch (rating) {
      case 'good':
        return 'text-green-300'; 
      case 'Moderate':
        return 'text-yellow-200';
      case 'Bad':
        return 'text-red-500'; 
      default:
        return 'text-gray-500';
    }
  };
  
  return (
    <div>
      {jobApplication ? (
        <div className="mt-4">
          <h2>{jobApplication.fullName}</h2>
          {Array.isArray(jobApplication.answers) && jobApplication.answers.length > 0 ? (
            <div className="mt-4">
              <h3>Answers</h3>
              <ul>
                {jobApplication.answers.map((answer, index) => (
                  <li key={index} className="mb-2">
                    <strong>Question {index + 1}:</strong> {answer}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No answers available.</p>
          )}
          <div className={`mt-4 ${getRatingColor(jobApplication.rating)}`}>
            <h3>Rating: {jobApplication.rating}</h3>
          </div>

        </div>
      ) : (
        <div>No job application found</div>
      )}
    </div>
  );
}

export default AdminJobApplicationPage;