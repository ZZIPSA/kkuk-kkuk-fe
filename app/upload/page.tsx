'use client';

import { useState } from 'react';
import { preuploadStamp, preuploadStampWithBlur } from '../api/kits/assets/actions';

// TODO: 유틸로 뺴기
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
  const [uploadedUrls, setUploadedUrls] = useState<string[]>(Array(6).fill(''));
  const [blurredUrl, setBlurredUrl] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0] || null;
    const newFiles = [...files];
    newFiles[index] = file;
    setFiles(newFiles);

    if (file) {
      try {
        setUploading(true);
        const bufferFile = await file.arrayBuffer();
        const base64File = arrayBufferToBase64(bufferFile);

        if (index === 5) {
          const blurUrl = await preuploadStampWithBlur(base64File, index);
          setBlurredUrl(blurUrl);
        }

        const imageUrl = await preuploadStamp(base64File, index);
        const newUploadedUrls = [...uploadedUrls];
        newUploadedUrls[index] = imageUrl;
        setUploadedUrls(newUploadedUrls);
      } catch (error) {
        alert('파일을 업로드 하지 못했습니다.');
      } finally {
        setUploading(false);
      }
    }
  };

  const handleUpload = async () => {
    if (uploadedUrls.includes('') || !kitTitle) {
      alert('6개의 파일을 선택하고 키트 제목을 입력해주세요.');
      return;
    }

    setUploading(true);
    try {
      const createKitResponse = await fetch(`/api/kits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: kitTitle,
          description: kitDescription,
          thumbnailImage: uploadedUrls[0],
          rewardImage: uploadedUrls[5],
          blurredImage: blurredUrl,
          imageUrls: uploadedUrls,
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
      setUploadedUrls(Array(6).fill(''));
      setBlurredUrl(null);
    } catch (error) {
      alert('키트를 생성하지 못했습니다.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>

      <h1>키트 업로드 테스트 페이지</h1>
      <h1>Upload Kit</h1>
      <input type="text" placeholder="Kit Title" value={kitTitle} onChange={(e) => setKitTitle(e.target.value)} />
      <textarea placeholder="Kit Description" value={kitDescription} onChange={(e) => setKitDescription(e.target.value)} />
      {[...Array(6)].map((_, index) => (
        <div key={index}>
          <input type="file" onChange={(e) => handleFileChange(e, index)} disabled={uploading} />
        </div>
      ))}
      <button onClick={handleUpload} disabled={uploading || uploadedUrls.includes('')}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
};

export default UploadPage;
