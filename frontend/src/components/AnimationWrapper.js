export default function AnimationWrapper({ children }) {
  return (
    <div className="animate-fadein">
      {children}
    </div>
  );
}