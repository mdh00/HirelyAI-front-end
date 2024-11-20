import { useParams, useNavigate } from "react-router-dom";
import { Briefcase, MapPin } from "lucide-react";
import Navigation from "@/components/shared/Navigation";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getJobById } from "@/lib/api/jobs";
import { createJobApplication } from "@/lib/api/jobApplication";
import { useAuth } from "@clerk/clerk-react";
import Swal from "sweetalert2";

function JobPage() {
  const { isLoaded, isSignedIn, user } = useAuth();

  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!params._id) {
      return;
    }

    getJobById(params._id)
      .then((job) => {
        setJob(job);
        setIsError(false);
      })
      .catch((err) => {
        setIsError(true);
        setError(err);
      })
      .finally(() => setIsLoading(false));
  }, [params._id]);


  const [formData, setFormData] = useState({
    fullName: "",
    a1: "",
    a2: "",
    a3: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      createJobApplication({
        fullName: formData.fullName,
        answers: [formData.a1, formData.a2, formData.a3],
        jobId: job._id,
      });
      // Show success toast
      Swal.fire({
        icon: 'success',
        title: 'Application Submitted!',
        text: 'Your job application has been submitted successfully.',
        timer: 3000, 
        showConfirmButton: false,
      }).then(() => {
        // Navigate to the home page after the toast is dismissed
        navigate("/"); // Redirect to home page
      });

      setFormData({
        fullName: "",
        a1: "",
        a2: "",
        a3: "",
      });

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: error.message,
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main>
      <div>
        <h2>{job.title}</h2>
        <div className="flex items-center gap-x-4 mt-4">
          <div className="flex items-center gap-x-2">
            <Briefcase />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <MapPin />
            <span>{job.location}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 py-4">
        <p>{job.description}</p>
      </div>
      <Separator />

      <form className="py-8 flex flex-col gap-y-8" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-4">
          <Label>Full Name</Label>
          <Input
            required
            value={formData.fullName}
            onChange={(event) =>
              setFormData({ ...formData, fullName: event.target.value })
            }
          />
        </div>

        <div>
          <div className="flex flex-col gap-y-4">
            <Label>{job.questions[0]}</Label>
            <Textarea
              required
              value={formData.a1}
              onChange={(event) =>
                setFormData({ ...formData, a1: event.target.value })
              }
            />
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-y-4">
            <Label>{job.questions[1]}</Label>
            <Textarea
              required
              value={formData.a2}
              onChange={(event) =>
                setFormData({ ...formData, a2: event.target.value })
              }
            />
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-y-4">
            <Label>{job.questions[2]}</Label>
            <Textarea
              required
              value={formData.a3}
              onChange={(event) =>
                setFormData({ ...formData, a3: event.target.value })
              }
            />
          </div>
        </div>

        <div className="flex gap-x-4 items-center">
          <Button type="submit" className="bg-card text-card-foreground w-fit">
            Submit
          </Button>
          <Button
            type="button"
            onClick={() =>
              setFormData({
                fullName: "",
                a1: "",
                a2: "",
                a3: "",
              })
            }
            className="w-fit"
            variant="outline"
          >
            Clear
          </Button>
        </div>
      </form>
    </main>
  );
}

export default JobPage;