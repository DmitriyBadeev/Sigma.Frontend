import { InboxOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { RcFile } from 'antd/lib/upload';
import Dragger from 'antd/lib/upload/Dragger';
import React from 'react';

const { Text } = Typography;

type propTypes = {
    request: (file: RcFile, fileList: RcFile[]) => boolean
}

const Uploader: React.FC<propTypes> = ({ request }) => {

    return <Dragger 
        name='file'
        beforeUpload={request}
        maxCount={1}
    >
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>

    <Text>
        Загрузите отчет
    </Text>
  </Dragger>
}

export default Uploader;