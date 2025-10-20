import React from 'react';
import { Layout } from 'antd';
import AppHeader from './Header';
import AppFooter from './Footer';

const { Content } = Layout;

const AppLayout = ({ children }) => {
  return (
    <Layout className="min-h-screen flex flex-col">
      <AppHeader />
      <Content className="mt-16 flex-1 bg-gray-100">
        <div className="max-w-[1400px] mx-auto px-6 py-6 min-h-[calc(100vh-64px-300px)]">
          {children}
        </div>
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default AppLayout;

