import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import client from '../../sanity.client';

const Footer = async () => {

  interface IPost {
    id: string;
    title: string;
    dateCreated: Date;
    image: string;
  }

  const recentPosts: IPost[] = await client.fetch(
    `*[_type == "blog"] | order(dateCreated desc)[0...3]{
      id,
      title,
      dateCreated,
      "image": image.asset->url
    }`
  );

  return (
    <footer className="bg-[#0D0D0D] w-full px-4 sm:px-8 lg:px-[150px] max-w-[1920px] pt-12">
      <div className="max-w-full mx-auto border-b border-[#FF9F0D] pb-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div className="w-full md:w-[45%] mb-8 md:mb-0">
            <h2 className="text-[24px] md:text-[32px] font-helvetica font-bold text-[#FFFFFF]">
              <span className="text-[#FF9F0D]">St</span>ill You Need Our Support?
            </h2>
            <p className="text-[14px] md:text-[16px] font-helvetica font-normal text-[#FFFFFF] mt-2">
              Do not wait; make a smart & logical quote here. Its pretty easy.
            </p>
          </div>
          <div className="flex flex-col md:flex-row w-full md:w-[50%] mt-2 p-4">
            <input
              type="text"
              placeholder="Enter Your Email"
              className="font-inter font-normal text-[14px] md:text-[16px] text-[#FFFFFF] bg-[#FF9F0D] p-4 flex-1"
            />
            <button className="font-inter font-normal text-[14px] md:text-[16px] text-[#FF9F0D] bg-[#FFFFFF] p-2 md:p-3 rounded-[2px] hover:text-[#000000] hover:bg-[#eee3d3] transition duration-300">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap justify-between gap-12 mt-12">
        <div className="w-full sm:w-[45%] md:w-[35%] mb-8 md:mb-0">
          <h2 className="font-helvetica text-[16px] md:text-[20px] font-bold text-[#FFFFFF] mb-2">
            About Us
          </h2>
          <p className="font-helvetica text-[14px] md:text-[16px] font-normal text-[#FFFFFF]">
            We are passionate about serving delicious, high-quality fast food made with fresh ingredients. Our goal is 
            to provide quick, satisfying meals that bring joy to every bite!
          </p>
        </div>
        <div className="flex items-start gap-4 mt-4">
          <div className="bg-[#FF9F0D] p-2 rounded-md">
            <Image src="/images/icon.png" alt="icon" width={39} height={39} />
          </div>
          <div>
            <p className="font-inter text-[14px] md:text-[16px] font-normal text-[#FFFFFF]">Opening Hours</p>
            <p className="font-inter text-[12px] md:text-[14px] font-normal text-[#FFFFFF]">Mon - Sat (8.00 - 6.00)</p>
            <p className="font-inter text-[12px] md:text-[14px] font-normal text-[#FFFFFF]">Sunday - Closed</p>
          </div>
        </div>
        <div className="w-full md:w-[18%] hidden md:block mb-8 md:mb-0">
          <h2 className="font-bold text-[16px] md:text-[18px] text-[#FFFFFF] mb-4">Useful Links</h2>
          <ul className="space-y-2">
            <li className="font-normal text-[14px] md:text-[16px] text-[#FFFFFF]"><Link href="/about">About</Link></li>  
            <li className="font-normal text-[14px] md:text-[16px] text-[#FFFFFF]"><Link href="/signin">Contact</Link></li>
            <li className="font-normal text-[14px] md:text-[16px] text-[#FFFFFF]"><Link href="/blog">Blogs</Link></li>
            <li className="font-normal text-[14px] md:text-[16px] text-[#FFFFFF]"><Link href="chef">Team</Link></li>
                  </ul>
        </div>
        <div className="w-full md:w-[18%] hidden md:block mb-8 md:mb-0">
          <h2 className="font-bold text-[16px] md:text-[18px] text-[#FFFFFF] mb-4">Help?</h2>
          <ul className="space-y-2">
            <li className="font-normal text-[14px] md:text-[16px] text-[#FFFFFF]"> <Link href="/faq">FAQ</Link></li>
            <li className="font-normal text-[14px] md:text-[16px] text-[#FFFFFF]"> <Link href="/blog">Posts</Link></li>
            <li className="font-normal text-[14px] md:text-[16px] text-[#FFFFFF]"> <Link href="/shoplist">Shop</Link></li>
          </ul>
        </div>
        <div className="w-full sm:w-[45%] md:w-[35%] mb-8 md:mb-0"> 
          <h2 className="font-bold text-[16px] md:text-[18px] text-[#FFFFFF] mb-4">
            Recent Posts
          </h2>
          {recentPosts.map((post: IPost) => (
            <div key={post.id} className="flex gap-4 mb-4">
              <Image
                src={post.image || '/fallback-image.jpg'}
                alt={post.title}
                width={80}
                height={80}
                className="w-[75px] h-[75px] object-cover rounded"
              />
              <div>
                <Link href={`/pages/blog/${post.id}`}>
                  <p className="text-[14px] md:text-[16px] font-helvetica font-normal text-[#FFFFFF]">
                    {post.title}
                  </p>
                </Link>
                <p className="text-[12px] md:text-[14px] font-helvetica font-normal text-[#FFFFFF] opacity-50">
                  {new Date(post.dateCreated).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
