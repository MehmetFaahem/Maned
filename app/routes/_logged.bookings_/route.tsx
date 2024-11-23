import {
  Typography,
  Table,
  Button,
  Form,
  Input,
  DatePicker,
  Modal,
  Select,
  Space,
  Row,
  Col,
} from 'antd'
import { useState } from 'react'
import type { Booking } from '@prisma/client'
const { Title, Text } = Typography
const { RangePicker } = DatePicker
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function BookingsPage() {
  const { user } = useUserContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null)
  const [dateRange, setDateRange] = useState<[string, string] | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const [form] = Form.useForm()

  const { data: bookings, refetch } = Api.booking.findMany.useQuery({
    where: {
      userId: user?.id,
      ...(dateRange && {
        startDate: { gte: dateRange[0] },
        endDate: { lte: dateRange[1] },
      }),
      ...(statusFilter && { status: statusFilter }),
    },
  })

  const { mutateAsync: createBooking } = Api.booking.create.useMutation()
  const { mutateAsync: updateBooking } = Api.booking.update.useMutation()

  const handleSubmit = async (values: any) => {
    try {
      if (editingBooking) {
        await updateBooking({
          where: { id: editingBooking.id },
          data: {
            ...values,
            startDate: dayjs(values.startDate).format('YYYY-MM-DD'),
            endDate: dayjs(values.endDate).format('YYYY-MM-DD'),
            userId: user?.id,
          },
        })
      } else {
        await createBooking({
          data: {
            ...values,
            startDate: dayjs(values.startDate).format('YYYY-MM-DD'),
            endDate: dayjs(values.endDate).format('YYYY-MM-DD'),
            userId: user?.id,
          },
        })
      }
      setIsModalOpen(false)
      form.resetFields()
      setEditingBooking(null)
      refetch()
    } catch (error) {
      console.error('Error saving booking:', error)
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
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Booking) => (
        <Button
          type="link"
          onClick={() => {
            setEditingBooking(record)
            form.setFieldsValue({
              ...record,
              startDate: dayjs(record.startDate),
              endDate: dayjs(record.endDate),
            })
            setIsModalOpen(true)
          }}
        >
          <i className="las la-edit" /> Edit
        </Button>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: '24px' }}
        >
          <Col>
            <Title level={2}>
              <i className="las la-calendar" /> Bookings Management
            </Title>
            <Text>Manage your bookings and reservations</Text>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                setEditingBooking(null)
                form.resetFields()
                setIsModalOpen(true)
              }}
            >
              <i className="las la-plus" /> New Booking
            </Button>
          </Col>
        </Row>

        <Space
          direction="vertical"
          size="middle"
          style={{ width: '100%', marginBottom: '24px' }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <RangePicker
                style={{ width: '100%' }}
                onChange={dates => {
                  if (dates) {
                    setDateRange([
                      dates[0]?.format('YYYY-MM-DD') || '',
                      dates[1]?.format('YYYY-MM-DD') || '',
                    ])
                  } else {
                    setDateRange(null)
                  }
                }}
              />
            </Col>
            <Col span={12}>
              <Select
                style={{ width: '100%' }}
                placeholder="Filter by status"
                allowClear
                onChange={value => setStatusFilter(value)}
              >
                <Select.Option value="PENDING">Pending</Select.Option>
                <Select.Option value="CONFIRMED">Confirmed</Select.Option>
                <Select.Option value="CANCELLED">Cancelled</Select.Option>
              </Select>
            </Col>
          </Row>
        </Space>

        <Table
          dataSource={bookings}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />

        <Modal
          title={editingBooking ? 'Edit Booking' : 'New Booking'}
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false)
            form.resetFields()
            setEditingBooking(null)
          }}
          footer={null}
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please input the title!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: 'Please input the description!' },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              name="startDate"
              label="Start Date"
              rules={[
                { required: true, message: 'Please select the start date!' },
              ]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="endDate"
              label="End Date"
              rules={[
                { required: true, message: 'Please select the end date!' },
              ]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select the status!' }]}
            >
              <Select>
                <Select.Option value="PENDING">Pending</Select.Option>
                <Select.Option value="CONFIRMED">Confirmed</Select.Option>
                <Select.Option value="CANCELLED">Cancelled</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                {editingBooking ? 'Update' : 'Create'} Booking
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </PageLayout>
  )
}
