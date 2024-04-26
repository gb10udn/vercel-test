import { NextPage } from "next";
import { useState, useEffect } from "react";

const IndexPage: NextPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImage().then((newImage) => {
      setImageUrl(newImage.url);
      setLoading(false);
    })
  }, []);

  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  }

  return (
    <div>
      <button onClick={handleClick}>他のにゃんこも見る</button>
      <div>{ loading || <img src={imageUrl} /> }</div>
    </div>
  );
}

export default IndexPage;

type Image = {
  url: string;
}

const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const image = await res.json();
  console.log(image);
  return image[0];
}