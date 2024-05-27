'use client';

import { useState } from 'react';
import { preuploadStamp, uploadBlurImage } from '../api/kits/assets/actions';

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const UploadPage = () => {
  const [files, setFiles] = useState<(File | null)[]>(Array(6).fill(null));
  const [kitTitle, setKitTitle] = useState('');
  const [kitDescription, setKitDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [blurredUrl, setBlurredUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newFiles = [...files];
    newFiles[index] = event.target.files?.[0] || null;
    setFiles(newFiles);
  };

  const handleUpload = async () => {
    if (files.includes(null) || !kitTitle) {
      alert('6개의 파일을 선택하고 키트 제목을 입력해주세요.');
      return;
    }

    setUploading(true);
    try {
      const imageUrls = await Promise.all(
        files.map(async (file, index) => {
          if (!file) throw new Error('올바른 파일을 업로드 해주세요.');
          const bufferFile = await file.arrayBuffer();
          const base64File = arrayBufferToBase64(bufferFile);
          if (index === 5) {
            const blurUrl = await uploadBlurImage(base64File, index);
            console.log('blurredUrl', blurUrl);
            setBlurredUrl(blurUrl);
          }
          return preuploadStamp(base64File, index);
        }),
      );

      setUploadedUrls(imageUrls);

      const createKitResponse = await fetch(`/api/kits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: kitTitle,
          description: kitDescription,
          thumbnailImage: imageUrls[0],
          rewardImage: imageUrls[5],
          blurredImage: blurredUrl,
          imageUrls,
        }),
      });

      if (!createKitResponse.ok) {
        throw new Error('Failed to create kit');
      }

      alert('키트를 생성했습니다!'); // TODO: 프론트 구현후 삭제

      // 초기화
      setFiles(Array(6).fill(null));
      setKitTitle('');
      setKitDescription('');
      setUploadedUrls([]);
      setBlurredUrl(null);
    } catch (error) {
      console.error('Error uploading files', error);
      alert('파일을 업로드 하지 못했습니다.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>Upload Kit</h1>
      <input type="text" placeholder="Kit Title" value={kitTitle} onChange={(e) => setKitTitle(e.target.value)} />
      <textarea placeholder="Kit Description" value={kitDescription} onChange={(e) => setKitDescription(e.target.value)} />
      {[...Array(6)].map((_, index) => (
        <div key={index}>
          <input type="file" onChange={(e) => handleFileChange(e, index)} disabled={uploading} />
        </div>
      ))}
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default UploadPage;
