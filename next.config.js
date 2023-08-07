/** @type {import('next').NextConfig} */
const nextConfig = {
     images:{
         remotePatterns:[
              {
                   hostname:"upload.wikimedia.org"
              },
             {
                 hostname:"static.antonio-goncalves.com"
             },
             {
                 hostname:"127.0.0.1"
             }

         ]
     }
}

module.exports = nextConfig
