import './ProjectMediaDisplay.module.scss';

interface Props {
  item: { url: string; type: 'image' | 'video' };
}

function ProjectMediaDisplay({ item }: Props) {
  if (item.type === 'video') {
    return (
      <video src={item.url} autoPlay muted loop playsInline preload="none"/>
    );
  }

  return (
    <img src={item.url} loading="lazy"/>
  );
};

export default ProjectMediaDisplay;