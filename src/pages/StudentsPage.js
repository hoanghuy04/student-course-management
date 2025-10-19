import React, { useState, useEffect } from 'react';
import {
  Card, Row, Col, Table, Button, Input, Modal, Form, 
  DatePicker, Select, Space, message, Popconfirm, Typography, Tag, Radio, Checkbox, InputNumber
} from 'antd';
import {
  UserOutlined, PlusOutlined, EditOutlined, DeleteOutlined,
  EyeOutlined, SearchOutlined, UserAddOutlined, 
  TeamOutlined, UserDeleteOutlined
} from '@ant-design/icons';
import { studentService } from '../services/studentService';
import { courseService } from '../services/courseService';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
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
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchStudents();
    fetchStatistics();
    fetchCourses();
  }, [pagination.current, pagination.pageSize, searchText, sortField, sortOrder]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.current - 1,
        size: pagination.pageSize,
        sortBy: sortField,
        sortDirection: sortOrder,
        search: searchText || undefined,
      };
      
      const response = await studentService.getAll(params);
      setStudents(response.data.content);
      setPagination({
        ...pagination,
        total: response.data.totalItems,
      });
    } catch (error) {
      message.error('Failed to fetch students');
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await studentService.getStatistics();
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await courseService.getAll({ page: 0, size: 100 });
      setCourses(response.data.content);
    } catch (error) {
      console.error('Error fetching courses:', error);
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

  const showModal = (mode, student = null) => {
    setModalMode(mode);
    setSelectedStudent(student);
    setIsModalVisible(true);
    
    if (mode === 'edit' && student) {
      form.setFieldsValue({
        ...student,
        enrollmentDate: dayjs(student.enrollmentDate),
        status: student.status === 'Active',
      });
    } else if (mode === 'view' && student) {
      form.setFieldsValue({
        ...student,
        enrollmentDate: dayjs(student.enrollmentDate),
        status: student.status === 'Active',
      });
    } else {
      form.resetFields();
      form.setFieldsValue({ status: true }); // Default to Active
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedStudent(null);
  };

  const handleModalOk = async () => {
    if (modalMode === 'view') {
      handleModalCancel();
      return;
    }

    try {
      const values = await form.validateFields();
      const studentData = {
        ...values,
        enrollmentDate: values.enrollmentDate.format('YYYY-MM-DD'),
        status: values.status ? 'Active' : 'Inactive',
      };

      if (modalMode === 'add') {
        await studentService.create(studentData);
        message.success('Student created successfully');
      } else if (modalMode === 'edit') {
        await studentService.update(selectedStudent.id, studentData);
        message.success('Student updated successfully');
      }

      handleModalCancel();
      fetchStudents();
      fetchStatistics();
    } catch (error) {
      if (error.errorFields) {
        message.error('Please fill in all required fields');
      } else {
        message.error(`Failed to ${modalMode} student`);
        console.error('Error:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await studentService.delete(id);
      message.success('Student deleted successfully');
      fetchStudents();
      fetchStatistics();
    } catch (error) {
      message.error('Failed to delete student');
      console.error('Error deleting student:', error);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: true,
      width: 70,
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: true,
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: true,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: true,
      width: 80,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      sorter: true,
      width: 100,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Course',
      dataIndex: 'courseId',
      key: 'courseId',
      render: (courseId) => {
        const course = courses.find(c => c.id === courseId);
        return course ? course.courseName : 'N/A';
      },
    },
    {
      title: 'Enrollment Date',
      dataIndex: 'enrollmentDate',
      key: 'enrollmentDate',
      sorter: true,
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      width: 100,
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
            title="Are you sure you want to delete this student?"
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
      title: 'Total Students',
      value: statistics.total,
      icon: <TeamOutlined />,
      color: '#1890ff',
    },
    {
      title: 'Active Students',
      value: statistics.active,
      icon: <UserOutlined />,
      color: '#52c41a',
    },
    {
      title: 'Inactive Students',
      value: statistics.inactive,
      icon: <UserDeleteOutlined />,
      color: '#f5222d',
    },
    {
      title: 'Students This Month',
      value: statistics.additional,
      icon: <UserAddOutlined />,
      color: '#faad14',
    },
  ];

  return (
    <div className="py-6">
      <div className="mb-6">
        <Title level={2} className="!m-0 !text-gray-800">Students Management</Title>
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
            placeholder="Search by name, email, or student ID..."
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
              Add New Student
            </Button>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={students}
          rowKey="id"
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          scroll={{ x: 1500 }}
        />
      </Card>

      <Modal
        title={
          modalMode === 'add' 
            ? 'Add New Student' 
            : modalMode === 'edit' 
            ? 'Edit Student' 
            : 'Student Details'
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
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
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: 'Please enter first name' }]}
              >
                <Input id="firstName" placeholder="Enter first name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: 'Please enter last name' }]}
              >
                <Input id="lastName" placeholder="Enter last name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="age"
                label="Age"
                rules={[
                  { required: true, message: 'Please enter age' },
                  { type: 'number', min: 1, max: 150, message: 'Please enter a valid age' }
                ]}
              >
                <InputNumber 
                  id="age"
                  placeholder="Enter age" 
                  style={{ width: '100%' }} 
                  min={1}
                  max={150}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true, message: 'Please select gender' }]}
              >
                <Radio.Group id="gender">
                  <Radio value="Male">Male</Radio>
                  <Radio value="Female">Female</Radio>
                  <Radio value="Other">Other</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input id="email" placeholder="Enter email address" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input id="phone" placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item
            name="courseId"
            label="Course"
            rules={[{ required: true, message: 'Please select a course' }]}
          >
            <Select 
              id="courseId"
              placeholder="Select a course"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {courses.map(course => (
                <Option key={course.id} value={course.id}>
                  {course.courseCode} - {course.courseName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="enrollmentDate"
            label="Enrollment Date"
            rules={[{ required: true, message: 'Please select enrollment date' }]}
          >
            <DatePicker id="enrollmentDate" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            valuePropName="checked"
          >
            <Checkbox id="status">Active</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentsPage;

