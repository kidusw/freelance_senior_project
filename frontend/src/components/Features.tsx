import { RiCheckboxCircleLine } from "react-icons/ri";
const Features = () => {
  return (
    <div className="bg-green-50 py-10 mt-10">
      <div className="lg:w-[90%] mx-auto">
        <div className="flex justify-center lg:justify-between gap-x-10 items-center">
          <div className="left">
            <h2 className="text-2xl text-black font-semibold mb-3 px-5">
              A whole world of freelance talent at your fingertips
            </h2>

            <div className="flex flex-col gap-y-1 px-5 mb-3">
              <div className="title flex items-center gap-x-1 text-green-900">
                <RiCheckboxCircleLine size={25} />
                <h4 className="text-xl b">The best for every budget</h4>
              </div>
              <p>
                Find high-quality services at every price point. No hourly rate,
                just project-based pricing
              </p>
            </div>
            <div className="flex flex-col gap-y-1 px-5 mb-3">
              <div className="title flex items-center gap-x-1 text-green-900">
                <RiCheckboxCircleLine size={25} />
                <h4 className="text-xl b">Quality work done quickly</h4>
              </div>
              <p>
                Find the right freelancer to begin working on your project
                within minutes
              </p>
            </div>
            <div className="flex flex-col gap-y-1 px-5 mb-3">
              <div className="title flex items-center gap-x-1 text-green-900">
                <RiCheckboxCircleLine size={25} />
                <h4 className="text-xl b">Protected payment, every time</h4>
              </div>
              <p>Always know what you'll pay upfront.</p>
            </div>
          </div>
          <div className="right hidden lg:block w-[550px] ">
            <img className="rounded-lg" src="/img/man2.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Features;
