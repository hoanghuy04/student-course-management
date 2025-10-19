import React from 'react';
import { Layout, Row, Col, Typography } from 'antd';
import { 
  MailOutlined, 
  PhoneOutlined, 
  EnvironmentOutlined,
  GithubOutlined,
  TwitterOutlined,
  LinkedinOutlined
} from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

const AppFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter className="bg-[#001529] py-12 px-0 mt-16">
      <div className="max-w-[1400px] mx-auto px-6">
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={8}>
            <Title level={4} style={{ color: '#fff' }}>
              Student Course Management
            </Title>
            <Text className="text-white/65 block mb-2">
              A comprehensive platform for managing students and courses efficiently.
              Built with modern technologies to provide the best user experience.
            </Text>
          </Col>
          
          <Col xs={24} sm={12} md={8}>
            <Title level={4} style={{ color: '#fff' }}>
              Quick Links
            </Title>
            <ul className="list-none p-0 m-0">
              <li className="mb-3"><Link href="/" className="text-white/65 hover:text-primary transition-colors">Home</Link></li>
              <li className="mb-3"><Link href="/students" className="text-white/65 hover:text-primary transition-colors">Students Management</Link></li>
              <li className="mb-3"><Link href="/courses" className="text-white/65 hover:text-primary transition-colors">Courses Management</Link></li>
              <li className="mb-3"><Link href="#" className="text-white/65 hover:text-primary transition-colors">About Us</Link></li>
              <li className="mb-3"><Link href="#" className="text-white/65 hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </Col>
          
          <Col xs={24} sm={12} md={8}>
            <Title level={4} style={{ color: '#fff' }}>
              Contact Us
            </Title>
            <ul className="list-none p-0 m-0 mb-4 text-white/65">
              <li className="mb-3">
                <EnvironmentOutlined /> 123 Education Street, Learning City
              </li>
              <li className="mb-3">
                <PhoneOutlined /> +1 (234) 567-8900
              </li>
              <li className="mb-3">
                <MailOutlined /> info@studentcourse.com
              </li>
            </ul>
            <div className="flex gap-4">
              <GithubOutlined className="text-2xl text-white/65 cursor-pointer hover:text-primary transition-colors" />
              <TwitterOutlined className="text-2xl text-white/65 cursor-pointer hover:text-primary transition-colors" />
              <LinkedinOutlined className="text-2xl text-white/65 cursor-pointer hover:text-primary transition-colors" />
            </div>
          </Col>
        </Row>
        
        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <Text className="text-white/65">
            © {currentYear} Student Course Management System. All rights reserved.
          </Text>
        </div>
      </div>
    </AntFooter>
  );
};

export default AppFooter;

