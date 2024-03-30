import default2 from "/src/assets/default2.jpg";

type Props = {
  url: string,
  isFromHellof: boolean
}

const RecipePicture = ({ url, isFromHellof }: Props) => {
  return (
    <img
      src={
        url
          ? isFromHellof
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