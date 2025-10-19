import React, { useState, useEffect } from 'react';
import {
  Card, Row, Col, Table, Button, Input, Modal, Form, 
  DatePicker, Select, Space, message, Popconfirm, Typography, Tag, InputNumber
} from 'antd';
import {
  BookOutlined, PlusOutlined, EditOutlined, DeleteOutlined,
  EyeOutlined, SearchOutlined, BookFilled,
  TeamOutlined
} from '@ant-design/icons';
import { courseService } from '../services/courseService';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statistics, setStatistics] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    additional: 0
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCourses();
    fetchStatistics();
  }, [pagination.current, pagination.pageSize, searchText, sortField, sortOrder]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.current - 1,
        size: pagination.pageSize,
        sortBy: sortField,
        sortDirection: sortOrder,
        search: searchText || undefined,
      };
      
      const response = await courseService.getAll(params);
      setCourses(response.data.content);
      setPagination({
        ...pagination,
        total: response.data.totalItems,
      });
    } catch (error) {
      message.error('Failed to fetch courses');
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await courseService.getStatistics();
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const handleTableChange = (newPagination, filters, sorter) => {
    setPagination({
      ...pagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    });
    
    if (sorter.field) {
      setSortField(sorter.field);
      setSortOrder(sorter.order === 'ascend' ? 'asc' : 'desc');
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
    setPagination({ ...pagination, current: 1 });
  };

  const showModal = (mode, course = null) => {
    setModalMode(mode);
    setSelectedCourse(course);
    setIsModalVisible(true);
    
    if (mode === 'edit' && course) {
      form.setFieldsValue({
        ...course,
        startDate: dayjs(course.startDate),
        endDate: dayjs(course.endDate),
      });
    } else if (mode === 'view' && course) {
      form.setFieldsValue({
        ...course,
        startDate: dayjs(course.startDate),
        endDate: dayjs(course.endDate),
      });
    } else {
      form.resetFields();
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedCourse(null);
  };

  const handleModalOk = async () => {
    if (modalMode === 'view') {
      handleModalCancel();
      return;
    }

    try {
      const values = await form.validateFields();
      const courseData = {
        ...values,
        startDate: values.startDate.format('YYYY-MM-DD'),
        endDate: values.endDate.format('YYYY-MM-DD'),
      };

      if (modalMode === 'add') {
        await courseService.create(courseData);
        message.success('Course created successfully');
      } else if (modalMode === 'edit') {
        await courseService.update(selectedCourse.id, courseData);
        message.success('Course updated successfully');
      }

      handleModalCancel();
      fetchCourses();
      fetchStatistics();
    } catch (error) {
      if (error.errorFields) {
        message.error('Please fill in all required fields');
      } else {
        message.error(`Failed to ${modalMode} course`);
        console.error('Error:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await courseService.delete(id);
      message.success('Course deleted successfully');
      fetchCourses();
      fetchStatistics();
    } catch (error) {
      message.error('Failed to delete course');
      console.error('Error deleting course:', error);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      width: 80,
    },
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
      sorter: true,
    },
    {
      title: 'Course Code',
      dataIndex: 'courseCode',
      key: 'courseCode',
      sorter: true,
    },
    {
      title: 'Instructor',
      dataIndex: 'instructor',
      key: 'instructor',
      sorter: true,
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
      sorter: true,
      width: 100,
    },
    {
      title: 'Enrollment',
      dataIndex: 'currentEnrollment',
      key: 'currentEnrollment',
      width: 120,
      render: (enrollment, record) => (
        <span>
          {enrollment} / {record.capacity}
        </span>
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: true,
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      sorter: true,
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            ghost
            size="small"
            icon={<EyeOutlined />}
            onClick={() => showModal('view', record)}
          >
            View
          </Button>
          <Button
            type="default"
            size="small"
            icon={<EditOutlined />}
            onClick={() => showModal('edit', record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this course?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              size="small"
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const statisticsCards = [
    {
      title: 'Total Courses',
      value: statistics.total,
      icon: <BookFilled />,
      color: '#1890ff',
    },
    {
      title: 'Active Courses',
      value: statistics.active,
      icon: <BookOutlined />,
      color: '#52c41a',
    },
    {
      title: 'Inactive Courses',
      value: statistics.inactive,
      icon: <BookOutlined />,
      color: '#f5222d',
    },
    {
      title: 'Total Enrollments',
      value: statistics.additional,
      icon: <TeamOutlined />,
      color: '#faad14',
    },
  ];

  return (
    <div className="py-6">
      <div className="mb-6">
        <Title level={2} className="!m-0 !text-gray-800">Courses Management</Title>
      </div>

      <Row gutter={[16, 16]} className="mb-6">
        {statisticsCards.map((stat, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card className="rounded-lg border-none shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center text-3xl flex-shrink-0" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="flex-1">
                  <div className="text-3xl font-bold text-gray-800 leading-tight">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.title}</div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="rounded-lg border-none shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center mb-6 gap-4">
          <Input.Search
            placeholder="Search by course name or code..."
            allowClear
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={handleSearch}
            className="w-full md:w-96"
          />
          <Space className="w-full md:w-auto">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => showModal('add')}
              className="w-full md:w-auto"
            >
              Add New Course
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={courses}
          rowKey="id"
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          scroll={{ x: 1400 }}
        />
      </Card>

      <Modal
        title={
          modalMode === 'add' 
            ? 'Add New Course' 
            : modalMode === 'edit' 
            ? 'Edit Course' 
            : 'Course Details'
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={700}
        okText={modalMode === 'view' ? 'Close' : modalMode === 'add' ? 'Create' : 'Update'}
        cancelButtonProps={{ style: { display: modalMode === 'view' ? 'none' : 'inline-block' } }}
      >
        <Form
          form={form}
          layout="vertical"
          disabled={modalMode === 'view'}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="courseName"
                label="Course Name"
                rules={[{ required: true, message: 'Please enter course name' }]}
              >
                <Input placeholder="Enter course name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="courseCode"
                label="Course Code"
                rules={[{ required: true, message: 'Please enter course code' }]}
              >
                <Input placeholder="Enter course code" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Description"
          >
            <TextArea 
              rows={3} 
              placeholder="Enter course description" 
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="instructor"
                label="Instructor"
                rules={[{ required: true, message: 'Please enter instructor name' }]}
              >
                <Input placeholder="Enter instructor name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="capacity"
                label="Capacity"
                rules={[
                  { required: true, message: 'Please enter capacity' },
                  { type: 'number', min: 1, message: 'Capacity must be at least 1' }
                ]}
              >
                <InputNumber 
                  placeholder="Enter capacity" 
                  style={{ width: '100%' }} 
                  min={1}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[{ required: true, message: 'Please select start date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endDate"
                label="End Date"
                rules={[{ required: true, message: 'Please select end date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select placeholder="Select status">
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CoursesPage;

