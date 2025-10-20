import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { UserOutlined, BookOutlined, RightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const HomePage = () => {
  const navigate = useNavigate();

  const managementCards = [
    {
      key: 'students',
      title: 'Students Management',
      description: 'Manage student information, enrollment, and track student activities. Add, edit, delete, and view student details.',
      icon: <UserOutlined className="text-4xl" />,
      color: '#1890ff',
      path: '/students',
    },
    {
      key: 'courses',
      title: 'Courses Management',
      description: 'Manage course offerings, schedules, and instructors. Create and organize courses with enrollment tracking.',
      icon: <BookOutlined className="text-4xl" />,
      color: '#52c41a',
      path: '/courses',
    },
  ];

  return (
    <div className="py-6">
      <div className="text-center py-16 px-6 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl mb-12 shadow-lg">
        <Title level={1} className="!text-white !mb-4 !text-4xl md:!text-5xl !font-bold">
          Welcome to Student Course Management System
        </Title>
        <Text className="text-white/90 text-lg block">
          Efficiently manage students, courses, and enrollments all in one place
        </Text>
      </div>

      <Row gutter={[32, 32]} className="mb-12">
        {managementCards.map((card) => (
          <Col xs={24} sm={24} md={12} key={card.key}>
            <Card
              hoverable
              className="rounded-xl border-none shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full cursor-pointer"
              onClick={() => navigate(card.path)}
            >
              <div className="flex flex-col md:flex-row gap-6 p-4 items-center md:items-start text-center md:text-left">
                <div 
                  className="flex-shrink-0 w-20 h-20 flex items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${card.color}15`, color: card.color }}
                >
                  {card.icon}
                </div>
                <div className="flex-1">
                  <Title level={3} className="!mb-3 !text-gray-800">
                    {card.title}
                  </Title>
                  <Text className="block text-gray-600 mb-4 leading-relaxed">
                    {card.description}
                  </Text>
                  <div className="mt-4">
                    <Text className="font-semibold flex items-center justify-center md:justify-start gap-2" style={{ color: card.color }}>
                      Go to {card.title} <RightOutlined />
                    </Text>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[24, 24]} className="mt-16">
        <Col xs={24}>
          <Title level={2} className="text-center !mb-8 !text-gray-800">
            Key Features
          </Title>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="text-center rounded-xl border border-gray-200 transition-all duration-300 hover:border-primary hover:shadow-md h-full">
            <Title level={4} className="!mb-3 !text-gray-800">📊 Real-time Statistics</Title>
            <Text>Track student enrollment and course statistics in real-time</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="text-center rounded-xl border border-gray-200 transition-all duration-300 hover:border-primary hover:shadow-md h-full">
            <Title level={4} className="!mb-3 !text-gray-800">🔍 Advanced Search</Title>
            <Text>Quickly find students and courses with powerful search filters</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="text-center rounded-xl border border-gray-200 transition-all duration-300 hover:border-primary hover:shadow-md h-full">
            <Title level={4} className="!mb-3 !text-gray-800">📱 Responsive Design</Title>
            <Text>Access the system from any device - desktop, tablet, or mobile</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="text-center rounded-xl border border-gray-200 transition-all duration-300 hover:border-primary hover:shadow-md h-full">
            <Title level={4} className="!mb-3 !text-gray-800">✅ Data Validation</Title>
            <Text>Ensure data integrity with comprehensive validation rules</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="text-center rounded-xl border border-gray-200 transition-all duration-300 hover:border-primary hover:shadow-md h-full">
            <Title level={4} className="!mb-3 !text-gray-800">⚡ Fast Performance</Title>
            <Text>Lightning-fast operations with optimized backend and frontend</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="text-center rounded-xl border border-gray-200 transition-all duration-300 hover:border-primary hover:shadow-md h-full">
            <Title level={4} className="!mb-3 !text-gray-800">🔐 Secure & Reliable</Title>
            <Text>Built with security best practices and reliable data storage</Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;

