import {
  Typography,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Card,
  Tag,
  message,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function AccessControlPage() {
  const { checkRole } = useUserContext()
  const [roleModalVisible, setRoleModalVisible] = useState(false)
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [form] = Form.useForm()

  // Fetch users and roles
  const { data: users, refetch: refetchUsers } = Api.user.findMany.useQuery({})
  const { data: roles, refetch: refetchRoles } = Api.roleData.findMany.useQuery(
    {},
  )
  const { data: permissions } = Api.documentPermission.findMany.useQuery({
    include: { user: true, document: true },
  })

  // Mutations
  const { mutateAsync: updateUser } = Api.user.update.useMutation()
  const { mutateAsync: createRole } = Api.roleData.create.useMutation()

  if (!checkRole('ADMIN')) {
    return (
      <PageLayout layout="full-width">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Title level={4}>Access Denied</Title>
          <Text>You don't have permission to access this page.</Text>
        </div>
      </PageLayout>
    )
  }

  const handleRoleCreate = async (values: any) => {
    try {
      await createRole({
        data: {
          name: values.name,
          description: values.description,
          permissions: values.permissions,
        },
      })
      message.success('Role created successfully')
      setRoleModalVisible(false)
      refetchRoles()
      form.resetFields()
    } catch (error) {
      message.error('Failed to create role')
    }
  }

  const handleUserRoleUpdate = async (userId: string, newRole: string) => {
    try {
      await updateUser({
        where: { id: userId },
        data: { globalRole: newRole },
      })
      message.success('User role updated successfully')
      refetchUsers()
    } catch (error) {
      message.error('Failed to update user role')
    }
  }

  const userColumns = [
    {
      title: 'User',
      dataIndex: 'email',
      key: 'email',
      render: (email: string, record: any) => (
        <Space>
          <i className="las la-user" />
          {record.name || email}
        </Space>
      ),
    },
    {
      title: 'Current Role',
      dataIndex: 'globalRole',
      key: 'globalRole',
      render: (role: string) => <Tag color="blue">{role}</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Select
          defaultValue={record.globalRole}
          style={{ width: 120 }}
          onChange={value => handleUserRoleUpdate(record.id, value)}
        >
          {roles?.map(role => (
            <Select.Option key={role.id} value={role.name || ''}>
              {role.name}
            </Select.Option>
          ))}
        </Select>
      ),
    },
  ]

  const accessLogColumns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      render: (user: any) => user?.email,
    },
    {
      title: 'Resource',
      dataIndex: 'document',
      key: 'document',
      render: (doc: any) => doc?.title,
    },
    {
      title: 'Permission Type',
      dataIndex: 'permissionType',
      key: 'permissionType',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Title level={2}>
          <i className="las la-user-shield" /> Access Control Management
        </Title>
        <Text>Manage user roles, permissions, and view access logs.</Text>

        <div style={{ marginTop: 30 }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Card
              title={
                <>
                  <i className="las la-users-cog" /> User Roles
                </>
              }
            >
              <Button
                type="primary"
                icon={<i className="las la-plus" />}
                onClick={() => setRoleModalVisible(true)}
                style={{ marginBottom: 16 }}
              >
                Create New Role
              </Button>
              <Table
                columns={userColumns}
                dataSource={users}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </Card>

            <Card
              title={
                <>
                  <i className="las la-history" /> Access Logs
                </>
              }
            >
              <Table
                columns={accessLogColumns}
                dataSource={permissions}
                rowKey="id"
                pagination={{ pageSize: 10 }}
              />
            </Card>
          </Space>
        </div>

        <Modal
          title="Create New Role"
          open={roleModalVisible}
          onCancel={() => setRoleModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleRoleCreate} layout="vertical">
            <Form.Item
              name="name"
              label="Role Name"
              rules={[{ required: true, message: 'Please input role name!' }]}
            >
              <Input prefix={<i className="las la-tag" />} />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please input description!' }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Create Role
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
