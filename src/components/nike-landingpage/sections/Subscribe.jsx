import Button from "../components/button";

const Subscribe = () => {
    return (
        <section
            id="contact-us"
            className="max-container flex justify-between items-center max-lg:flex-col gap-10"
        >
            <h3 className="text-4xl leading-[68px] lg:max-w-md font-palanquin font-bold ">
                Sign Up for Updates & Newsletter
            </h3>
            <div className="lg:max-w-[40%] w-full flex items-center gap-2.5 p-2.5 sm:border sm:border-slate-gray rounded-full bg-white shadow">
                <input
                    type="text"
                    placeholder="subscribe@nike.com"
                    className="flex-1 border-none outline-none text-[1rem] bg-transparent"
                />
                <Button
                    label="Sign Up"
                    className="bg-black text-white h-[40px] px-5 rounded-full flex items-center justify-center shadow transition-all duration-500 ease-in-out hover:bg-gray-800"
                />
            </div>
        </section>
    );
};

export default Subscribe;
