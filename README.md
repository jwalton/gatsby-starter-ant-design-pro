# Ant Design Pro Gatsby Starter

This is a starter for getting set up with Ant Design Pro using Gatsby.

Mostly this follows along with the documentation for Ant Design Pro, with a few
small changes:

-   [Layouts](https://pro.ant.design/docs/layout) are stored in
    src/componets/layouts instead of in src/layouts.
-   src/components/layouts/menu.tsx defines top-level layouts for different pages,
    and sets up menu items. This is similar to config/config.ts#routes from umi.
-   umi's i18n solution has been replaced with react-i18n-wrapper.
-   This has no state management solution built in, like Redux. You're free
    to choose your own.
