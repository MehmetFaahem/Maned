import {
  Typography,
  Card,
  List,
  Tag,
  Space,
  Button,
  Radio,
  Switch,
  Tabs,
} from 'antd'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function NotificationsPage() {
  const { user } = useUserContext()
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  // Fetch notifications
  const { data: notifications, refetch } = Api.notification.findMany.useQuery({
    where: {
      userId: user?.id,
      ...(selectedType && { type: selectedType }),
      ...(showUnreadOnly && { isRead: false }),
    },
    orderBy: { createdAt: 'desc' },
  })

  // Fetch user preferences
  const { data: preferences } = Api.userPreference.findMany.useQuery({
    where: { userId: user?.id },
  })

  // Mutations
  const { mutateAsync: updateNotification } =
    Api.notification.update.useMutation()
  const { mutateAsync: updatePreference } =
    Api.userPreference.update.useMutation()
  const { mutateAsync: createPreference } =
    Api.userPreference.create.useMutation()

  // Handle marking notification as read/unread
  const handleToggleRead = async (
    notificationId: string,
    currentIsRead: boolean,
  ) => {
    await updateNotification({
      where: { id: notificationId },
      data: { isRead: !currentIsRead },
    })
    refetch()
  }

  // Handle preference toggle
  const handlePreferenceToggle = async (key: string, currentValue: string) => {
    const preference = preferences?.find(p => p.preferenceKey === key)
    if (preference) {
      await updatePreference({
        where: { id: preference.id },
        data: { preferenceValue: currentValue === 'true' ? 'false' : 'true' },
      })
    } else {
      await createPreference({
        data: {
          preferenceKey: key,
          preferenceValue: 'true',
          userId: user?.id,
        },
      })
    }
  }

  const getPreferenceValue = (key: string) => {
    const pref = preferences?.find(p => p.preferenceKey === key)
    return pref?.preferenceValue === 'true'
  }

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>
        <Title level={2}>
          <i className="las la-bell" style={{ marginRight: 8 }}></i>
          Notifications
        </Title>
        <Text type="secondary">Manage your notifications and preferences</Text>

        <Tabs
          defaultActiveKey="notifications"
          items={[
            {
              key: 'notifications',
              label: (
                <span>
                  <i className="las la-inbox" style={{ marginRight: 8 }}></i>
                  Notifications
                </span>
              ),
              children: (
                <Card>
                  <Space
                    direction="vertical"
                    style={{ width: '100%', marginBottom: 16 }}
                  >
                    <Space>
                      <Radio.Group
                        value={selectedType}
                        onChange={e => setSelectedType(e.target.value)}
                        buttonStyle="solid"
                      >
                        <Radio.Button value={null}>All</Radio.Button>
                        <Radio.Button value="PUSH">Push</Radio.Button>
                        <Radio.Button value="EMAIL">Email</Radio.Button>
                        <Radio.Button value="SMS">SMS</Radio.Button>
                      </Radio.Group>
                      <Switch
                        checkedChildren="Unread only"
                        unCheckedChildren="Show all"
                        checked={showUnreadOnly}
                        onChange={setShowUnreadOnly}
                      />
                    </Space>
                  </Space>

                  <List
                    dataSource={notifications}
                    renderItem={notification => (
                      <List.Item
                        actions={[
                          <Button
                            key="toggle"
                            type="link"
                            onClick={() =>
                              handleToggleRead(
                                notification.id,
                                notification.isRead,
                              )
                            }
                          >
                            <i
                              className={`las ${
                                notification.isRead
                                  ? 'la-envelope-open'
                                  : 'la-envelope'
                              }`}
                            ></i>
                            {notification.isRead
                              ? 'Mark as unread'
                              : 'Mark as read'}
                          </Button>,
                        ]}
                      >
                        <List.Item.Meta
                          title={
                            <Space>
                              {notification.title}
                              {!notification.isRead && (
                                <Tag color="blue">New</Tag>
                              )}
                              <Tag
                                color={
                                  notification.type === 'PUSH'
                                    ? 'green'
                                    : notification.type === 'EMAIL'
                                    ? 'blue'
                                    : 'orange'
                                }
                              >
                                {notification.type}
                              </Tag>
                            </Space>
                          }
                          description={
                            <Space direction="vertical">
                              <Text>{notification.message}</Text>
                              <Text type="secondary">
                                {dayjs(notification.createdAt).format(
                                  'MMMM D, YYYY h:mm A',
                                )}
                              </Text>
                            </Space>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              ),
            },
            {
              key: 'preferences',
              label: (
                <span>
                  <i className="las la-cog" style={{ marginRight: 8 }}></i>
                  Preferences
                </span>
              ),
              children: (
                <Card>
                  <List>
                    <List.Item
                      actions={[
                        <Switch
                          key="push"
                          checked={getPreferenceValue('push_enabled')}
                          onChange={() =>
                            handlePreferenceToggle(
                              'push_enabled',
                              getPreferenceValue('push_enabled')?.toString() ||
                                'false',
                            )
                          }
                        />,
                      ]}
                    >
                      <List.Item.Meta
                        title="Push Notifications"
                        description="Receive push notifications in your browser"
                      />
                    </List.Item>
                    <List.Item
                      actions={[
                        <Switch
                          key="email"
                          checked={getPreferenceValue('email_enabled')}
                          onChange={() =>
                            handlePreferenceToggle(
                              'email_enabled',
                              getPreferenceValue('email_enabled')?.toString() ||
                                'false',
                            )
                          }
                        />,
                      ]}
                    >
                      <List.Item.Meta
                        title="Email Notifications"
                        description="Receive notifications via email"
                      />
                    </List.Item>
                    <List.Item
                      actions={[
                        <Switch
                          key="sms"
                          checked={getPreferenceValue('sms_enabled')}
                          onChange={() =>
                            handlePreferenceToggle(
                              'sms_enabled',
                              getPreferenceValue('sms_enabled')?.toString() ||
                                'false',
                            )
                          }
                        />,
                      ]}
                    >
                      <List.Item.Meta
                        title="SMS Notifications"
                        description="Receive notifications via SMS"
                      />
                    </List.Item>
                  </List>
                </Card>
              ),
            },
          ]}
        />
      </div>
    </PageLayout>
  )
}
