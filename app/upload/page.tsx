// app/upload/page.tsx
'use client';

import { useState } from 'react';

/**
 * 업로드를 위한 예시 페이지입니다. 배포 전에 삭제되어야 합니다.
 * API를 보낼 때, 태그가 추가되어야 합니다.
 *
 */

// TODO: 프론트 업로드 구현 완료 시 이 파일 전체 삭제
const UploadPage = () => {
  const [files, setFiles] = useState<(File | null)[]>(Array(6).fill(null));
  const [kitTitle, setKitTitle] = useState('');
  const [kitDescription, setKitDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newFiles = [...files];
    newFiles[index] = event.target.files?.[0] || null;
    setFiles(newFiles);
  };

  const handleUpload = async () => {
    if (files.filter((file) => file).length === 0 || !kitTitle) {
      alert('Please select files and provide a kit title');
      return;
    }

    setUploading(true);
    try {
      const imageUrls = await Promise.all(
        files
          .filter((file) => file)
          .map(async (file) => {
            if (!file) return '';
            // 1. presigned URL 요청
            const response = await fetch('/api/s3/presign', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                fileName: file.name,
                fileType: file.type,
              }),
            });

            if (!response.ok) {
              throw new Error('Failed to get presigned URL');
            }

            const data = await response.json();

            // 2. 파일 업로드
            console.log('uploading');
            const uploadResponse = await fetch(data.presignedUrl, {
              method: 'PUT',
              headers: {
                'Content-Type': file.type,
              },
              body: file,
            });

            if (!uploadResponse.ok) {
              throw new Error('Failed to upload file');
            }

            // 업로드된 파일의 URL 반환
            return data.presignedUrl.split('?')[0];
          }),
      );

      setUploadedUrls(imageUrls);
      console.log(imageUrls);

      // 3. Kit 생성 요청
      const createKitResponse = await fetch('/api/kits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: kitTitle,
          description: kitDescription,
          thumbnailImage: imageUrls[0], // 첫 번째 이미지를 썸네일로 사용
          rewardImage: imageUrls[5],
          uploaderId: 'clwhgit8j0001doaigd5t2qt5', // 실제 uploaderId를 사용
          imageUrls,
        }),
      });

      if (!createKitResponse.ok) {
        throw new Error('Failed to create kit');
      }

      const kitData = await createKitResponse.json();

      alert('Kit created and files uploaded successfully!');

      // 초기화
      setFiles(Array(6).fill(null));
      setKitTitle('');
      setKitDescription('');
      setUploadedUrls([]);
    } catch (error) {
      console.error('Error uploading files', error);
      alert('Error uploading files');
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
      {uploadedUrls.length > 0 && (
        <div>
          <h2>Uploaded URLs:</h2>
          <ul>
            {uploadedUrls.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
