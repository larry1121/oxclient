import Image from "next/image";
import TaskForm from '../components/TaskForm'

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <TaskForm />
    </div>
  );
}
