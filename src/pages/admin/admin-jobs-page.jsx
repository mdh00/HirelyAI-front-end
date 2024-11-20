import JobCard from "@/components/shared/JobCard";
import { useEffect, useState } from "react";
import { getJobs } from "@/lib/api/jobs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function AdminJobsPage() {
    const[jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getJobs()
        .then((data) => {
          setIsError(false);
          setJobs(data)
        })
        .catch((error) => {
          setIsError(true);
          setError(error);
        })
        .finally(() => setIsLoading(false));
      }, []);

      if (isLoading) {
        return (
          <section className="py-8">
            <h2>Current Job Posts</h2>
            <p className="text-white">Loading...</p>
          </section>
        );
      }
    
      if (isError) {
        return (
          <section className="py-8">
            <h2>Current Job Posts</h2>
            <p className="text-destructive">Error: {error.message}</p>
          </section>
        );
      }

    return (
        <section className="py-8"> 
        <div className="flex">
        <Button onClick={() => navigate("/admin/jobs/create")} className="mb-4 ml-auto size-fit">
        Post a Job
      </Button>
      </div>
        <h2>Active Job Opening</h2>
        <div className="mt-4 flex flex-col gap-y-4">
          {jobs.map((job) => (
           <JobCard key={job._id} job={job} isAdmin={true}/>
          ))}
        </div>
        </section>
    );
}

export default AdminJobsPage;