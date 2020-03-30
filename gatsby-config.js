/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
    siteMetadata: {
        title: 'Ant Design Pro',
        /**
         * Theme for nav menu: `light` or `dark`.
         */
        navTheme: 'dark',
        /**
         * Primary color of ant design.
         * TODO: Not sure what changing this is supposed to do?
         */

        primaryColor: '#1890ff',
        /**
         * Nav menu position: `sidemenu` or `topmenu`.
         */
        layout: 'sidemenu',
        /**
         * Sticky header.
         */
        fixedHeader: false,
        /**
         * sticky siderbar
         */
        fixSiderbar: false,
        /**
         * Auto hide header.
         */
        autoHideHeader: false,
        /**
         * Layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
         */
        contentWidth: 'Fluid',
    },
    plugins: [
        'gatsby-plugin-typescript',
        {
            resolve: 'gatsby-plugin-less',
            options: {
                javascriptEnabled: true,
            },
        },
    ],
    /* Your site config here */
};
