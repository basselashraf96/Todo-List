/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals.push({
          knex: 'commonjs knex',
        });
        // Important: return the modified config
        return config;
      },
      
};

export default nextConfig;
