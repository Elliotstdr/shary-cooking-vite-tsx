import default2 from "/src/assets/default2.jpg";

type Props = {
  url: string
}

const RecipePicture = ({ url }: Props) => {
  return (
    <img
      src={
        url
          ? url.includes(import.meta.env.VITE_BASE_HF_IMAGE_URL)
            ? url
            : import.meta.env.VITE_BASE_URL_API + url
          : default2
      }
      alt="Fond news"
      loading="lazy"
      onError={(e) => e.currentTarget.src = default2}
    />
  );
};

export default RecipePicture;