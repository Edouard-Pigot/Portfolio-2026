import './Dot.scss';

export default function Dot (prop: {color?: string, backgroundColor?: string}) {
  return (
    <div className={`dot bg-${prop.backgroundColor} ${prop.color}`}></div>
  );
}