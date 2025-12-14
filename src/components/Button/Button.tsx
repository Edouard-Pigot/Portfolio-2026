import './Button.scss';

export default function Button (prop: {color?: string, children?: React.ReactNode, className?: string}) {
  return (
    <button className={`button ${prop.color || ''} ${prop.className || ''}`}>
      {prop.children}
    </button>
  );
}