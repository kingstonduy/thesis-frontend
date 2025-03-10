import React from "react";

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section with Background Image */}
            <header
                className="bg-cover bg-center text-white py-10"
                style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1600185365926-9d2f1d2b7a5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
                }}
            >
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl font-bold">About Us</h1>
                    <p className="mt-4 text-lg">
                        Welcome to Sneaker Haven - where passion meets style!
                    </p>
                    <p className="mt-2 text-md italic">
                        "Step into a world of sneakers, culture, and community."
                    </p>
                </div>
            </header>

            {/* Content Section */}
            <main className="container mx-auto px-6 py-16">
                {/* Our Journey with Milestones */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-800">
                        Our Journey
                    </h2>
                    <p className="mt-6 text-gray-600 leading-relaxed">
                        Sneaker Haven began as a dream—a dream to create a place
                        where sneaker lovers could find the latest releases and
                        timeless classics that resonate with their journey.
                        Founded in 2015 by a group of enthusiasts, we started as
                        a small boutique in New York City. Thanks to your
                        support, we’ve grown into a globally recognized retailer
                        celebrated for authenticity, quality, and service.
                        <br />
                        <br />
                        **Key Milestones:**
                        <ul className="list-disc pl-8 mt-2">
                            <li>2015: First store opened in NYC.</li>
                            <li>2017: Launched our online store.</li>
                            <li>2019: Named "Best Sneaker Retailer" at the Global Footwear Awards.</li>
                            <li>2021: Partnered with eco-friendly brands for sustainability.</li>
                            <li>2023: Reached 1 million community members.</li>
                        </ul>
                        <br />
                        Sneakers are more than footwear to us—they’re symbols of
                        culture, creativity, and individuality. Whether you’re a
                        collector or a casual fan, we’re here to help you find
                        your perfect pair.
                    </p>
                </section>

                {/* Our Mission with Expanded Details */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-800">
                        Our Mission
                    </h2>
                    <p className="mt-6 text-gray-600 leading-relaxed">
                        We aim to redefine sneaker shopping by offering
                        unparalleled access to the world’s best sneakers while
                        fostering a thriving sneaker culture. Our goals include:
                    </p>
                    <ul className="list-disc pl-8 mt-4 text-gray-600">
                        <li>
                            Curating authentic sneakers, from rare finds to
                            everyday staples.
                        </li>
                        <li>
                            Delivering top-notch service with fast shipping and
                            easy returns.
                        </li>
                        <li>
                            Promoting sustainability through recyclable packaging
                            and partnerships with ethical brands.
                        </li>
                        <li>
                            Building a global community via events and exclusive
                            releases.
                        </li>
                    </ul>
                    <blockquote className="mt-6 italic text-gray-500">
                        "Every step should reflect who you are." — Duong Khanh Duy, Founder
                    </blockquote>
                </section>

                {/* Our Core Values with Examples */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-800">
                        Our Core Values
                    </h2>
                    <p className="mt-6 text-gray-600 leading-relaxed">
                        Our values shape everything we do at Sneaker Haven:
                    </p>
                    <ul className="list-disc pl-8 mt-4 text-gray-600">
                        <li>
                            **Authenticity:** Every pair is verified with brands
                            and trusted suppliers.
                        </li>
                        <li>
                            **Quality:** We handpick sneakers for durability and
                            craftsmanship.
                        </li>
                        <li>
                            **Inclusivity:** Our "Sneakers for All" campaign
                            welcomes everyone.
                        </li>
                        <li>
                            **Innovation:** Features like virtual try-ons keep us
                            ahead.
                        </li>
                    </ul>
                </section>

                {/* Meet Our Team with Real Details */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-800">
                        Meet Our Team
                    </h2>
                    <p className="mt-6 text-gray-600 leading-relaxed">
                        Our passionate team makes Sneaker Haven special.
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
                                <p className="mt-2 text-sm text-gray-500">
                                    {member.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Why Choose Us with Specific Details */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-gray-800">
                        Why Choose Us?
                    </h2>
                    <p className="mt-6 text-gray-600 leading-relaxed">
                        Here’s why sneaker lovers pick us:
                    </p>
                    <ul className="list-disc pl-8 mt-4 text-gray-600">
                        <li>
                            **Wide Selection:** Over 10,000 sneaker models.
                        </li>
                        <li>
                            **Fast Shipping:** Same-day shipping before 3 PM EST.
                        </li>
                        <li>
                            **Easy Returns:** 30-day hassle-free returns.
                        </li>
                        <li>
                            **Exclusive Deals:** Loyalty members save 15% on average.
                        </li>
                        <li>
                            **Community:** Join 1 million+ enthusiasts worldwide.
                        </li>
                    </ul>
                    <blockquote className="mt-6 italic text-gray-500">
                        "Unmatched selection and service!" — Jane Doe, Customer
                    </blockquote>
                </section>
            </main>
        </div>
    );
};

// Updated Team Members Array
const teamMembers = [
    {
        name: "Duong Khanh Duy",
        role: "Founder & CEO",
        image: "https://scontent.fsgn2-4.fna.fbcdn.net/v/t39.30808-6/409178481_2169379819932639_7576753703798547393_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=yKl9rAJvI-kQ7kNvgFAr2kQ&_nc_oc=AdjRVs3GJCPwk0M1jkTXC8ISBdiLBGu8IzWF0kWjwI4R41-pUJ53rgHsNNbWYRhhdkc&_nc_zt=23&_nc_ht=scontent.fsgn2-4.fna&_nc_gid=A9la_3xwPq8xPxVMJQkEDra&oh=00_AYD4SQgLac8i1aB6ESJgWUqa6o7jQn8OIYPIOrPWvmryIg&oe=67B5D899",
        bio: "Duong’s love for sneakers sparked Sneaker Haven. He drives our focus on authenticity."
    },
    {
        name: "Jane Smith",
        role: "Chief Technology Officer",
        image: "https://via.placeholder.com/150",
        bio: "Jane keeps our tech cutting-edge, enhancing your shopping experience."
    },
    {
        name: "John Doe",
        role: "Chief Operating Officer",
        image: "https://via.placeholder.com/150",
        bio: "John ensures every order is handled with care and efficiency."
    },
];

export default AboutUs;