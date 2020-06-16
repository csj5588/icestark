import React from 'react';
import { Shell } from '@alifd/next';
import { AppLink } from '@ice/stark';
import { asideMenuConfig } from './menuConfig';
import Footer from './components/Footer';
import './index.scss';

declare global {
  interface Window {
    webpackJsonp: any[];
  }
}

export default function BasicLayout(props: {
  children: React.ReactNode;
  pathname: string;
}) {
  const { children, pathname } = props;
  return (
    <Shell
      type="brand"
      style={{
        minHeight: '100vh',
      }}
    >
      <Shell.Branding className="layout-menu-top">
        <div className="layout-logo">
          <img src="https://img.ikstatic.cn/MTU5MjI5MDQ4MTY3OSMgOTMjcG5n.png" alt=""/>
        </div>
        <div className="layout-menu-top-item">
          {
            asideMenuConfig.map((item, idx) => {
              return (
                <AppLink key={idx} to={item.path} className="layout-menu-top-items">
                  {item.name}
                </AppLink>
              )
            })
          }
        </div>
      </Shell.Branding>

      <Shell.Content>{children}</Shell.Content>
      <Shell.Footer>
        <Footer />
      </Shell.Footer>
    </Shell>
  );
}
