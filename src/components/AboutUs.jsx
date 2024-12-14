import React from "react";

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <header className="bg-black text-white py-10">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl font-bold">About Us</h1>
                    <p className="mt-4 text-lg">
                        Welcome to Sneaker Haven - where passion meets style!
                    </p>
                </div>
            </header>

            {/* Content Section */}
            <main className="container mx-auto px-6 py-16">
                {/* Our Journey */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-800">
                        Our Journey
                    </h2>
                    <p className="mt-6 text-gray-600 leading-relaxed">
                        Sneaker Haven began as a dream—a dream to create a place
                        where sneaker lovers like us could find not only the
                        latest releases but also timeless classics that resonate
                        with every step of their journey. Founded in 2015 by a
                        small group of sneaker enthusiasts, we started as a
                        humble boutique store catering to our local community.
                        Over the years, thanks to your unwavering support, we've
                        grown into a globally recognized retailer known for
                        authenticity, quality, and exceptional service.
                        <br />
                        <br />
                        For us, sneakers are more than just footwear. They are
                        symbols of culture, creativity, and individuality. Every
                        pair tells a story, and we’re here to help you find
                        yours. Whether you're a collector hunting for that
                        elusive limited edition or a casual buyer looking for
                        comfort and style, Sneaker Haven is your go-to
                        destination.
                    </p>
                </section>

                {/* Our Mission */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-800">
                        Our Mission
                    </h2>
                    <p className="mt-6 text-gray-600 leading-relaxed">
                        Our mission is to redefine the sneaker shopping
                        experience by providing unparalleled access to the best
                        sneakers from around the world. We strive to create a
                        space where sneaker culture thrives, innovation meets
                        craftsmanship, and every customer feels valued. At
                        Sneaker Haven, our goals include:
                    </p>
                    <ul className="list-disc pl-8 mt-4 text-gray-600">
                        <li>
                            Offering a curated collection of authentic sneakers,
                            from rare gems to everyday essentials.
                        </li>
                        <li>
                            Ensuring customer satisfaction through fast
                            shipping, hassle-free returns, and top-notch
                            service.
                        </li>
                        <li>
                            Promoting sustainability by collaborating with
                            eco-friendly brands and encouraging responsible
                            consumption.
                        </li>
                        <li>
                            Building a global community of sneaker enthusiasts
                            who share our love for footwear and culture.
                        </li>
                    </ul>
                </section>

                {/* Our Values */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-800">
                        Our Core Values
                    </h2>
                    <p className="mt-6 text-gray-600 leading-relaxed">
                        At Sneaker Haven, our core values guide everything we
                        do. They shape our vision, fuel our passion, and ensure
                        that every customer interaction is meaningful. Here’s
                        what we stand for:
                    </p>
                    <ul className="list-disc pl-8 mt-4 text-gray-600">
                        <li>
                            <strong>Authenticity:</strong> Every sneaker we sell
                            is guaranteed authentic. We work directly with
                            brands and trusted suppliers to ensure our customers
                            get the real deal.
                        </li>
                        <li>
                            <strong>Quality:</strong> We believe in providing
                            nothing but the best. From premium materials to
                            meticulous craftsmanship, our products are built to
                            last.
                        </li>
                        <li>
                            <strong>Inclusivity:</strong> Sneakers are for
                            everyone, regardless of age, gender, or background.
                            We celebrate diversity and welcome all sneaker
                            lovers to our community.
                        </li>
                        <li>
                            <strong>Innovation:</strong> From adopting
                            sustainable practices to embracing the latest
                            trends, we’re always looking for ways to improve and
                            evolve.
                        </li>
                    </ul>
                </section>

                {/* Meet Our Team */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-800">
                        Meet Our Team
                    </h2>
                    <p className="mt-6 text-gray-600 leading-relaxed">
                        Behind every great sneaker store is a dedicated team of
                        passionate individuals who work tirelessly to make your
                        experience seamless. At Sneaker Haven, we’re proud to
                        have a diverse group of professionals who bring their
                        unique talents and expertise to the table.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 shadow-lg rounded-lg text-center"
                            >
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-28 h-28 mx-auto rounded-full object-cover"
                                />
                                <h3 className="mt-6 text-lg font-semibold text-gray-800">
                                    {member.name}
                                </h3>
                                <p className="text-gray-600">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-800">
                        Why Choose Us?
                    </h2>
                    <p className="mt-6 text-gray-600 leading-relaxed">
                        With so many options out there, why choose Sneaker
                        Haven? Because we prioritize you—the customer. Here’s
                        why thousands of sneaker lovers trust us:
                    </p>
                    <ul className="list-disc pl-8 mt-4 text-gray-600">
                        <li>
                            <strong>Wide Selection:</strong> From retro classics
                            to the hottest releases, we have something for
                            everyone.
                        </li>
                        <li>
                            <strong>Fast Shipping:</strong> Get your favorite
                            sneakers delivered right to your doorstep in record
                            time.
                        </li>
                        <li>
                            <strong>Easy Returns:</strong> Not satisfied with
                            your purchase? Our hassle-free return policy has you
                            covered.
                        </li>
                        <li>
                            <strong>Exclusive Deals:</strong> Enjoy exclusive
                            discounts and promotions when you shop with us.
                        </li>
                        <li>
                            <strong>Community Engagement:</strong> Join a global
                            network of sneaker enthusiasts who share your
                            passion.
                        </li>
                    </ul>
                </section>
            </main>
        </div>
    );
};

// Team Members Array
const teamMembers = [
    {
        name: "Duong Khanh Duy",
        role: "Founder & CEO",
        image: "https://shorturl.at/4yhnf",
    },
    {
        name: "Duong Khanh Duy",
        role: "Chief Technology Officer",
        image: "https://shorturl.at/4yhnf",
    },
    {
        name: "Duong Khanh Duy",
        role: "A chief operating officer",
        image: "https://shorturl.at/4yhnf",
    },
];

export default AboutUs;
