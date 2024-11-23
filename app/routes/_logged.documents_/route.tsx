import {
  Typography,
  Input,
  Button,
  Card,
  Row,
  Col,
  Select,
  Modal,
  Upload,
  Space,
  Table,
  Tag,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
const { Search } = Input
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function DocumentsPage() {
  const navigate = useNavigate()
  const { user } = useUserContext()
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [uploadModalVisible, setUploadModalVisible] = useState(false)
  const [uploadingFile, setUploadingFile] = useState<File | null>(null)
  const [metadata, setMetadata] = useState({ title: '', description: '' })

  const { mutateAsync: upload } = useUploadPublic()
  const { mutateAsync: createDocument } = Api.document.create.useMutation()
  const { data: documents, refetch } = Api.document.findMany.useQuery({
    where: {
      OR: [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
      ],
      userId: user?.id,
    },
    include: {
      documentVersions: true,
      documentMetadatas: true,
      user: true,
    },
  })

  const handleUpload = async () => {
    if (!uploadingFile || !user) return

    try {
      const { url } = await upload({ file: uploadingFile })
      await createDocument({
        data: {
          title: metadata.title,
          description: metadata.description,
          fileUrl: url,
          fileType: uploadingFile.type,
          fileSize: uploadingFile.size.toString(),
          status: 'ACTIVE',
          version: 1.0,
          userId: user.id,
        },
      })
      setUploadModalVisible(false)
      refetch()
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
      render: (version: number) => version.toString(),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space>
          <Button onClick={() => navigate(`/documents/${record.id}`)}>
            <i className="las la-eye"></i> View
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px' }}>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: 24 }}
        >
          <Col>
            <Title level={2}>
              <i className="las la-file-alt"></i> Document Management
            </Title>
            <Text>Manage your documents, versions, and metadata</Text>
          </Col>
          <Col>
            <Button type="primary" onClick={() => setUploadModalVisible(true)}>
              <i className="las la-upload"></i> Upload Document
            </Button>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col flex="auto">
            <Search
              placeholder="Search documents..."
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col>
            <Select
              defaultValue="grid"
              onChange={(value: 'list' | 'grid') => setViewMode(value)}
              style={{ width: 120 }}
            >
              <Select.Option value="grid">
                <i className="las la-th"></i> Grid
              </Select.Option>
              <Select.Option value="list">
                <i className="las la-list"></i> List
              </Select.Option>
            </Select>
          </Col>
        </Row>

        {viewMode === 'grid' ? (
          <Row gutter={[16, 16]}>
            {documents?.map(doc => (
              <Col xs={24} sm={12} md={8} lg={6} key={doc.id}>
                <Card
                  hoverable
                  onClick={() => navigate(`/documents/${doc.id}`)}
                  cover={
                    <div style={{ padding: 24, textAlign: 'center' }}>
                      <i
                        className="las la-file-alt"
                        style={{ fontSize: 48 }}
                      ></i>
                    </div>
                  }
                >
                  <Card.Meta
                    title={doc.title}
                    description={
                      <>
                        <Text>{doc.description}</Text>
                        <br />
                        <Tag color="blue">v{doc.version.toString()}</Tag>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Table columns={columns} dataSource={documents} rowKey="id" />
        )}

        <Modal
          title="Upload New Document"
          open={uploadModalVisible}
          onOk={handleUpload}
          onCancel={() => setUploadModalVisible(false)}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <Input
              placeholder="Document Title"
              onChange={e =>
                setMetadata({ ...metadata, title: e.target.value })
              }
            />
            <Input.TextArea
              placeholder="Document Description"
              onChange={e =>
                setMetadata({ ...metadata, description: e.target.value })
              }
            />
            <Upload.Dragger
              beforeUpload={file => {
                setUploadingFile(file)
                return false
              }}
              maxCount={1}
            >
              <p className="ant-upload-drag-icon">
                <i
                  className="las la-cloud-upload-alt"
                  style={{ fontSize: 48 }}
                ></i>
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Upload.Dragger>
          </Space>
        </Modal>
      </div>
    </PageLayout>
  )
}
