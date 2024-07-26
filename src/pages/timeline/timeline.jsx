import "./timeline.scss";
import Sidebar from "../../component/sidebar/sidebar";

export default function Timeline() {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-2/12 h-full">
        <Sidebar />
      </div>
      <div className="w-10/12 h-full bg-blur">
      <p>Hello world</p>
      </div>
    </div>
  );
}