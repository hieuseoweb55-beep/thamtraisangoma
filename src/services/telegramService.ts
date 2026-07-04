/**
 * Service to handle Telegram notifications
 */

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

export const sendTelegramMessage = async (message: string) => {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn('Telegram Bot Token or Chat ID is missing. Notification not sent.');
    return;
  }

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Telegram API Error: ${errorData.description}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
    throw error;
  }
};

export const formatOrderMessage = (orderData: any) => {
  const { customer, items, total, orderId } = orderData;
  
  let itemDetails = items.map((item: any) => 
    `• <b>Mã hàng: ${item.ma_hang}</b> (${item.nhom_hang})\n  Số lượng: ${item.quantity} ${item.unit} x ${item.price.toLocaleString()}đ`
  ).join('\n\n');

  return `
<b>🔔 ĐƠN HÀNG MỚI CHỐT!</b>
--------------------------
<b>Mã đơn:</b> #${orderId}
<b>Khách hàng:</b> ${customer.name}
<b>SĐT:</b> ${customer.phone}
<b>Địa chỉ:</b> ${customer.address}

<b>Chi tiết sản phẩm:</b>
${itemDetails}

--------------------------
<b>TỔNG CỘNG: ${total.toLocaleString()}đ</b>
`;
};

export const sendOrderToTelegram = async (orderData: any) => {
  const message = formatOrderMessage({
    orderId: Math.floor(Math.random() * 1000000).toString(),
    customer: {
      name: orderData.customerName,
      phone: orderData.phoneNumber,
      address: orderData.address
    },
    items: orderData.items,
    total: orderData.totalPrice + orderData.shippingFee
  });

  const detailedMessage = `${message}\n` +
    `<b>Trọng lượng:</b> ${orderData.totalWeight.toFixed(2)} kg\n` +
    `<b>Phương tiện:</b> ${orderData.vehicleType}\n` +
    `<b>Phí ship:</b> ${orderData.shippingFee.toLocaleString()}đ ${orderData.isFreeship ? '(Freeship)' : ''}`;

  return await sendTelegramMessage(detailedMessage);
};
