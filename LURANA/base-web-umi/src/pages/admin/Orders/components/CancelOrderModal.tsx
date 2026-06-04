import {
  Form,
  Input,
  Modal,
} from 'antd';

const { TextArea } = Input;

interface CancelOrderModalProps {
  open: boolean;

  loading?: boolean;

  onCancel: () => void;

  onSubmit: (
    reason: string,
  ) => void;
}

interface FormValues {
  reason: string;
}

export default function CancelOrderModal({
  open,
  loading = false,
  onCancel,
  onSubmit,
}: CancelOrderModalProps) {
  const [form] =
    Form.useForm<FormValues>();

  const handleOk =
    async () => {
      try {
        const values =
          await form.validateFields();

        onSubmit(
          values.reason,
        );

        form.resetFields();
      } catch {
        //
      }
    };

  const handleClose =
    () => {
      form.resetFields();

      onCancel();
    };

  return (
    <Modal
      visible={open}
      title="Hủy đơn hàng"
      okText="Xác nhận hủy"
      cancelText="Đóng"
      confirmLoading={
        loading
      }
      onOk={handleOk}
      onCancel={
        handleClose
      }
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          label="Lý do hủy đơn"
          name="reason"
          rules={[
            {
              required: true,
              message:
                'Vui lòng nhập lý do hủy đơn',
            },
            {
              min: 5,
              message:
                'Lý do phải từ 5 ký tự trở lên',
            },
          ]}
        >
          <TextArea
            rows={4}
            placeholder="Ví dụ: Khách yêu cầu hủy đơn, sai thông tin giao hàng..."
            maxLength={500}
            showCount
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}