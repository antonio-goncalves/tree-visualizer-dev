/** @type {import('next').NextConfig} */
const nextConfig = {
     images:{
         remotePatterns:[
              {
                   hostname:"upload.wikimedia.org"
              },
             {
                 hostname:"static.antonio-goncalves.com"
             }

         ]
     }
}

module.exports = nextConfig
