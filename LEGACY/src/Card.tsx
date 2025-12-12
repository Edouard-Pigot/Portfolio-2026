import type { JSX } from 'react';
import './Card.css'
import { useTranslation } from "react-i18next";

function Card(props: {title?: string, contentSrc?: string}) {
	const { t, } = useTranslation();

  const contentSrcRegex = new RegExp("\\.(webp|png|jpg|jpeg|gif|avi|webm)$");
  const fileExtension = contentSrcRegex.exec(props.contentSrc || "")?.[0];
  console.log("File extension:", fileExtension);

  let contentElement: JSX.Element | null = null;
  if(fileExtension === ".png" || fileExtension === ".jpg" || fileExtension === ".jpeg"  || fileExtension === ".gif" || fileExtension === ".webp") {
    contentElement = <img src={props.contentSrc}/>;
  } else if(fileExtension === ".avi" || fileExtension === ".webm") {
    contentElement = (
    <>
      <video autoPlay loop muted>
        <source src={props.contentSrc} type={`video/${fileExtension.substring(1)}`} />
      </video>
    </>);
  }

  console.log(contentElement);

  return (
    <>
      <div className="card">
        <h2>{props.title}</h2>
        {contentElement}
      </div>
    </>
  )
}

export default Card;
