import "./timeline.scss";
import Sidebar from "../../component/sidebar/sidebar";

export default function Timeline() {
    return (
      <div className="flex flex-row h-screen w-full">
        <Sidebar />
        <div className="flex-grow h-full flex flex-col p-5 space-y-1">
        </div>
      </div>
    );
  }