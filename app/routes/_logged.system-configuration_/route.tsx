import {
  Typography,
  Card,
  Form,
  Input,
  Switch,
  InputNumber,
  Space,
  Button,
  Tabs,
  message,
} from 'antd'
import { useState } from 'react'
import type { TabsProps } from 'antd'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import dayjs from 'dayjs'
import { useLocation, useNavigate, useParams } from '@remix-run/react'
import { useUploadPublic } from '@/plugins/upload/client'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function SystemConfigurationPage() {
  const [form] = Form.useForm()
  const [notificationForm] = Form.useForm()
  const [storageForm] = Form.useForm()

  // Fetch system configurations
  const { data: configs, refetch } = Api.systemConfig.findMany.useQuery({})

  // Mutations
  const { mutateAsync: updateConfig } = Api.systemConfig.update.useMutation()
  const { mutateAsync: createConfig } = Api.systemConfig.create.useMutation()

  const [activeTab, setActiveTab] = useState('2')

  const handleSaveGeneralSettings = async (values: any) => {
    try {
      for (const [key, value] of Object.entries(values)) {
        const existingConfig = configs?.find(c => c.configKey === key)
        if (existingConfig) {
          await updateConfig({
            where: { id: existingConfig.id },
            data: { configValue: value.toString() },
          })
        } else {
          await createConfig({
            data: {
              configKey: key,
              configValue: value.toString(),
              type: 'general',
            },
          })
        }
      }
      message.success('General settings saved successfully')
      refetch()
    } catch (error) {
      message.error('Failed to save settings')
    }
  }

  const handleSaveNotificationSettings = async (values: any) => {
    try {
      for (const [key, value] of Object.entries(values)) {
        const existingConfig = configs?.find(c => c.configKey === key)
        if (existingConfig) {
          await updateConfig({
            where: { id: existingConfig.id },
            data: { configValue: value.toString() },
          })
        } else {
          await createConfig({
            data: {
              configKey: key,
              configValue: value.toString(),
              type: 'notification',
            },
          })
        }
      }
      message.success('Notification settings saved successfully')
      refetch()
    } catch (error) {
      message.error('Failed to save notification settings')
    }
  }

  const handleSaveStorageSettings = async (values: any) => {
    try {
      for (const [key, value] of Object.entries(values)) {
        const existingConfig = configs?.find(c => c.configKey === key)
        if (existingConfig) {
          await updateConfig({
            where: { id: existingConfig.id },
            data: { configValue: value.toString() },
          })
        } else {
          await createConfig({
            data: {
              configKey: key,
              configValue: value.toString(),
              type: 'storage',
            },
          })
        }
      }
      message.success('Storage settings saved successfully')
      refetch()
    } catch (error) {
      message.error('Failed to save storage settings')
    }
  }

  const items: TabsProps['items'] = [
    // {
    //   key: '1',
    //   label: (
    //     <span>
    //       <i className="las la-cog" /> General Settings
    //     </span>
    //   ),
    //   children: (
    //     <Form
    //       form={form}
    //       layout="vertical"
    //       onFinish={handleSaveGeneralSettings}
    //       initialValues={{
    //         siteName: configs?.find(c => c.configKey === 'siteName')
    //           ?.configValue,
    //         maintenanceMode:
    //           configs?.find(c => c.configKey === 'maintenanceMode')
    //             ?.configValue === 'true',
    //       }}
    //     >
    //       <Form.Item label="Site Name" name="siteName">
    //         <Input placeholder="Enter site name" />
    //       </Form.Item>
    //       <Form.Item
    //         label="Maintenance Mode"
    //         name="maintenanceMode"
    //         valuePropName="checked"
    //       >
    //         <Switch />
    //       </Form.Item>
    //       <Button type="primary" htmlType="submit">
    //         Save General Settings
    //       </Button>
    //     </Form>
    //   ),
    // },
    {
      key: '2',
      label: (
        <span>
          <i className="las la-bell" /> Notification Settings
        </span>
      ),
      children: (
        <Form
          form={notificationForm}
          layout="vertical"
          onFinish={handleSaveNotificationSettings}
          initialValues={{
            emailNotifications:
              configs?.find(c => c.configKey === 'emailNotifications')
                ?.configValue === 'true',
            pushNotifications:
              configs?.find(c => c.configKey === 'pushNotifications')
                ?.configValue === 'true',
          }}
        >
          <Form.Item
            label="Email Notifications"
            name="emailNotifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Push Notifications"
            name="pushNotifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save Notification Settings
          </Button>
        </Form>
      ),
    },
    {
      key: '3',
      label: (
        <span>
          <i className="las la-database" /> Storage Settings
        </span>
      ),
      children: (
        <Form
          form={storageForm}
          layout="vertical"
          onFinish={handleSaveStorageSettings}
          initialValues={{
            maxFileSize: Number(
              configs?.find(c => c.configKey === 'maxFileSize')?.configValue ||
                '10',
            ),
            allowedFileTypes: configs?.find(
              c => c.configKey === 'allowedFileTypes',
            )?.configValue,
          }}
        >
          <Form.Item label="Max File Size (MB)" name="maxFileSize">
            <InputNumber min={1} max={100} />
          </Form.Item>
          <Form.Item label="Allowed File Types" name="allowedFileTypes">
            <Input placeholder="jpg,png,pdf" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Save Storage Settings
          </Button>
        </Form>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={2}>
              <i className="las la-cogs" /> System Configuration
            </Title>
            <Text type="secondary">
              Manage system-wide settings, notifications, and storage
              configurations
            </Text>
          </div>

          <Card>
            <Tabs activeKey={activeTab} items={items} onChange={setActiveTab} />
          </Card>
        </Space>
      </div>
    </PageLayout>
  )
}
