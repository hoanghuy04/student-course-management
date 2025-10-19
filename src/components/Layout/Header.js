import React from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeOutlined, 
  UserOutlined, 
  BookOutlined,
  SettingOutlined,
  LogoutOutlined,
  ProfileOutlined
} from '@ant-design/icons';

const { Header: AntHeader } = Layout;

const AppHeader = () => {
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: '/students',
      icon: <UserOutlined />,
      label: <Link to="/students">Students Management</Link>,
    },
    {
      key: '/courses',
      icon: <BookOutlined />,
      label: <Link to="/courses">Courses Management</Link>,
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
    },
  ];

  return (
    <AntHeader className="fixed top-0 left-0 right-0 z-[1000] bg-[#001529] p-0 shadow-md">
      <div className="flex items-center justify-between max-w-[1400px] mx-auto px-6 h-16">
        <div className="flex items-center text-white text-xl font-semibold whitespace-nowrap">
          <BookOutlined className="text-2xl mr-2.5" />
          <span className="hidden md:inline">Student Course Management</span>
        </div>
        
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="flex-1 mx-10 border-b-0"
        />
        
        <div className="flex items-center">
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Avatar 
              style={{ backgroundColor: '#1890ff', cursor: 'pointer' }} 
              icon={<UserOutlined />} 
            />
          </Dropdown>
        </div>
      </div>
    </AntHeader>
  );
};

export default AppHeader;

