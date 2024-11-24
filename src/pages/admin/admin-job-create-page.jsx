import { useState } from "react";
import { createJob } from "@/lib/api/jobs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function AdminJobCreatePage() {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);
  
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "",
    location: "",

  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await createJob({
        title: form.title,
        description: form.description,
        type: form.type,
        location: form.location,
      });

      console.log("API Response:", response);

      Swal.fire({
        icon: "success",
        title: "Job Posted!",
        text: "Your job posting has been successfully created.",
        timer: 3000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/admin/jobs");
      })

      setForm({
        title: "",
        description: "",
        type: "",
        location: "",
      });

    } catch (err) {
      setIsError(true);
      setError(err);
      console.error("Error creating job:", err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: err.message,
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };
  

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  console.log("form data", form);

  return (
    <section className="py-8">
      <h2>Create a Job Posting</h2>
      {error && <p className="text-destructive">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <Label className="block mb-4">Job Title</Label>
          <Input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required />
        </div>

        <div>
          <Label className="block mb-4">Description</Label>
          <Textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div>
          <Label className="block text-sm font-medium mb-4">Job Type</Label>
          <Input
            type="text"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            />
        </div>


        <div>
          <Label className="block mb-4">Location</Label>
          <Input
            type="text"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
        </div>

        <div className="mt-4">
          <Button type="submit" className="bg-card text-card-foreground w-fit">
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
}

export default AdminJobCreatePage;
