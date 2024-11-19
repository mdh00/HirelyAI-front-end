export const createJobApplication = async (data) => {
    const token = await window.Clerk?.session?.getToken();
    
    const res = await fetch("http://localhost:8000/api/jobapplications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        fullName: data.fullName,
        answers: data.answers,
        job: data.jobId,
      }),
    });
  };