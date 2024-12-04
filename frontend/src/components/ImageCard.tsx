interface Images {
  url: string;
}

const ImageCard = ({ url }: Images) => {
  return (
    <div className="catCard w-[252px] h-[344px] text-white rounded-md cursor-pointer relative">
      <img
        className="w-full h-full object-cover rounded-md brightness-75"
        src={url}
        alt=""
      />
    </div>
  );
};

export default ImageCard;
