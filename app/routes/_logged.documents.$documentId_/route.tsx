import {
  Typography,
  Card,
  Button,
  Space,
  Table,
  Modal,
  Form,
  Input,
  Select,
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

export default function DocumentDetailsPage() {
  const { documentId } = useParams()
  const navigate = useNavigate()
  const { user } = useUserContext()
  const [isMetadataModalVisible, setIsMetadataModalVisible] = useState(false)
  const [isPermissionModalVisible, setIsPermissionModalVisible] =
    useState(false)
  const [form] = Form.useForm()

  // Fetch document with versions, permissions, and metadata
  const { data: document, refetch } = Api.document.findFirst.useQuery({
    where: { id: documentId },
    include: {
      documentVersions: true,
      documentPermissions: { include: { user: true } },
      documentMetadatas: true,
      user: true,
    },
  })

  // Mutations
  const { mutateAsync: updateDocument } = Api.document.update.useMutation()
  const { mutateAsync: createMetadata } =
    Api.documentMetadata.create.useMutation()
  const { mutateAsync: createPermission } =
    Api.documentPermission.create.useMutation()

  // Handle document download
  const handleDownload = () => {
    if (document?.fileUrl) {
      window.open(document.fileUrl, '_blank')
    }
  }

  // Handle version restore
  const handleRestoreVersion = async (version: any) => {
    try {
      await updateDocument({
        where: { id: documentId },
        data: { fileUrl: version.fileUrl, version: version.version },
      })
      message.success('Version restored successfully')
      refetch()
    } catch (error) {
      message.error('Failed to restore version')
    }
  }

  // Handle metadata submission
  const handleMetadataSubmit = async (values: any) => {
    try {
      await createMetadata({
        data: {
          documentId,
          metadataKey: values.key,
          metadataValue: values.value,
        },
      })
      message.success('Metadata added successfully')
      setIsMetadataModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      message.error('Failed to add metadata')
    }
  }

  // Handle permission submission
  const handlePermissionSubmit = async (values: any) => {
    try {
      await createPermission({
        data: {
          documentId,
          userId: values.userId,
          permissionType: values.permissionType,
        },
      })
      message.success('Permission added successfully')
      setIsPermissionModalVisible(false)
      form.resetFields()
      refetch()
    } catch (error) {
      message.error('Failed to add permission')
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-file-alt" /> Document Details
        </Title>

        {/* Document Info Card */}
        <Card style={{ marginBottom: 24 }}>
          <Title level={4}>{document?.title}</Title>
          <Text>{document?.description}</Text>
          <Space style={{ marginTop: 16 }} wrap>
            <Button type="primary" onClick={handleDownload}>
              <i className="las la-download" /> Download
            </Button>
            <Button onClick={() => setIsMetadataModalVisible(true)}>
              <i className="las la-tags" /> Add Metadata
            </Button>
            <Button onClick={() => setIsPermissionModalVisible(true)}>
              <i className="las la-user-shield" /> Manage Permissions
            </Button>
          </Space>
        </Card>

        {/* Versions Table */}
        <Card
          title={
            <>
              <i className="las la-history" /> Version History
            </>
          }
          style={{ marginBottom: 24 }}
        >
          <Table
            dataSource={document?.documentVersions}
            columns={[
              {
                title: 'Version',
                dataIndex: 'version',
                key: 'version',
              },
              {
                title: 'Created At',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: date => dayjs(date).format('YYYY-MM-DD HH:mm'),
              },
              {
                title: 'Actions',
                key: 'actions',
                render: (_, record) => (
                  <Button onClick={() => handleRestoreVersion(record)}>
                    Restore
                  </Button>
                ),
              },
            ]}
          />
        </Card>

        {/* Metadata Table */}
        <Card
          title={
            <>
              <i className="las la-tags" /> Metadata
            </>
          }
          style={{ marginBottom: 24 }}
        >
          <Table
            dataSource={document?.documentMetadatas}
            columns={[
              {
                title: 'Key',
                dataIndex: 'metadataKey',
                key: 'metadataKey',
              },
              {
                title: 'Value',
                dataIndex: 'metadataValue',
                key: 'metadataValue',
              },
            ]}
          />
        </Card>

        {/* Permissions Table */}
        <Card
          title={
            <>
              <i className="las la-user-shield" /> Permissions
            </>
          }
        >
          <Table
            dataSource={document?.documentPermissions}
            columns={[
              {
                title: 'User',
                dataIndex: ['user', 'name'],
                key: 'userName',
              },
              {
                title: 'Permission Type',
                dataIndex: 'permissionType',
                key: 'permissionType',
              },
            ]}
          />
        </Card>

        {/* Metadata Modal */}
        <Modal
          title="Add Metadata"
          open={isMetadataModalVisible}
          onCancel={() => setIsMetadataModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handleMetadataSubmit}>
            <Form.Item name="key" rules={[{ required: true }]}>
              <Input placeholder="Metadata Key" />
            </Form.Item>
            <Form.Item name="value" rules={[{ required: true }]}>
              <Input placeholder="Metadata Value" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Metadata
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Permissions Modal */}
        <Modal
          title="Add Permission"
          open={isPermissionModalVisible}
          onCancel={() => setIsPermissionModalVisible(false)}
          footer={null}
        >
          <Form form={form} onFinish={handlePermissionSubmit}>
            <Form.Item name="userId" rules={[{ required: true }]}>
              <Input placeholder="User ID" />
            </Form.Item>
            <Form.Item name="permissionType" rules={[{ required: true }]}>
              <Select placeholder="Permission Type">
                <Select.Option value="READ">Read</Select.Option>
                <Select.Option value="WRITE">Write</Select.Option>
                <Select.Option value="ADMIN">Admin</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Permission
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
