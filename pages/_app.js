import React from "react";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "styles/tailwind.css";





export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};


    // if (ctx.req && ctx.req.url === '/') {
    //   ctx.res.writeHead(302, { Location: '/admin/dashboard' });
    //   ctx.res.end();
    // }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {


    // Redirect from index page to /admin/dashboard
    if (typeof window !== "undefined" && window.location.pathname === '/') {
      // Redirect to /admin/dashboard
      Router.replace('/admin/dashboard');
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>Sound Well</title>
        </Head>
        <Layout>
            <Component {...pageProps} />
        </Layout>
      </React.Fragment>
    );
  }
}
