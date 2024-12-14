import { useEffect } from "react";
import {
    CustomerReviews,
    Hero,
    PopularProducts,
    Services,
    SpecialOffer,
    Subscribe,
    SuperQuality,
} from "./sections";

const LandingPage = () => {
    return (
        <div className="relative px-36">
            <section className="xl:padding-l wide:padding-r padding-b  ">
                <Hero />
            </section>
            <section className="padding ">
                <PopularProducts />
            </section>
            <section className="padding">
                <SuperQuality />
            </section>
            <section className="padding-x py-10">
                <Services />
            </section>
            <section className="padding pb-10">
                <SpecialOffer />
            </section>
            <section className="bg-pale-blue padding rounded-3xl">
                <CustomerReviews />
            </section>
            <section className="padding-x sm:py-32 py-16 w-full">
                <Subscribe />
            </section>
        </div>
    );
};

export default LandingPage;
