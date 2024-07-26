export default function Loader({ title = "Loading..." }) {
  return (
    <div className="text-center flex items-center justify-center w-full h-full">
      {title}
    </div>
  );
}
