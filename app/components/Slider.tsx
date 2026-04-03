type SliderProps = {
  variant?: "primary" | "secondary";
};

const Slider = ({ variant = "primary" }: SliderProps) => {
  return (
    <div
      className={`h-10 w-full border-2 border-border-tertiary bg-slider-${variant}`}
    ></div>
  );
};

export default Slider;
