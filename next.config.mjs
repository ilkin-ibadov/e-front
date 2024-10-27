import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    // async redirects() {
    //     return [
    //         {
    //             source: "/",
    //             destination: "/en/login",
    //             permanent: false,
    //         },
    //     ];
    // },
};

export default withNextIntl(nextConfig);