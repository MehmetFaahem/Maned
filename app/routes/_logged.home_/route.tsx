import { useUserContext } from '@/core/context'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'
import { useUploadPublic } from '@/plugins/upload/client'
import { useNavigate } from '@remix-run/react'
import {
  Badge,
  Card,
  Col,
  Empty,
  Input,
  message,
  Row,
  Space,
  Typography,
  Upload,
} from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
const { Title, Text } = Typography
const { Search } = Input
const { Dragger } = Upload

export default function HomePage() {
  const navigate = useNavigate()
  const { user } = useUserContext()
  const [searchTerm, setSearchTerm] = useState('')
  const { mutateAsync: upload } = useUploadPublic()
  const { mutateAsync: createDocument } = Api.document.create.useMutation()
  const queryClient = useQueryClient()

  // Fetch recent documents
  const { data: recentDocuments } = Api.document.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { updatedAt: 'desc' },
    take: 5,
  })

  // Fetch notifications
  const { data: notifications } = Api.notification.findMany.useQuery({
    where: { userId: user?.id, isRead: false },
    orderBy: { createdAt: 'desc' },
    take: 5,
  })

  // Fetch upcoming bookings
  const { data: upcomingBookings } = Api.booking.findMany.useQuery({
    where: { userId: user?.id },
    orderBy: { startDate: 'asc' },
    take: 5,
  })

  // Handle file upload
  const handleUpload = async (file: File) => {
    try {
      const { url } = await upload({ file })
      await createDocument({
        data: {
          title: file.name,
          fileUrl: url,
          fileType: file.type,
          fileSize: (file.size / 1024).toFixed(2) + ' KB',
          userId: user?.id,
          version: 1.0,
          status: 'ACTIVE',
        },
      })

      // Invalidate and refetch recent documents
      await queryClient.invalidateQueries({
        queryKey: [['document', 'findMany']],
      })
      message.success('Document uploaded successfully')

      return true
    } catch (error) {
      return false
    }
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Title level={2}>
          <i className="las la-home" /> Welcome to Your Dashboard
        </Title>
        <Text type="secondary">
          Manage your documents, bookings, and notifications all in one place
        </Text>

        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          <Col xs={24} lg={16}>
            <Card
              title={
                <>
                  <i className="las la-file" /> Quick Upload
                </>
              }
            >
              <Dragger
                customRequest={async ({ file, onSuccess }) => {
                  const result = await handleUpload(file as File)
                  if (result && onSuccess) onSuccess('ok')
                }}
                multiple={false}
              >
                <p>
                  <i
                    className="las la-cloud-upload-alt"
                    style={{ fontSize: 32 }}
                  />
                </p>
                <p>Click or drag file to upload</p>
              </Dragger>
            </Card>

            <Card
              title={
                <>
                  <i className="las la-search" /> Document Search
                </>
              }
              style={{ marginTop: 24 }}
            >
              <Search
                placeholder="Search documents..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ marginBottom: 16 }}
              />
              <Space direction="vertical" style={{ width: '100%' }}>
                {recentDocuments?.map(doc => (
                  <Card
                    key={doc.id}
                    size="small"
                    onClick={() => navigate(`/documents/${doc.id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Space>
                      <i className="las la-file-alt" />
                      <Text>{doc.title}</Text>
                      <Text type="secondary">
                        {dayjs(doc.updatedAt).format('MMM D, YYYY')}
                      </Text>
                    </Space>
                  </Card>
                ))}
                {(!recentDocuments || recentDocuments.length === 0) && (
                  <Empty description="No recent documents" />
                )}
              </Space>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card
              title={
                <>
                  <i className="las la-bell" /> Notifications
                </>
              }
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                {notifications?.map(notif => (
                  <Badge key={notif.id} dot={!notif.isRead}>
                    <Card size="small">
                      <Text strong>{notif.title}</Text>
                      <br />
                      <Text type="secondary">{notif.message}</Text>
                    </Card>
                  </Badge>
                ))}
                {(!notifications || notifications.length === 0) && (
                  <Empty description="No new notifications" />
                )}
              </Space>
            </Card>

            <Card
              title={
                <>
                  <i className="las la-calendar" /> Upcoming Bookings
                </>
              }
              style={{ marginTop: 24 }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                {upcomingBookings?.map(booking => (
                  <Card key={booking.id} size="small">
                    <Text strong>{booking.title}</Text>
                    <br />
                    <Text type="secondary">
                      {dayjs(booking.startDate).format('MMM D, YYYY')}
                    </Text>
                  </Card>
                ))}
                {(!upcomingBookings || upcomingBookings.length === 0) && (
                  <Empty description="No upcoming bookings" />
                )}
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </PageLayout>
  )
}
