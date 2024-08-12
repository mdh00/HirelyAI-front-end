import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function App() {
  return (
    <div className="p-4">
      <Button>Hello</Button>
      
      <Button variant="destructive">Delete</Button>
      <div>
        <Badge variant="destructive">Bad</Badge>
      </div>
    </div>
  );
}

export default App;
